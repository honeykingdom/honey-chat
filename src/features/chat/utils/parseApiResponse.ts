import * as R from 'ramda';
import {
  FfzEmote,
  FfzGlobalEmotesResponse,
  FfzChannelEmotesResponse,
} from 'api/ffz';
import {
  BttvGlobalEmote,
  BttvGlobalEmotesResponse,
  BttvChannelEmotesResponse,
  BttvChannelEmote,
} from 'api/bttv';
import {
  TwitchEmotesResponse,
  TwitchEmoteSets,
  TwitchBlockedUsersResponse,
} from 'api/twitch';

export const parseTwitchGlobalEmotes = R.pipe<
  TwitchEmotesResponse,
  TwitchEmoteSets,
  TwitchEmoteSets
>(R.prop('emoticon_sets'), R.pick(['0']));

export const parseTwitchChannelEmotes = R.pipe<
  TwitchEmotesResponse,
  TwitchEmoteSets,
  TwitchEmoteSets
>(R.prop('emoticon_sets'), R.omit(['0']));

export const parseBttvGlobalEmotes = (
  data: BttvGlobalEmotesResponse,
): BttvGlobalEmote[] => data;

export const parseBttvChannelEmotes = (
  data: BttvChannelEmotesResponse,
): BttvChannelEmote[] => [...data.channelEmotes, ...data.sharedEmotes];

export const parseFfzGlobalEmotes = ({
  default_sets: defaultSets,
  sets,
}: FfzGlobalEmotesResponse): FfzEmote[] =>
  R.pipe<{}, {}, any[], any[], any[]>(
    R.pick((defaultSets as unknown) as string[]),
    R.values,
    R.map(R.propOr([], 'emoticons')),
    R.flatten,
  )(sets);

export const parseFfzChannelEmotes: (
  data: FfzChannelEmotesResponse,
) => FfzEmote[] = R.pipe(
  R.pathOr({}, ['sets']),
  R.values,
  R.map(R.pathOr([], ['emoticons'])),
  R.flatten,
);

export const parseBlockedUsers = R.pipe<
  TwitchBlockedUsersResponse,
  {}[],
  string[]
>(R.prop('blocks'), R.map(R.path(['user', 'name'])) as () => string[]);

export const parseBadges = R.prop('badge_sets');
