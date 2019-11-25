/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import twitchIrc from 'twitch-simple-irc';

import { ChatHistoryResponse } from 'api/chatHistory';
import {
  FetchFlags,
  initialFetchFlags,
  CHANNEL_MESSAGES_LIMIT,
  STORE_USERS_LIMIT,
} from 'utils/constants';
import assertNever from 'utils/assertNever';
import setFetchFlags from 'utils/setFetchFlags';
import {
  HtmlEntityTwitchEmote,
  HtmlEntityBttvEmote,
  HtmlEntityFfzEmote,
  HtmlEntityEmoji,
  HtmlEntityMention,
  HtmlEntityLink,
  HtmlEntityBadge,
} from 'features/chat/utils/htmlEntity';
import {
  normalizeMessage,
  normalizeNotice,
  normalizeUserNotice,
  normalizeOwnMessage,
  normalizeHistoryMessages,
} from 'features/chat/utils/normalizeMessages';
import { ChatState } from 'features/chat/slice';

export type MessageEntity =
  | HtmlEntityTwitchEmote
  | HtmlEntityBttvEmote
  | HtmlEntityFfzEmote
  | HtmlEntityEmoji
  | HtmlEntityMention
  | HtmlEntityLink
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
    badges: HtmlEntityBadge[];
  };
  timestamp: number;
  isAction: boolean;
  isHistory: boolean;
  isDeleted: boolean;
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
  id: string;
  channel: string;
  tags: twitchIrc.UserStateTags;
  timestamp: number;
  userId: string;
  userLogin: string;
};

type AddMessage = {
  type: 'message';
  message: twitchIrc.MessageEvent;
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

export interface MessagesState {
  [channel: string]: {
    history: {
      isAdded: boolean;
      items: string[];
    } & FetchFlags;
    isEven: boolean;
    items: ChatMessage[];
    users: string[];
  };
}

export const messagesInitialState: MessagesState = {};

const messagesChannelInitialState = {
  history: {
    ...initialFetchFlags,
    isAdded: false,
    items: [],
  },
  isEven: false,
  items: [],
  users: [],
};

function sliceMessages<T>(items: T[]): T[] {
  const diff = items.length - CHANNEL_MESSAGES_LIMIT;

  return diff > 0 ? items.slice(diff) : items;
}

function sliceUsers<T>(users: T[]): T[] {
  const diff = users.length - STORE_USERS_LIMIT;

  return diff > 0 ? users.slice(diff) : users;
}

const getIsEven = (
  prev: boolean,
  addedItemsCount: number,
  isSliced: boolean,
): boolean => {
  if (isSliced) {
    return addedItemsCount % 2 ? !prev : prev;
  }

  return prev;
};

const normalizePayload = (
  data: AddMessagePayload,
  chatState: ChatState,
): ChatMessage | null => {
  if (data.type === 'message') {
    return normalizeMessage(data.message, chatState);
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

export const messagesReducers = {
  clearChat: (
    state: ChatState,
    { payload }: PayloadAction<twitchIrc.ClearChatEvent>,
  ): void => {
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
  },

  addMessage: (
    state: ChatState,
    { payload }: PayloadAction<AddMessagePayload>,
  ): void => {
    const message = normalizePayload(payload, state);

    if (!message) return;

    const { channel } = message;

    const prevItems = state.messages[channel].items;
    const newItems = [...prevItems, message];
    const slicedMessages = sliceMessages(newItems);

    const isSliced = newItems.length > slicedMessages.length;
    const prevIsEven = state.messages[channel].isEven;

    state.messages[channel].isEven = getIsEven(prevIsEven, 1, isSliced);
    state.messages[channel].items = slicedMessages;

    // add user
    const { users } = state.messages[channel];

    if (
      message.type === 'message' &&
      !users.includes(message.user.displayName)
    ) {
      users.push(message.user.displayName);
    }

    state.messages[channel].users = sliceUsers(users);
  },

  addChatHistory: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ): void => {
    const channel = payload;

    const rawHistory = state.messages[channel].history.items;
    const history = normalizeHistoryMessages(sliceMessages(rawHistory), state);
    const prevItems = state.messages[channel].items;
    const newItems = [...history, ...prevItems];
    const slicedMessages = sliceMessages(newItems);

    const isSliced = newItems.length > slicedMessages.length;
    const prevIsEven = state.messages[channel].isEven;

    state.messages[channel].isEven = getIsEven(
      prevIsEven,
      history.length,
      isSliced,
    );
    state.messages[channel].items = slicedMessages;

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
  },

  fetchChatHistoryRequest: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string }>,
  ): void => {
    const { channel } = payload;

    if (!state.messages[channel]) {
      state.messages[channel] = messagesChannelInitialState;
    }

    setFetchFlags(state.messages[channel].history, 'request');
  },

  fetchChatHistorySuccess: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string; data: ChatHistoryResponse }>,
  ): void => {
    const { channel, data } = payload;

    state.messages[channel].history.items = data.messages;

    setFetchFlags(state.messages[channel].history, 'success');
  },

  fetchChatHistoryFailure: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string; error: string }>,
  ): void => {
    const { channel, error } = payload;

    setFetchFlags(state.messages[channel].history, 'failure', error);
  },
};
