/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import * as api from 'api';
import { AppThunk } from 'app/store';
import {
  messagesInitialState,
  messagesReducers,
  MessagesState,
  OwnMessage,
} from 'features/chat/slice/messages';
import {
  twitchEmotesInitialState,
  twitchEmotesReducers,
  TwitchEmotesState,
} from 'features/chat/slice/twitchEmotes';
import {
  bttvEmotesInitialState,
  bttvEmotesReducers,
  BttvEmotesState,
} from 'features/chat/slice/bttvEmotes';
import {
  ffzEmotesInitialState,
  ffzEmotesReducers,
  FfzEmotesState,
} from 'features/chat/slice/ffzEmotes';
import {
  badgesInitialState,
  badgesReducers,
  BadgesState,
} from 'features/chat/slice/badges';
import {
  paramsInitialState,
  paramsReducers,
  ParamsState,
} from 'features/chat/slice/params';
import {
  blockedUsersInitialState,
  blockedUsersReducers,
  BlockedUsersState,
} from 'features/chat/slice/blockedUsers';
import { normalizeOwnMessage } from 'features/chat/utils/normalizeMessages';

export type ChatState = {
  isConnected: boolean;
  currentChannel: string;
  messages: MessagesState;
  twitchEmotes: TwitchEmotesState;
  bttvEmotes: BttvEmotesState;
  ffzEmotes: FfzEmotesState;
  badges: BadgesState;
  params: ParamsState;
  blockedUsers: BlockedUsersState;
};

const initialState: ChatState = {
  isConnected: false,
  currentChannel: '',
  messages: messagesInitialState,
  twitchEmotes: twitchEmotesInitialState,
  bttvEmotes: bttvEmotesInitialState,
  ffzEmotes: ffzEmotesInitialState,
  badges: badgesInitialState,
  params: paramsInitialState,
  blockedUsers: blockedUsersInitialState,
};

const chat = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    updateIsConnected: (state, { payload }: PayloadAction<boolean>): void => {
      state.isConnected = payload;
    },
    updateCurrentChannel: (state, { payload }: PayloadAction<string>): void => {
      state.currentChannel = payload;
    },

    ...messagesReducers,
    ...twitchEmotesReducers,
    ...bttvEmotesReducers,
    ...ffzEmotesReducers,
    ...badgesReducers,
    ...paramsReducers,
    ...blockedUsersReducers,
  },
});

export const {
  updateIsConnected,
  updateCurrentChannel,

  // messages
  clearChat,
  addMessage,
  addChatHistory,

  // params
  updateGlobalUserParams,
  updateUserParams,
  updateRoomParams,
} = chat.actions;

export default chat.reducer;

const {
  // messages
  fetchChatHistoryRequest,
  fetchChatHistorySuccess,
  fetchChatHistoryFailure,

  // twitch emotes
  fetchTwitchEmotesRequest,
  fetchTwitchEmotesSuccess,
  fetchTwitchEmotesFailure,

  // bttv emotes
  fetchBttvGlobalEmotesRequest,
  fetchBttvGlobalEmotesSuccess,
  fetchBttvGlobalEmotesFailure,
  fetchBttvChannelEmotesRequest,
  fetchBttvChannelEmotesSuccess,
  fetchBttvChannelEmotesFailure,

  // ffz emotes
  fetchFfzGlobalEmotesRequest,
  fetchFfzGlobalEmotesSuccess,
  fetchFfzGlobalEmotesFailure,
  fetchFfzChannelEmotesRequest,
  fetchFfzChannelEmotesSuccess,
  fetchFfzChannelEmotesFailure,

  // badges
  fetchGlobalBadgesRequest,
  fetchGlobalBadgesSuccess,
  fetchGlobalBadgesFailure,
  fetchChannelBadgesRequest,
  fetchChannelBadgesSuccess,
  fetchChannelBadgesFailure,

  // blocked users
  fetchBlockedUsersRequest,
  fetchBlockedUsersSuccess,
  fetchBlockedUsersFailure,
} = chat.actions;

export const fetchChatHistory = (channel: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(fetchChatHistoryRequest({ channel }));
    const data = await api.fetchChatHistory(channel);
    dispatch(fetchChatHistorySuccess({ channel, data }));
  } catch (error) {
    dispatch(fetchChatHistoryFailure({ channel, error }));
  }
};

export const fetchTwitchEmotes = (userId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(fetchTwitchEmotesRequest());
    const data = await api.fetchTwitchEmotes(userId);
    dispatch(fetchTwitchEmotesSuccess(data));
  } catch (error) {
    dispatch(fetchTwitchEmotesFailure(error));
  }
};

export const fetchBttvGlobalEmotes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchBttvGlobalEmotesRequest());
    const data = await api.fetchBttvGlobalEmotes();
    dispatch(fetchBttvGlobalEmotesSuccess(data));
  } catch (error) {
    dispatch(fetchBttvGlobalEmotesFailure(error));
  }
};

export const fetchBttvChannelEmotes = (
  channel: string,
  channelId: string,
): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchBttvChannelEmotesRequest({ channel }));
    const data = await api.fetchBttvChannelEmotes(channelId);
    dispatch(fetchBttvChannelEmotesSuccess({ channel, data }));
  } catch (error) {
    dispatch(fetchBttvChannelEmotesFailure({ channel, error }));
  }
};

export const fetchFfzGlobalEmotes = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchFfzGlobalEmotesRequest());
    const data = await api.fetchFfzGlobalEmotes();
    dispatch(fetchFfzGlobalEmotesSuccess(data));
  } catch (error) {
    dispatch(fetchFfzGlobalEmotesFailure(error));
  }
};

export const fetchFfzChannelEmotes = (
  channel: string,
  channelId: string,
): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchFfzChannelEmotesRequest({ channel }));
    const data = await api.fetchFfzChannelEmotes(channelId);
    dispatch(fetchFfzChannelEmotesSuccess({ channel, data }));
  } catch (error) {
    dispatch(fetchFfzChannelEmotesFailure({ channel, error }));
  }
};

export const fetchGlobalBadges = (): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchGlobalBadgesRequest());
    const data = await api.fetchGlobalBadges();
    dispatch(fetchGlobalBadgesSuccess(data));
  } catch (error) {
    dispatch(fetchGlobalBadgesFailure(error));
  }
};

export const fetchChannelBadges = (
  channel: string,
  channelId: string,
): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchChannelBadgesRequest({ channel }));
    const data = await api.fetchChannelBadges(channelId);
    dispatch(fetchChannelBadgesSuccess({ channel, data }));
  } catch (error) {
    dispatch(fetchChannelBadgesFailure({ channel, error }));
  }
};

export const fetchBlockedUsers = (userId: string): AppThunk => async (
  dispatch,
) => {
  try {
    dispatch(fetchBlockedUsersRequest());
    const data = await api.fetchBlockedUsers(userId);
    dispatch(fetchBlockedUsersSuccess(data));
  } catch (error) {
    dispatch(fetchBlockedUsersFailure(error));
  }
};

export const addOwnMessage = (ownMessage: OwnMessage): AppThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const message = normalizeOwnMessage(ownMessage, state);

  dispatch(addMessage({ type: 'own-message', message }));
};
