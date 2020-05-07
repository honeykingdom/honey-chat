/* eslint-disable no-param-reassign */
import type { PayloadAction, CaseReducer } from '@reduxjs/toolkit';
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

const updateGlobalUserParams: CaseReducer<
  ChatState,
  PayloadAction<twitchIrc.GlobalUserStateEvent>
> = (state, { payload }): void => {
  state.params.global = payload.tags;
};

const updateUserParams: CaseReducer<
  ChatState,
  PayloadAction<twitchIrc.UserStateEvent>
> = (state, { payload }): void => {
  const { channel, tags } = payload;

  if (!state.params.byChannels[channel]) {
    state.params.byChannels[channel] = {
      room: null,
      user: null,
    };
  }

  state.params.byChannels[channel].user = tags;
};

const updateRoomParams: CaseReducer<
  ChatState,
  PayloadAction<twitchIrc.RoomStateEvent>
> = (state, { payload }): void => {
  const { channel, tags } = payload;

  if (!state.params.byChannels[channel]) {
    state.params.byChannels[channel] = {
      room: null,
      user: null,
    };
  }

  // TODO: merge tags
  state.params.byChannels[channel].room = tags;
};

export const paramsReducers = {
  updateGlobalUserParams,
  updateUserParams,
  updateRoomParams,
};
