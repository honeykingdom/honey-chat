/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import * as api from 'api';
import type { ChatState } from 'features/chat/slice';
import {
  parseFfzGlobalEmotes,
  parseFfzChannelEmotes,
} from 'features/chat/utils/parseApiResponse';
import type { FetchResult } from 'utils/types';

export type FfzEmotesState = {
  global: FetchResult<api.FfzEmote[]>;
  byChannels: Record<string, FetchResult<api.FfzEmote[]>>;
};

export const ffzEmotesInitialState: FfzEmotesState = {
  global: {
    status: 'idle',
    error: {},
    items: [],
  },
  byChannels: {},
};

export const fetchFfzGlobalEmotes = createAsyncThunk(
  'chat/fetchFfzGlobalEmotes',
  () => api.fetchFfzGlobalEmotes(),
);

type FetchFfzChannelEmotesParams = {
  channel: string;
  channelId: string;
};

export const fetchFfzChannelEmotes = createAsyncThunk(
  'chat/fetchFfzChannelEmotes',
  ({ channelId }: FetchFfzChannelEmotesParams) =>
    api.fetchFfzChannelEmotes(channelId),
);

export const ffzEmotesExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder.addCase(fetchFfzGlobalEmotes.pending, (state) => {
    state.ffzEmotes.global.status = 'loading';
    state.ffzEmotes.global.error = {};
  });

  builder.addCase(fetchFfzGlobalEmotes.fulfilled, (state, { payload }) => {
    state.ffzEmotes.global.status = 'success';
    state.ffzEmotes.global.items = parseFfzGlobalEmotes(payload);
  });

  builder.addCase(fetchFfzGlobalEmotes.rejected, (state, { error }) => {
    state.ffzEmotes.global.status = 'error';
    state.ffzEmotes.global.error = error;
  });

  builder.addCase(fetchFfzChannelEmotes.pending, (state, { meta: { arg } }) => {
    const { channel } = arg;

    if (!state.ffzEmotes.byChannels[channel]) {
      state.ffzEmotes.byChannels[channel] = {
        status: 'loading',
        error: {},
        items: [],
      };
    } else {
      state.ffzEmotes.byChannels[channel].status = 'loading';
      state.ffzEmotes.byChannels[channel].error = {};
    }
  });

  builder.addCase(
    fetchFfzChannelEmotes.fulfilled,
    (state, { payload, meta: { arg } }) => {
      const { channel } = arg;

      state.ffzEmotes.byChannels[channel].status = 'success';
      state.ffzEmotes.byChannels[channel].items = parseFfzChannelEmotes(
        payload,
      );
    },
  );

  builder.addCase(
    fetchFfzChannelEmotes.rejected,
    (state, { error, meta: { arg } }) => {
      const { channel } = arg;

      state.ffzEmotes.byChannels[channel].status = 'error';
      state.ffzEmotes.byChannels[channel].error = error;
    },
  );
};
