/* eslint-disable no-param-reassign */
import type { PayloadAction } from '@reduxjs/toolkit';
import type twitchIrc from 'twitch-simple-irc';

import type { ChatState } from 'features/chat/slice';

type Params = {
  room: twitchIrc.RoomStateTags | null;
  user: twitchIrc.UserStateTags | null;
};

export type ParamsState = {
  global: twitchIrc.GlobalUserStateTags | null;
  byChannels: Record<string, Params>;
};

export const paramsInitialState: ParamsState = {
  global: null,
  byChannels: {},
};

export const paramsReducers = {
  updateGlobalUserParams: (
    state: ChatState,
    { payload }: PayloadAction<twitchIrc.GlobalUserStateEvent>,
  ): void => {
    state.params.global = payload.tags;
  },

  updateUserParams: (
    state: ChatState,
    { payload }: PayloadAction<twitchIrc.UserStateEvent>,
  ): void => {
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
    state: ChatState,
    { payload }: PayloadAction<twitchIrc.RoomStateEvent>,
  ): void => {
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
};
