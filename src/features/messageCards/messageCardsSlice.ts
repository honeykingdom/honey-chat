/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'api';
import {
  parseTwitchClip,
  parseTwitchVideo,
  parseYoutubeVideo,
} from 'features/chat/utils/parseApiResponse';

type MessageCardLoading = {
  status: 'loading';
};
type MessageCardSuccess = {
  status: 'success';
  id: string;
  url: string;
  src: string;
  srcSet: string;
  title: string;
  description: string;
};
type MessageCardError = {
  status: 'error';
};
export type MessageCardData =
  | MessageCardLoading
  | MessageCardSuccess
  | MessageCardError;

type MessageCardsState = {
  twitchClips: Record<string, MessageCardData>;
  twitchVideos: Record<string, MessageCardData>;
  youtubeVideos: Record<string, MessageCardData>;
};

const initialState: MessageCardsState = {
  twitchClips: {},
  twitchVideos: {},
  youtubeVideos: {},
};

type FetchMessageCardParams = {
  id: string;
  url: string;
};

export const fetchTwitchClip = createAsyncThunk(
  'clips/fetchTwitchClip',
  ({ id }: FetchMessageCardParams) => api.fetchTwitchClip(id),
);

export const fetchTwitchVideo = createAsyncThunk(
  'clips/fetchTwitchVideo',
  ({ id }: FetchMessageCardParams) => api.fetchTwitchVideo(id),
);

export const fetchYoutubeVideo = createAsyncThunk(
  'clips/fetchYoutubeVideo',
  ({ id }: FetchMessageCardParams) => api.fetchYoutubeVideo(id),
);

// TODO: refact this code. DRY!

const messageCards = createSlice({
  name: 'messageCards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // twitch clip
    builder.addCase(fetchTwitchClip.pending, (state, { meta: { arg } }) => {
      const { id } = arg;

      state.twitchClips[id] = { status: 'loading' };
    });

    builder.addCase(
      fetchTwitchClip.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const { id } = arg;
        const card = parseTwitchClip(payload);

        if (!card) {
          state.twitchClips[id] = { status: 'error' };

          return;
        }

        state.twitchClips[id] = {
          status: 'success',
          ...card,
        };
      },
    );

    builder.addCase(fetchTwitchClip.rejected, (state, { meta: { arg } }) => {
      const { id } = arg;

      state.twitchClips[id] = { status: 'error' };
    });

    // twitch video
    builder.addCase(fetchTwitchVideo.pending, (state, { meta: { arg } }) => {
      const { id } = arg;

      state.twitchVideos[id] = { status: 'loading' };
    });

    builder.addCase(
      fetchTwitchVideo.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const { id, url } = arg;
        const card = parseTwitchVideo(payload);

        if (!card) {
          state.twitchVideos[id] = { status: 'error' };

          return;
        }

        state.twitchVideos[id] = {
          status: 'success',
          url,
          ...card,
        };
      },
    );

    builder.addCase(fetchTwitchVideo.rejected, (state, { meta: { arg } }) => {
      const { id } = arg;

      state.twitchVideos[id] = { status: 'error' };
    });

    // youtube-video
    builder.addCase(fetchYoutubeVideo.pending, (state, { meta: { arg } }) => {
      const { id } = arg;

      state.youtubeVideos[id] = { status: 'loading' };
    });

    builder.addCase(
      fetchYoutubeVideo.fulfilled,
      (state, { payload, meta: { arg } }) => {
        const { id, url } = arg;
        const card = parseYoutubeVideo(payload);

        if (!card) {
          state.youtubeVideos[id] = { status: 'error' };

          return;
        }

        state.youtubeVideos[id] = {
          status: 'success',
          url,
          ...card,
        };
      },
    );

    builder.addCase(fetchYoutubeVideo.rejected, (state, { meta: { arg } }) => {
      const { id } = arg;

      state.youtubeVideos[id] = { status: 'error' };
    });
  },
});

export default messageCards.reducer;
