import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type { MessageCardDetails } from 'features/messageCards';
import { parseYoutubeVideo } from './youtubeApiParseResponses';

const API_BASE = 'https://www.googleapis.com/youtube/v3';
const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export const youtubeApi = createApi({
  reducerPath: 'youtubeApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    youtubeVideo: builder.query<MessageCardDetails | null, string>({
      query: (videoId) => `/videos?part=snippet&id=${videoId}&key=${API_KEY}`,
      transformResponse: parseYoutubeVideo,
    }),
  }),
});

export const { useYoutubeVideoQuery } = youtubeApi;
