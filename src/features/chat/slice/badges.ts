/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';

import { TwitchBadges, TwitchBadgesResponse } from 'api/twitch';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';

export interface BadgesState {
  global: {
    items: TwitchBadges;
  } & FetchFlags;
  byChannels: {
    [channel: string]: {
      items: TwitchBadges;
    } & FetchFlags;
  };
}

export const badgesInitialState: BadgesState = {
  global: {
    ...initialFetchFlags,
    items: {},
  },
  byChannels: {},
};

const badgesChannelInitialState = {
  ...initialFetchFlags,
  items: {},
};

export const badgesReducers = {
  fetchGlobalBadgesRequest: (state: ChatState) => {
    setFetchFlags(state.badges.global, 'request');
  },

  fetchGlobalBadgesSuccess: (
    state: ChatState,
    { payload }: PayloadAction<TwitchBadgesResponse>,
  ): void => {
    state.badges.global.items = payload.badge_sets;

    setFetchFlags(state.badges.global, 'success');
  },

  fetchGlobalBadgesFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ): void => {
    setFetchFlags(state.badges.global, 'failure', payload);
  },

  fetchChannelBadgesRequest: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string }>,
  ): void => {
    const { channel } = payload;

    if (!state.badges.byChannels[channel]) {
      state.badges.byChannels[channel] = badgesChannelInitialState;
    }

    setFetchFlags(state.badges.byChannels[channel], 'request');
  },

  fetchChannelBadgesSuccess: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string; data: TwitchBadgesResponse }>,
  ): void => {
    const { channel, data } = payload;

    state.badges.byChannels[channel].items = data.badge_sets;

    setFetchFlags(state.badges.byChannels[channel], 'success');
  },

  fetchChannelBadgesFailure: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string; error: string }>,
  ): void => {
    const { channel, error } = payload;

    setFetchFlags(state.badges.byChannels[channel], 'failure', error);
  },
};
