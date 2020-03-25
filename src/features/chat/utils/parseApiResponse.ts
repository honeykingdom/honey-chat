import * as R from 'ramda';

import * as api from 'api';

export const parseTwitchEmotes = R.prop('emoticon_sets');

export const parseBttvGlobalEmotes = (
  data: api.BttvGlobalEmotesResponse,
): api.BttvGlobalEmote[] => data;

export const parseBttvChannelEmotes = (
  data: api.BttvChannelEmotesResponse,
): api.BttvChannelEmote[] => [...data.channelEmotes, ...data.sharedEmotes];

export const parseFfzGlobalEmotes = ({
  default_sets: defaultSets,
  sets,
}: api.FfzGlobalEmotesResponse): api.FfzEmote[] =>
  R.pipe<any, any, any, any, api.FfzEmote[]>(
    R.pick((defaultSets as unknown) as string[]),
    R.values,
    R.map(R.propOr([], 'emoticons')),
    R.flatten,
  )(sets);

export const parseFfzChannelEmotes: (
  data: api.FfzChannelEmotesResponse,
) => api.FfzEmote[] = R.pipe(
  R.pathOr({}, ['sets']),
  R.values,
  R.map(R.pathOr([], ['emoticons'])),
  R.flatten,
);

export const parseBlockedUsers = R.pipe<
  api.TwitchBlockedUsersResponse,
  {}[],
  string[]
>(R.prop('blocks'), R.map<any, any>(R.path(['user', 'name'])));

export const parseBadges = R.prop('badge_sets');
