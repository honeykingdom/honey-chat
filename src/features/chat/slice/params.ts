/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import TwitchIrc from 'twitch-simple-irc';

import { ChatState } from 'features/chat/slice';

export interface ParamsState {
  global: TwitchIrc.GlobalUserStateTags | null;
  byChannels: {
    [channel: string]: {
      room: TwitchIrc.RoomStateTags | null;
      user: TwitchIrc.UserStateTags | null;
    };
  };
}

export const paramsInitialState: ParamsState = {
  global: null,
  byChannels: {},
};

const channelParamsInitialState = {
  room: null,
  user: null,
};

export const paramsReducers = {
  updateGlobalUserParams: (
    state: ChatState,
    { payload }: PayloadAction<TwitchIrc.GlobalUserStateEvent>,
  ): void => {
    state.params.global = payload.tags;
  },

  updateUserParams: (
    state: ChatState,
    { payload }: PayloadAction<TwitchIrc.UserStateEvent>,
  ): void => {
    const { channel, tags } = payload;

    if (!state.params.byChannels[channel]) {
      state.params.byChannels[channel] = channelParamsInitialState;
    }

    state.params.byChannels[channel].user = tags;
  },

  updateRoomParams: (
    state: ChatState,
    { payload }: PayloadAction<TwitchIrc.RoomStateEvent>,
  ): void => {
    const { channel, tags } = payload;

    if (!state.params.byChannels[channel]) {
      state.params.byChannels[channel] = channelParamsInitialState;
    }

    // TODO: merge tags
    state.params.byChannels[channel].room = tags;
  },
};
