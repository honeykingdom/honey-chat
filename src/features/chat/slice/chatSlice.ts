/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  messagesInitialState,
  messagesReducers,
  messagesExtraReducers,
  MessagesState,
} from 'features/chat/slice/messages';
import {
  twitchEmotesInitialState,
  twitchEmotesExtraReducers,
  TwitchEmotesState,
} from 'features/chat/slice/twitchEmotes';
import {
  bttvEmotesInitialState,
  bttvEmotesExtraReducers,
  BttvEmotesState,
} from 'features/chat/slice/bttvEmotes';
import {
  ffzEmotesInitialState,
  ffzEmotesExtraReducers,
  FfzEmotesState,
} from 'features/chat/slice/ffzEmotes';
import {
  badgesInitialState,
  badgesExtraReducers,
  BadgesState,
} from 'features/chat/slice/badges';
import {
  paramsInitialState,
  paramsReducers,
  ParamsState,
} from 'features/chat/slice/params';
import {
  blockedUsersInitialState,
  blockedUsersExtraReducers,
  BlockedUsersState,
} from 'features/chat/slice/blockedUsers';

export { fetchChatHistory } from 'features/chat/slice/messages';
export { fetchTwitchEmotes } from 'features/chat/slice/twitchEmotes';
export {
  fetchBttvGlobalEmotes,
  fetchBttvChannelEmotes,
} from 'features/chat/slice/bttvEmotes';
export {
  fetchFfzGlobalEmotes,
  fetchFfzChannelEmotes,
} from 'features/chat/slice/ffzEmotes';
export {
  fetchGlobalBadges,
  fetchChannelBadges,
} from 'features/chat/slice/badges';
export { fetchBlockedUsers } from 'features/chat/slice/blockedUsers';

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
    ...paramsReducers,
  },
  extraReducers: (builder) => {
    messagesExtraReducers(builder);
    twitchEmotesExtraReducers(builder);
    bttvEmotesExtraReducers(builder);
    ffzEmotesExtraReducers(builder);
    badgesExtraReducers(builder);
    blockedUsersExtraReducers(builder);
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
