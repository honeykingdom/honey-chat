import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// `https://honeykingdom.herokuapp.com/api/v1/recent-messages/${channel}`
// `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}?clearchatToNotice=true`

export interface RecentMessagesResponse {
  messages: string[];
  error: null;
}

export const recentMessagesApi = createApi({
  reducerPath: 'recentMessagesApi',
  keepUnusedDataFor: Infinity,
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    recentMessages: builder.query<RecentMessagesResponse, string>({
      query: (channelName) =>
        `https://recent-messages.robotty.de/api/v2/recent-messages/${channelName}?clearchatToNotice=true`,
    }),
  }),
});

export const { useLazyRecentMessagesQuery } = recentMessagesApi;
