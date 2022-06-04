import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store';
import { currentChannelIdSelector } from 'features/chat/chatSelectors';
import { Emotes } from '../types';
import { parseStvCosmetics, parseStvEmotes } from './stvApiParseResponses';
import { StvCosmetics, StvEmote } from './stvApiTypes';

const API_BASE = 'https://api.7tv.app/v2';

export const stvApi = createApi({
  reducerPath: 'stvApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    stvGlobalEmotes: builder.query<Emotes<StvEmote>, void>({
      query: () => '/emotes/global',
      transformResponse: parseStvEmotes,
    }),
    stvChannelEmotes: builder.query<Emotes<StvEmote>, string>({
      query: (channelId) => `/users/${channelId}/emotes`,
      transformResponse: parseStvEmotes,
    }),
    stvCosmetics: builder.query<StvCosmetics, void>({
      query: () => '/cosmetics?user_identifier=twitch_id',
      transformResponse: parseStvCosmetics,
    }),
  }),
});

export const {
  useLazyStvGlobalEmotesQuery,
  useStvGlobalEmotesQuery,

  useLazyStvChannelEmotesQuery,
  useStvChannelEmotesQuery,

  useLazyStvCosmeticsQuery,
  useStvCosmeticsQuery,
} = stvApi;

export const stvGlobalEmotesSelector =
  stvApi.endpoints.stvGlobalEmotes.select();
export const stvChannelEmotesSelector = (state: RootState) =>
  stvApi.endpoints.stvChannelEmotes.select(currentChannelIdSelector(state)!)(
    state,
  );
export const stvEmoteSelector = (id: string) => (state: RootState) =>
  stvGlobalEmotesSelector(state).data?.entries[id] ||
  stvChannelEmotesSelector(state).data?.entries[id] ||
  null;
export const stvCosmeticsSelector = stvApi.endpoints.stvCosmetics.select();
