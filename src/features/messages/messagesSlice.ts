/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type twitchIrc from 'twitch-simple-irc';

import * as api from 'api';
import type { AppThunk } from 'app/store';
import type { RootState } from 'app/rootReducer';
import type { FetchResult } from 'utils/types';
import {
  CHANNEL_MESSAGES_LIMIT,
  STORE_USERS_LIMIT,
  RECENT_USER_MESSAGES_LIMIT,
} from 'utils/constants';
import assertNever from 'utils/assertNever';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import {
  normalizeMessage,
  normalizeNotice,
  normalizeUserNotice,
  normalizeHistoryMessages,
  normalizeOwnMessage,
} from 'features/messages/utils/normalizeMessages';
import sliceMessagesByLimit from 'features/messages/utils/sliceMessagesByLimit';
import sliceItemsByLimit from 'features/messages/utils/sliceItemsByLimit';
import {
  fetchTwitchClip,
  fetchTwitchVideo,
  fetchYoutubeVideo,
} from 'features/messageCards/messageCardsSlice';
import { messageCardSelector } from 'features/messageCards/messageCardsSelectors';

export type MessageEntity =
  | htmlEntity.TwitchEmote
  | htmlEntity.BttvEmote
  | htmlEntity.FfzEmote
  | htmlEntity.Emoji
  | htmlEntity.Mention
  | htmlEntity.Link
  | string;

export type MessageCardInfo = {
  type: 'twitch-clip' | 'twitch-video' | 'youtube-video';
  id: string;
  url: string;
};

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
  card: MessageCardInfo | null;
  isAction: boolean;
  isHistory: boolean;
  isDeleted: boolean;
  isHighlighted: boolean;
  isOwnMessage: boolean;
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

type ReceiveMessage = {
  type: 'message';
  message: twitchIrc.MessageEvent;
};
type ReceiveNotice = {
  type: 'notice';
  message: twitchIrc.NoticeEvent;
};
type ReceiveUserNotice = {
  type: 'user-notice';
  message: twitchIrc.UserNoticeEvent;
};
type ReceiveOwnMessage = {
  type: 'own-message';
  message: OwnMessage;
};

type ReceiveMessagePayload =
  | ReceiveMessage
  | ReceiveNotice
  | ReceiveUserNotice
  | ReceiveOwnMessage;

type ReceiveMessagesActionPayload = {
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
  recentUserMessages: string[];
};

type MessagesState = Record<string, MessagesStateChannel>;

const initialState: MessagesState = {};

export const fetchRecentMessages = createAsyncThunk(
  'chat/fetchRecentMessages',
  api.fetchRecentMessages,
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

    receiveMessagesAction: (
      state,
      { payload }: PayloadAction<ReceiveMessagesActionPayload>,
    ) => {
      const { messages, channel, type = 'message' } = payload;

      if (messages.length === 0) return;

      const items =
        type === 'message'
          ? [...state[channel].items, ...messages]
          : [...messages, ...state[channel].items];

      const [newItems, newIsEven] = sliceMessagesByLimit({
        items,
        limit: CHANNEL_MESSAGES_LIMIT,
        addedItemsCount: messages.length,
        isEven: state[channel].isEven,
      });

      state[channel].isEven = newIsEven;
      state[channel].items = newItems;

      // TODO: add colors for users if it's not set

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

      const newUsers = sliceItemsByLimit(users, STORE_USERS_LIMIT);

      state[channel].users = newUsers;

      if (type === 'history') {
        state[channel].history.items = [];
        state[channel].history.isAdded = true;
      }

      if (type === 'message') {
        messages.forEach((message) => {
          if (message.type !== 'message' || !message.isOwnMessage) return;

          const normalizedMessage = message.message.trim();
          const index = state[channel].recentUserMessages.indexOf(
            normalizedMessage,
          );

          if (index > -1) {
            state[channel].recentUserMessages.splice(1, 1);
          }

          state[channel].recentUserMessages.unshift(normalizedMessage);

          const newRecentUserMessages = sliceItemsByLimit(
            state[channel].recentUserMessages,
            RECENT_USER_MESSAGES_LIMIT,
          );

          state[channel].recentUserMessages = newRecentUserMessages;
        });
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRecentMessages.pending, (state, { meta: { arg } }) => {
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
          recentUserMessages: [],
        };
      } else {
        state[channel].history.status = 'loading';
        state[channel].history.error = {};
      }
    });

    builder.addCase(
      fetchRecentMessages.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const channel = arg;

        state[channel].history.status = 'success';
        state[channel].history.items = payload.messages;
      },
    );

    builder.addCase(
      fetchRecentMessages.rejected,
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

const { receiveMessagesAction } = messagesSlice.actions;

const normalizePayload = (
  payload: ReceiveMessagePayload,
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

export const receiveMessage = (payload: ReceiveMessagePayload): AppThunk => (
  dispatch,
  getState,
) => {
  const state = getState();
  const message = normalizePayload(payload, state);

  if (!message) return;

  // fetch a message card if any
  if (message.type === 'message' && message.card) {
    const card = messageCardSelector(message.card)(state);

    if (!card || card.status === 'error') {
      const { id, url } = message.card;
      const params = { id, url };

      if (message.card.type === 'twitch-clip') {
        dispatch(fetchTwitchClip(params));
      }

      if (message.card.type === 'twitch-video') {
        dispatch(fetchTwitchVideo(params));
      }

      if (message.card.type === 'youtube-video') {
        dispatch(fetchYoutubeVideo(params));
      }
    }
  }

  const params = { messages: [message], channel: message.channel };

  dispatch(receiveMessagesAction(params));
};

export const addRecentMessages = (channel: string): AppThunk => (
  dispatch,
  getState,
) => {
  const state = getState();

  const slicedRawHistory = sliceItemsByLimit(
    state.messages[channel].history.items,
    CHANNEL_MESSAGES_LIMIT,
  );

  const messages = normalizeHistoryMessages(slicedRawHistory, state);

  dispatch(receiveMessagesAction({ messages, channel, type: 'history' }));
};
