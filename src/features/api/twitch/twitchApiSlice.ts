import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from 'app/store';
import { meIdSelector } from 'features/auth/authSelectors';
import {
  channelEmoteSetIdsSelector,
  currentChannelIdSelector,
  globalEmoteSetIdsSelector,
} from 'features/chat/chatSelectors';
import type { Emotes } from '../types';
import {
  parseBadges,
  parseBlockedUsers,
  parseTwitchClip,
  parseTwitchEmotes,
  parseTwitchVideo,
} from './twitchApiParseResponses';
import type {
  MessageCard,
  TwitchBadge,
  TwitchEmote,
  TwitchEmotesResponse,
  TwitchUsersResponse,
} from './twitchApiTypes';

export const API_BASE = 'https://api.twitch.tv/helix';

// https://dev.twitch.tv/docs/irc/emotes/#getting-emote-sets
export const EMOTE_SETS_LIMIT_BY_REQUEST = 25;

type TwitchEmotesData = {
  data: Emotes<TwitchEmote>;
  emoteSetIds: Record<string, boolean>;
  template: string;
};

export const twitchApi = createApi({
  reducerPath: 'twitchApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const accessToken = state.auth.accessToken;

      headers.set('Client-ID', process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!);
      headers.set('Authorization', `Bearer ${accessToken}`);

      return headers;
    },
  }),
  endpoints: (builder) => ({
    user: builder.query<TwitchUsersResponse, string>({
      query: (userId) => `${API_BASE}/users?id=${userId}`,
    }),

    twitchEmotes: builder.query<TwitchEmotesData, void>({
      queryFn: async (arg, { getState }, extraOptions, baseQuery) => {
        const state = getState() as RootState;
        const globalIds = globalEmoteSetIdsSelector(state);
        const userIds = channelEmoteSetIdsSelector(state);
        const oldData = twitchApi.endpoints.twitchEmotes.select()(state)
          .data as TwitchEmotesData | undefined;
        const fetchedIds = oldData?.emoteSetIds || {};

        const idsToFetch: Record<string, boolean> = {};

        [...globalIds, ...userIds].forEach((id) => {
          if (!fetchedIds[id]) idsToFetch[id] = true;
        });

        const ids = Object.keys(idsToFetch);

        if (!ids.length) return { data: oldData! };

        const requests: Promise<{ data: TwitchEmotesResponse }>[] = [];

        for (let i = 0; i < ids.length; i += EMOTE_SETS_LIMIT_BY_REQUEST) {
          const idsSlice = ids.slice(i, i + EMOTE_SETS_LIMIT_BY_REQUEST);
          const url = `${API_BASE}/chat/emotes/set?${idsSlice
            .map((id) => `emote_set_id=${id}`)
            .join('&')}`;
          requests.push(baseQuery(url) as any);
        }

        const responses = await Promise.all(requests);
        const template = responses[0].data.template;

        ids.forEach((id) => {
          fetchedIds[id] = true;
        });

        const data = parseTwitchEmotes(responses.map((r) => r.data));

        return { data: { data, emoteSetIds: fetchedIds, template } };
      },
    }),

    twitchGlobalBadges: builder.query<Record<string, TwitchBadge>, void>({
      query: () =>
        'https://badges.twitch.tv/v1/badges/global/display?language=en',
      transformResponse: parseBadges,
    }),
    twitchChannelBadges: builder.query<Record<string, TwitchBadge>, string>({
      query: (channelId) =>
        `https://badges.twitch.tv/v1/badges/channels/${channelId}/display?language=en`,
      transformResponse: parseBadges,
    }),

    // TODO: can be paginated
    blockedUsers: builder.query<string[], string>({
      query: (broadcasterId) =>
        `${API_BASE}/users/blocks?broadcaster_id=${broadcasterId}`,
      transformResponse: parseBlockedUsers,
    }),

    twitchClip: builder.query<MessageCard | null, string>({
      query: (clipId) => `${API_BASE}/clips?id=${clipId}`,
      transformResponse: parseTwitchClip,
    }),
    twitchVideo: builder.query<MessageCard | null, string>({
      query: (videoId) => `${API_BASE}/videos?id=${videoId}`,
      transformResponse: parseTwitchVideo,
    }),
  }),
});

export const {
  useUserQuery,
  useLazyUserQuery,

  useTwitchEmotesQuery,
  useLazyTwitchEmotesQuery,

  useTwitchGlobalBadgesQuery,
  useLazyTwitchGlobalBadgesQuery,

  useTwitchChannelBadgesQuery,
  useLazyTwitchChannelBadgesQuery,

  useBlockedUsersQuery,
  useLazyBlockedUsersQuery,

  useTwitchClipQuery,
  useLazyTwitchClipQuery,

  useTwitchVideoQuery,
  useLazyTwitchVideoQuery,
} = twitchApi;

export const twitchEmotesSelector = twitchApi.endpoints.twitchEmotes.select();
export const twitchEmoteSelector = (id: string) => (state: RootState) =>
  twitchEmotesSelector(state).data?.data.entries[id] || null;
export const twitchEmotesTemplateSelector = (state: RootState) =>
  twitchEmotesSelector(state).data?.template || null;
export const twitchGlobalBadgesSelector =
  twitchApi.endpoints.twitchGlobalBadges.select();
export const twitchChannelBadgesSelector = (state: RootState) =>
  twitchApi.endpoints.twitchChannelBadges.select(
    currentChannelIdSelector(state)!,
  )(state);
export const blockedUsersSelector = (state: RootState) =>
  twitchApi.endpoints.blockedUsers.select(meIdSelector(state)!)(state);
