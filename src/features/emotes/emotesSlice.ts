/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'api';
import type { FetchResult } from 'utils/types';
import {
  parseTwitchEmotes,
  parseBttvGlobalEmotes,
  parseBttvChannelEmotes,
  parseFfzGlobalEmotes,
  parseFfzChannelEmotes,
} from 'features/chat/utils/parseApiResponse';

type EmotesState = {
  twitch: FetchResult<Record<string, api.TwitchEmote[]>>;
  bttv: {
    global: FetchResult<api.BttvGlobalEmote[]>;
    byChannels: Record<string, FetchResult<api.BttvChannelEmote[]>>;
  };
  ffz: {
    global: FetchResult<api.FfzEmote[]>;
    byChannels: Record<string, FetchResult<api.FfzEmote[]>>;
  };
};

const initialState: EmotesState = {
  twitch: {
    status: 'idle',
    error: {},
    items: {},
  },
  bttv: {
    global: {
      status: 'idle',
      error: {},
      items: [],
    },
    byChannels: {},
  },
  ffz: {
    global: {
      status: 'idle',
      error: {},
      items: [],
    },
    byChannels: {},
  },
};

export const fetchTwitchEmotes = createAsyncThunk(
  'chat/fetchTwitchEmotes',
  api.fetchTwitchEmotes,
);

export const fetchBttvGlobalEmotes = createAsyncThunk(
  'chat/fetchBttvGlobalEmotes',
  api.fetchBttvGlobalEmotes,
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

export const fetchFfzGlobalEmotes = createAsyncThunk(
  'chat/fetchFfzGlobalEmotes',
  api.fetchFfzGlobalEmotes,
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

const emotes = createSlice({
  name: 'emotes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // twitch
    builder.addCase(fetchTwitchEmotes.pending, (state) => {
      state.twitch.status = 'loading';
      state.twitch.error = {};
    });

    builder.addCase(fetchTwitchEmotes.fulfilled, (state, { payload }) => {
      state.twitch.status = 'success';
      state.twitch.items = parseTwitchEmotes(payload);
    });

    builder.addCase(fetchTwitchEmotes.rejected, (state, { error }) => {
      state.twitch.status = 'error';
      state.twitch.error = error;
    });

    // bttv global
    builder.addCase(fetchBttvGlobalEmotes.pending, (state) => {
      state.bttv.global.status = 'loading';
      state.bttv.global.error = {};
    });

    builder.addCase(fetchBttvGlobalEmotes.fulfilled, (state, { payload }) => {
      state.bttv.global.status = 'success';
      state.bttv.global.items = parseBttvGlobalEmotes(payload);
    });

    builder.addCase(fetchBttvGlobalEmotes.rejected, (state, { error }) => {
      state.bttv.global.status = 'error';
      state.bttv.global.error = error;
    });

    // bttv channel
    builder.addCase(
      fetchBttvChannelEmotes.pending,
      (state, { meta: { arg } }) => {
        const { channel } = arg;

        if (!state.bttv.byChannels[channel]) {
          state.bttv.byChannels[channel] = {
            status: 'loading',
            error: {},
            items: [],
          };
        } else {
          state.bttv.byChannels[channel].status = 'loading';
          state.bttv.byChannels[channel].error = {};
        }
      },
    );

    builder.addCase(
      fetchBttvChannelEmotes.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const { channel } = arg;

        state.bttv.byChannels[channel].status = 'success';
        state.bttv.byChannels[channel].items = parseBttvChannelEmotes(payload);
      },
    );

    builder.addCase(
      fetchBttvChannelEmotes.rejected,
      (state, { error, meta: { arg } }) => {
        const { channel } = arg;

        state.bttv.byChannels[channel].status = 'error';
        state.bttv.byChannels[channel].error = error;
      },
    );

    // ffz global
    builder.addCase(fetchFfzGlobalEmotes.pending, (state) => {
      state.ffz.global.status = 'loading';
      state.ffz.global.error = {};
    });

    builder.addCase(fetchFfzGlobalEmotes.fulfilled, (state, { payload }) => {
      state.ffz.global.status = 'success';
      state.ffz.global.items = parseFfzGlobalEmotes(payload);
    });

    builder.addCase(fetchFfzGlobalEmotes.rejected, (state, { error }) => {
      state.ffz.global.status = 'error';
      state.ffz.global.error = error;
    });

    // ffz channel
    builder.addCase(
      fetchFfzChannelEmotes.pending,
      (state, { meta: { arg } }) => {
        const { channel } = arg;

        if (!state.ffz.byChannels[channel]) {
          state.ffz.byChannels[channel] = {
            status: 'loading',
            error: {},
            items: [],
          };
        } else {
          state.ffz.byChannels[channel].status = 'loading';
          state.ffz.byChannels[channel].error = {};
        }
      },
    );

    builder.addCase(
      fetchFfzChannelEmotes.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const { channel } = arg;

        state.ffz.byChannels[channel].status = 'success';
        state.ffz.byChannels[channel].items = parseFfzChannelEmotes(payload);
      },
    );

    builder.addCase(
      fetchFfzChannelEmotes.rejected,
      (state, { error, meta: { arg } }) => {
        const { channel } = arg;

        state.ffz.byChannels[channel].status = 'error';
        state.ffz.byChannels[channel].error = error;
      },
    );
  },
});

export default emotes.reducer;
