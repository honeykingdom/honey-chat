/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'api';
import type { FetchResult } from 'utils/types';
import { parseBadges } from 'features/chat/utils/parseApiResponse';

type Badges = Record<string, api.TwitchBadge>;

type BadgesState = {
  global: FetchResult<Badges>;
  byChannels: Record<string, FetchResult<Badges>>;
};

const initialState: BadgesState = {
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

const badges = createSlice({
  name: 'badges',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // global badges
    builder.addCase(fetchGlobalBadges.pending, (state) => {
      state.global.status = 'loading';
      state.global.error = {};
    });

    builder.addCase(fetchGlobalBadges.fulfilled, (state, { payload }) => {
      state.global.status = 'success';
      state.global.items = parseBadges(payload);
    });

    builder.addCase(fetchGlobalBadges.rejected, (state, { error }) => {
      state.global.status = 'error';
      state.global.error = error;
    });

    // channel badges
    builder.addCase(fetchChannelBadges.pending, (state, { meta: { arg } }) => {
      const { channel } = arg;

      if (!state.byChannels[channel]) {
        state.byChannels[channel] = {
          status: 'loading',
          error: {},
          items: {},
        };
      } else {
        state.byChannels[channel].status = 'loading';
        state.byChannels[channel].error = {};
      }
    });

    builder.addCase(
      fetchChannelBadges.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const { channel } = arg;

        state.byChannels[channel].status = 'success';
        state.byChannels[channel].items = parseBadges(payload);
      },
    );

    builder.addCase(
      fetchChannelBadges.rejected,
      (state, { error, meta: { arg } }) => {
        const { channel } = arg;

        state.byChannels[channel].status = 'error';
        state.byChannels[channel].error = error;
      },
    );
  },
});

export default badges.reducer;
