/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import * as api from 'api';
import type { ChatState } from 'features/chat/slice';
import {
  parseBttvGlobalEmotes,
  parseBttvChannelEmotes,
} from 'features/chat/utils/parseApiResponse';
import type { FetchResult } from 'utils/types';

export type BttvEmotesState = {
  global: FetchResult<api.BttvGlobalEmote[]>;
  byChannels: Record<string, FetchResult<api.BttvChannelEmote[]>>;
};

export const bttvEmotesInitialState: BttvEmotesState = {
  global: {
    status: 'idle',
    error: {},
    items: [],
  },
  byChannels: {},
};

export const fetchBttvGlobalEmotes = createAsyncThunk(
  'chat/fetchBttvGlobalEmotes',
  () => api.fetchBttvGlobalEmotes(),
);

type FetchBttvChannelEmotesParams = {
  channel: string;
  channelId: string;
};

export const fetchBttvChannelEmotes = createAsyncThunk(
  'chat/fetchBttvChannelEmotes',
  ({ channelId }: FetchBttvChannelEmotesParams) =>
    api.fetchBttvChannelEmotes(channelId),
);

export const bttvEmotesExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder.addCase(fetchBttvGlobalEmotes.pending, (state) => {
    state.bttvEmotes.global.status = 'loading';
    state.bttvEmotes.global.error = {};
  });

  builder.addCase(fetchBttvGlobalEmotes.fulfilled, (state, { payload }) => {
    state.bttvEmotes.global.status = 'success';
    state.bttvEmotes.global.items = parseBttvGlobalEmotes(payload);
  });

  builder.addCase(fetchBttvGlobalEmotes.rejected, (state, { error }) => {
    state.bttvEmotes.global.status = 'error';
    state.bttvEmotes.global.error = error;
  });

  builder.addCase(
    fetchBttvChannelEmotes.pending,
    (state, { meta: { arg } }) => {
      const { channel } = arg;

      if (!state.bttvEmotes.byChannels[channel]) {
        state.bttvEmotes.byChannels[channel] = {
          status: 'loading',
          error: {},
          items: [],
        };
      } else {
        state.bttvEmotes.byChannels[channel].status = 'loading';
        state.bttvEmotes.byChannels[channel].error = {};
      }
    },
  );

  builder.addCase(
    fetchBttvChannelEmotes.fulfilled,
    (state, { payload, meta: { arg } }) => {
      const { channel } = arg;

      state.bttvEmotes.byChannels[channel].status = 'success';
      state.bttvEmotes.byChannels[channel].items = parseBttvChannelEmotes(
        payload,
      );
    },
  );

  builder.addCase(
    fetchBttvChannelEmotes.rejected,
    (state, { error, meta: { arg } }) => {
      const { channel } = arg;

      state.bttvEmotes.byChannels[channel].status = 'error';
      state.bttvEmotes.byChannels[channel].error = error;
    },
  );
};
