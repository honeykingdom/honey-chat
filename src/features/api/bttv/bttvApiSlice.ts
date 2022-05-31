import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store';
import { currentChannelIdSelector } from 'features/chat/chatSelectors';
import { Badges, Emotes } from '../types';
import {
  parseBttvChannelEmotes,
  parseBttvGlobalBadges,
  parseBttvGlobalEmotes,
} from './bttvApiParseResponses';
import { BttvBadge, BttvChannelEmote, BttvGlobalEmote } from './bttvApiTypes';

const API_BASE = 'https://api.betterttv.net/3';

export const bttvApi = createApi({
  reducerPath: 'bttvApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_BASE }),
  endpoints: (builder) => ({
    bttvGlobalEmotes: builder.query<Emotes<BttvGlobalEmote>, void>({
      query: () => '/cached/emotes/global',
      transformResponse: parseBttvGlobalEmotes,
    }),
    bttvChannelEmotes: builder.query<Emotes<BttvChannelEmote>, string>({
      query: (channelId) => `/cached/users/twitch/${channelId}`,
      transformResponse: parseBttvChannelEmotes,
    }),
    bttvGlobalBadges: builder.query<Badges<BttvBadge>, void>({
      query: () => '/cached/badges',
      transformResponse: parseBttvGlobalBadges,
    }),
  }),
});

export const {
  useBttvGlobalEmotesQuery,
  useLazyBttvGlobalEmotesQuery,

  useBttvChannelEmotesQuery,
  useLazyBttvChannelEmotesQuery,

  useBttvGlobalBadgesQuery,
  useLazyBttvGlobalBadgesQuery,
} = bttvApi;

export const bttvGlobalEmotesSelector =
  bttvApi.endpoints.bttvGlobalEmotes.select();
export const bttvChannelEmotesSelector = (state: RootState) =>
  bttvApi.endpoints.bttvChannelEmotes.select(currentChannelIdSelector(state)!)(
    state,
  );
export const bttvGlobalBadgesSelector =
  bttvApi.endpoints.bttvGlobalBadges.select();
