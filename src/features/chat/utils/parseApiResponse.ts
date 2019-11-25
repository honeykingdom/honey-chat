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
import { TwitchEmotesResponse, TwitchEmoteSets } from 'api/twitch';

export const parseTwitchGlobalEmotes = R.pipe(
  R.prop('emoticon_sets'),
  R.pick(['0']),
) as (data: TwitchEmotesResponse) => TwitchEmoteSets;

export const parseTwitchChannelEmotes = R.pipe(
  R.prop('emoticon_sets'),
  R.omit(['0']),
) as (data: TwitchEmotesResponse) => TwitchEmoteSets;

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
  R.pipe(
    // @ts-ignore
    R.pick(defaultSets),
    // @ts-ignore
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
