import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store';
import { currentChannelIdSelector } from 'features/chat/chatSelectors';
import { Emoji } from 'features/emotes';
import { Badges, Emotes } from '../types';
import {
  parseFfzApGlobalBadges,
  parseFfzChannelEmotes,
  parseFfzEmoji,
  parseFfzGlobalBadges,
  parseFfzGlobalEmotes,
} from './ffzApiParseResponses';
import { FfzApBadge, FfzBadge, FfzEmote } from './ffzApiTypes';

const API_BASE = 'https://api.frankerfacez.com/v1';

export const ffzApi = createApi({
  reducerPath: 'ffzApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  endpoints: (builder) => ({
    ffzGlobalEmotes: builder.query<Emotes<FfzEmote>, void>({
      query: () => `${API_BASE}/set/global`,
      transformResponse: parseFfzGlobalEmotes,
    }),
    ffzChannelEmotes: builder.query<Emotes<FfzEmote>, string>({
      query: (channelId) => `${API_BASE}/room/id/${channelId}`,
      transformResponse: parseFfzChannelEmotes,
    }),
    ffzEmoji: builder.query<Emotes<Emoji>, void>({
      query: () => 'https://cdn.frankerfacez.com/static/emoji/v3.2.json',
      transformResponse: parseFfzEmoji,
    }),
    ffzGlobalBadges: builder.query<Badges<FfzBadge>, void>({
      query: () => `${API_BASE}/badges/ids`,
      transformResponse: parseFfzGlobalBadges,
    }),
    ffzApGlobalBadges: builder.query<Badges<FfzApBadge>, void>({
      query: () => 'https://api.ffzap.com/v1/supporters',
      transformResponse: parseFfzApGlobalBadges,
    }),
  }),
});

export const {
  useLazyFfzGlobalEmotesQuery,
  useFfzGlobalEmotesQuery,

  useLazyFfzChannelEmotesQuery,
  useFfzChannelEmotesQuery,

  useLazyFfzEmojiQuery,
  useFfzEmojiQuery,

  useLazyFfzGlobalBadgesQuery,
  useFfzGlobalBadgesQuery,

  useLazyFfzApGlobalBadgesQuery,
  useFfzApGlobalBadgesQuery,
} = ffzApi;

export const ffzGlobalEmotesSelector =
  ffzApi.endpoints.ffzGlobalEmotes.select();
export const ffzChannelEmotesSelector = (state: RootState) =>
  ffzApi.endpoints.ffzChannelEmotes.select(currentChannelIdSelector(state)!)(
    state,
  );
export const ffzEmoteSelector = (id: string) => (state: RootState) =>
  ffzGlobalEmotesSelector(state).data?.entries[id] ||
  ffzChannelEmotesSelector(state).data?.entries[id] ||
  null;
export const ffzEmojisSelector = ffzApi.endpoints.ffzEmoji.select();
export const ffzEmojiSelector = (id: string) => (state: RootState) =>
  ffzEmojisSelector(state).data?.entries[id] || null;
export const ffzGlobalBadgesSelector =
  ffzApi.endpoints.ffzGlobalBadges.select();
export const ffsApBadgesSelector = ffzApi.endpoints.ffzApGlobalBadges.select();
