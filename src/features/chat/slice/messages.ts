/* eslint-disable no-param-reassign */
import { createAsyncThunk, CaseReducer } from '@reduxjs/toolkit';
import type { PayloadAction, ActionReducerMapBuilder } from '@reduxjs/toolkit';
import type twitchIrc from 'twitch-simple-irc';

import * as api from 'api';
import { CHANNEL_MESSAGES_LIMIT, STORE_USERS_LIMIT } from 'utils/constants';
import assertNever from 'utils/assertNever';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import {
  normalizeMessage,
  normalizeNotice,
  normalizeUserNotice,
  normalizeHistoryMessages,
  normalizeOwnMessage,
} from 'features/chat/utils/normalizeMessages';
import sliceItemsByLimit from 'features/chat/utils/sliceItemsByLimit';
import type { ChatState } from 'features/chat/slice';
import type { FetchResult } from 'utils/types';

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
  userId?: string;
  userLogin?: string;
};

type AddMessage = {
  type: 'message';
  message: twitchIrc.MessageEvent;
  isMention: boolean;
};
type AddNotice = {
  type: 'notice';
  id: string;
  message: twitchIrc.NoticeEvent;
};
type AddUserNotice = {
  type: 'user-notice';
  message: twitchIrc.UserNoticeEvent;
};
type AddOwnMessage = {
  type: 'own-message';
  message: OwnMessage;
};

type AddMessagePayload = AddMessage | AddNotice | AddUserNotice | AddOwnMessage;

type AddChatHistoryPayload = {
  channel: string;
  userLogin: string | null;
};

type MessagesStateChannel = {
  history: FetchResult<string[]> & {
    isAdded: boolean;
  };
  isEven: boolean;
  items: ChatMessage[];
  users: string[];
};

export type MessagesState = Record<string, MessagesStateChannel>;

export const messagesInitialState: MessagesState = {};

const normalizePayload = (
  data: AddMessagePayload,
  chatState: ChatState,
): ChatMessage | null => {
  if (data.type === 'message') {
    return normalizeMessage(data.message, chatState, data.isMention);
  }

  if (data.type === 'notice') {
    return normalizeNotice(data.message, data.id);
  }

  if (data.type === 'user-notice') {
    return normalizeUserNotice(data.message);
  }

  if (data.type === 'own-message') {
    return normalizeOwnMessage(data.message, chatState);
  }

  return assertNever(data);
};

const clearChat: CaseReducer<
  ChatState,
  PayloadAction<twitchIrc.ClearChatEvent>
> = (state, { payload }) => {
  const {
    channel,
    tags: { targetUserId },
  } = payload;

  // eslint-disable-next-line no-restricted-syntax
  for (const message of state.messages[channel].items) {
    if (
      message.type === 'message' &&
      message.user.id === targetUserId &&
      !message.isHistory
    ) {
      message.isDeleted = true;
    }
  }
};

const addMessage: CaseReducer<ChatState, PayloadAction<AddMessagePayload>> = (
  state,
  { payload },
) => {
  const message = normalizePayload(payload, state);

  if (!message) return;

  const { channel } = message;

  const [newItems, newIsEven] = sliceItemsByLimit({
    items: [...state.messages[channel].items, message],
    limit: CHANNEL_MESSAGES_LIMIT,
    isEven: state.messages[channel].isEven,
  });

  state.messages[channel].isEven = newIsEven;
  state.messages[channel].items = newItems;

  // add user
  const { users } = state.messages[channel];

  if (message.type === 'message' && !users.includes(message.user.displayName)) {
    users.push(message.user.displayName);
  }

  const [newUsers] = sliceItemsByLimit({
    items: users,
    limit: STORE_USERS_LIMIT,
  });

  state.messages[channel].users = newUsers;
};

const addChatHistory: CaseReducer<
  ChatState,
  PayloadAction<AddChatHistoryPayload>
> = (state, { payload }) => {
  const { channel, userLogin } = payload;

  const [slicedRawHistory] = sliceItemsByLimit({
    items: state.messages[channel].history.items,
    limit: CHANNEL_MESSAGES_LIMIT,
  });
  const history = normalizeHistoryMessages(slicedRawHistory, state, userLogin);

  const [newItems, newIsEven] = sliceItemsByLimit({
    items: [...history, ...state.messages[channel].items],
    limit: CHANNEL_MESSAGES_LIMIT,
    addedItemsCount: history.length,
    isEven: state.messages[channel].isEven,
  });

  state.messages[channel].items = newItems;
  state.messages[channel].isEven = newIsEven;

  // add users
  const { users } = state.messages[channel];

  history.forEach((message) => {
    if (
      message.type === 'message' &&
      !users.includes(message.user.displayName)
    ) {
      users.push(message.user.displayName);
    }
  });

  state.messages[channel].history.items = [];
  state.messages[channel].history.isAdded = true;
};

export const messagesReducers = {
  clearChat,
  addMessage,
  addChatHistory,
};

export const fetchChatHistory = createAsyncThunk(
  'chat/fetchChatHistory',
  (channel: string) => api.fetchChatHistory(channel),
);

export const messagesExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder.addCase(fetchChatHistory.pending, (state, { meta: { arg } }) => {
    const channel = arg;

    if (!state.messages[channel]) {
      state.messages[channel] = {
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
      state.messages[channel].history.status = 'loading';
      state.messages[channel].history.error = {};
    }
  });

  builder.addCase(
    fetchChatHistory.fulfilled,
    (state, { payload, meta: { arg } }) => {
      const channel = arg;

      state.messages[channel].history.status = 'success';
      state.messages[channel].history.items = payload.messages;
    },
  );

  builder.addCase(
    fetchChatHistory.rejected,
    (state, { error, meta: { arg } }) => {
      const channel = arg;

      state.messages[channel].history.status = 'error';
      state.messages[channel].history.error = error;
    },
  );
};
