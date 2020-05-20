/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type twitchIrc from 'twitch-simple-irc';

type Params = {
  room: twitchIrc.RoomStateTags | null;
  user: twitchIrc.UserStateTags | null;
};

type ChatState = {
  isConnected: boolean;
  currentChannel: string;
  params: {
    global: twitchIrc.GlobalUserStateTags | null;
    byChannels: Record<string, Params>;
  };
};

const initialState: ChatState = {
  isConnected: false,
  currentChannel: '',
  params: {
    global: null,
    byChannels: {},
  },
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

    updateGlobalUserParams: (
      state,
      { payload }: PayloadAction<twitchIrc.GlobalUserStateEvent>,
    ) => {
      state.params.global = payload.tags;
    },

    updateUserParams: (
      state,
      { payload }: PayloadAction<twitchIrc.UserStateEvent>,
    ) => {
      const { channel, tags } = payload;

      if (!state.params.byChannels[channel]) {
        state.params.byChannels[channel] = {
          room: null,
          user: null,
        };
      }

      state.params.byChannels[channel].user = tags;
    },

    updateRoomParams: (
      state,
      { payload }: PayloadAction<twitchIrc.RoomStateEvent>,
    ) => {
      const { channel, tags } = payload;

      if (!state.params.byChannels[channel]) {
        state.params.byChannels[channel] = {
          room: null,
          user: null,
        };
      }

      // TODO: merge tags
      state.params.byChannels[channel].room = tags;
    },
  },
});

export const {
  updateIsConnected,
  updateCurrentChannel,

  // params
  updateGlobalUserParams,
  updateUserParams,
  updateRoomParams,
} = chat.actions;

export default chat.reducer;
