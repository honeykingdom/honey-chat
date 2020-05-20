/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type twitchIrc from 'twitch-simple-irc';

import * as api from 'api';
import type { AppThunk } from 'app/store';
import type { RootState } from 'app/rootReducer';
import type { FetchResult } from 'utils/types';
import { CHANNEL_MESSAGES_LIMIT, STORE_USERS_LIMIT } from 'utils/constants';
import assertNever from 'utils/assertNever';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import {
  normalizeMessage,
  normalizeNotice,
  normalizeUserNotice,
  normalizeHistoryMessages,
  normalizeOwnMessage,
} from 'features/messages/utils/normalizeMessages';
import sliceItemsByLimit from 'features/messages/utils/sliceItemsByLimit';

export type MessageEntity =
  | htmlEntity.TwitchEmote
  | htmlEntity.BttvEmote
  | htmlEntity.FfzEmote
  | htmlEntity.Emoji
  | htmlEntity.Mention
  | htmlEntity.Link
  | string;

export type Message = {
  type: 'message';
  id: string;
  message: string;
  channel: string;
  entities: MessageEntity[];
  user: {
    id: string;
    login: string;
    displayName: string;
    color: string;
    badges: htmlEntity.Badge[];
  };
  timestamp: number;
  isAction: boolean;
  isHistory: boolean;
  isDeleted: boolean;
  isMention: boolean;
};

export type Notice = {
  type: 'notice';
  id: string;
  message: string;
  channel: string;
  noticeType: string;
};

export type UserNotice = {
  type: 'user-notice';
  id: string;
  message: string;
  channel: string;
  noticeType: keyof typeof twitchIrc.UserNoticeType;
  systemMessage: string;
  user: {
    login: string;
  };
};

export type ChatMessage = Message | Notice | UserNotice;

export type OwnMessage = {
  message: string;
  channel: string;
  tags: twitchIrc.UserStateTags;
};

type RecieveMessage = {
  type: 'message';
  message: twitchIrc.MessageEvent;
};
type RecieveNotice = {
  type: 'notice';
  message: twitchIrc.NoticeEvent;
};
type RecieveUserNotice = {
  type: 'user-notice';
  message: twitchIrc.UserNoticeEvent;
};
type RecieveOwnMessage = {
  type: 'own-message';
  message: OwnMessage;
};

type RecieveMessagePayload =
  | RecieveMessage
  | RecieveNotice
  | RecieveUserNotice
  | RecieveOwnMessage;

type RecieveMessagesActionPayload = {
  messages: ChatMessage[];
  channel: string;
  type?: 'message' | 'history';
};

type MessagesStateChannel = {
  history: FetchResult<string[]> & {
    isAdded: boolean;
  };
  isEven: boolean;
  items: ChatMessage[];
  users: string[];
};

type MessagesState = Record<string, MessagesStateChannel>;

const initialState: MessagesState = {};

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  (channel: string) => api.fetchChatHistory(channel),
);

// TODO: write function than adds a user to the users array

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearChat: (
      state,
      { payload }: PayloadAction<twitchIrc.ClearChatEvent>,
    ) => {
      const {
        channel,
        tags: { targetUserId },
      } = payload;

      // eslint-disable-next-line no-restricted-syntax
      for (const message of state[channel].items) {
        if (
          message.type === 'message' &&
          message.user.id === targetUserId &&
          !message.isHistory
        ) {
          message.isDeleted = true;
        }
      }
    },

    recieveMessagesAction: (
      state,
      { payload }: PayloadAction<RecieveMessagesActionPayload>,
    ) => {
      const { messages, channel, type = 'message' } = payload;

      if (messages.length === 0) return;

      const items =
        type === 'message'
          ? [...state[channel].items, ...messages]
          : [...messages, ...state[channel].items];

      const [newItems, newIsEven] = sliceItemsByLimit({
        items,
        limit: CHANNEL_MESSAGES_LIMIT,
        addedItemsCount: messages.length,
        isEven: state[channel].isEven,
      });

      state[channel].isEven = newIsEven;
      state[channel].items = newItems;

      // add users
      const { users } = state[channel];

      messages.forEach((message) => {
        if (
          message.type === 'message' &&
          !users.includes(message.user.displayName)
        ) {
          users.push(message.user.displayName);
        }
      });

      const [newUsers] = sliceItemsByLimit({
        items: users,
        limit: STORE_USERS_LIMIT,
      });

      state[channel].users = newUsers;

      if (type === 'history') {
        state[channel].history.items = [];
        state[channel].history.isAdded = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChatHistory.pending, (state, { meta: { arg } }) => {
      const channel = arg;

      if (!state[channel]) {
        state[channel] = {
          history: {
            status: 'loading',
            error: {},
            items: [],
            isAdded: false,
          },
          isEven: false,
          items: [],
          users: [],
        };
      } else {
        state[channel].history.status = 'loading';
        state[channel].history.error = {};
      }
    });

    builder.addCase(
      fetchChatHistory.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const channel = arg;

        state[channel].history.status = 'success';
        state[channel].history.items = payload.messages;
      },
    );

    builder.addCase(
      fetchChatHistory.rejected,
      (state, { error, meta: { arg } }) => {
        const channel = arg;

        state[channel].history.status = 'error';
        state[channel].history.error = error;
      },
    );
  },
});

export const { clearChat } = messagesSlice.actions;

export default messagesSlice.reducer;

const { recieveMessagesAction } = messagesSlice.actions;

const normalizePayload = (
  payload: RecieveMessagePayload,
  state: RootState,
): ChatMessage | null => {
  if (payload.type === 'message') {
    return normalizeMessage(payload.message, state);
  }

  if (payload.type === 'notice') {
    return normalizeNotice(payload.message);
  }

  if (payload.type === 'user-notice') {
    return normalizeUserNotice(payload.message);
  }

  if (payload.type === 'own-message') {
    return normalizeOwnMessage(payload.message, state);
  }

  return assertNever(payload);
};

export const recieveMessage = (payload: RecieveMessagePayload): AppThunk => (
  dispatch,
  getState,
) => {
  const state = getState();
  const message = normalizePayload(payload, state);

  if (!message) return;

  const params = { messages: [message], channel: message.channel };

  dispatch(recieveMessagesAction(params));
};

export const addChatHistory = (channel: string): AppThunk => (
  dispatch,
  getState,
) => {
  const state = getState();

  const [slicedRawHistory] = sliceItemsByLimit({
    items: state.messages[channel].history.items,
    limit: CHANNEL_MESSAGES_LIMIT,
  });

  const messages = normalizeHistoryMessages(slicedRawHistory, state);

  dispatch(recieveMessagesAction({ messages, channel, type: 'history' }));
};
