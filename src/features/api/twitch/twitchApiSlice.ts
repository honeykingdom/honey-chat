import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store';
import { CLIENT_ID } from 'utils/constants';
import type { MessageCardDetails } from 'features/messageCards/messageCardsTypes';
import { parseTwitchClip, parseTwitchVideo } from './twitchApiParseResponses';

export const API_BASE = 'https://api.twitch.tv/helix';

export const twitchApi = createApi({
  reducerPath: 'twitchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE,
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const { accessToken } = state.chat.me;
      headers.set('Client-ID', CLIENT_ID);
      headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    twitchClip: builder.query<MessageCardDetails | null, string>({
      query: (clipId) => `/clips?id=${clipId}`,
      transformResponse: parseTwitchClip,
    }),
    twitchVideo: builder.query<MessageCardDetails | null, string>({
      query: (videoId) => `/videos?id=${videoId}`,
      transformResponse: parseTwitchVideo,
    }),
  }),
});

export const { useTwitchClipQuery, useTwitchVideoQuery } = twitchApi;
