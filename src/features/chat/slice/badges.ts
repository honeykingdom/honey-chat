/* eslint-disable no-param-reassign */
import { createAsyncThunk, ActionReducerMapBuilder } from '@reduxjs/toolkit';

import * as api from 'api';
import { FetchResult } from 'utils/types';
import type { ChatState } from 'features/chat/slice';
import { parseBadges } from 'features/chat/utils/parseApiResponse';

type Badges = Record<string, api.TwitchBadge>;

export type BadgesState = {
  global: FetchResult<Badges>;
  byChannels: Record<string, FetchResult<Badges>>;
};

export const badgesInitialState: BadgesState = {
  global: {
    status: 'idle',
    error: {},
    items: {},
  },
  byChannels: {},
};

export const fetchGlobalBadges = createAsyncThunk(
  'chat/fetchGlobalBadges',
  () => api.fetchGlobalBadges(),
);

type FetchChannelBadgesParams = {
  channel: string;
  channelId: string;
};

export const fetchChannelBadges = createAsyncThunk(
  'chat/fetchChannelBadges',
  ({ channelId }: FetchChannelBadgesParams) =>
    api.fetchChannelBadges(channelId),
);

export const badgesExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder.addCase(fetchGlobalBadges.pending, (state) => {
    state.badges.global.status = 'loading';
    state.badges.global.error = {};
  });

  builder.addCase(fetchGlobalBadges.fulfilled, (state, { payload }) => {
    state.badges.global.status = 'success';
    state.badges.global.items = parseBadges(payload);
  });

  builder.addCase(fetchGlobalBadges.rejected, (state, { error }) => {
    state.badges.global.status = 'error';
    state.badges.global.error = error;
  });

  builder.addCase(fetchChannelBadges.pending, (state, { meta: { arg } }) => {
    const { channel } = arg;

    if (!state.badges.byChannels[channel]) {
      state.badges.byChannels[channel] = {
        status: 'loading',
        error: {},
        items: {},
      };
    } else {
      state.badges.byChannels[channel].status = 'loading';
      state.badges.byChannels[channel].error = {};
    }
  });

  builder.addCase(
    fetchChannelBadges.fulfilled,
    (state, { payload, meta: { arg } }) => {
      const { channel } = arg;

      state.badges.byChannels[channel].status = 'success';
      state.badges.byChannels[channel].items = parseBadges(payload);
    },
  );

  builder.addCase(
    fetchChannelBadges.rejected,
    (state, { error, meta: { arg } }) => {
      const { channel } = arg;

      state.badges.byChannels[channel].status = 'error';
      state.badges.byChannels[channel].error = error;
    },
  );
};
