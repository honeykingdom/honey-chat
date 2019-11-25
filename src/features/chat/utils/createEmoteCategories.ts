import * as R from 'ramda';

import { TwitchEmote, TwitchEmoteSets } from 'api/twitch';
import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
  HtmlEntityEmote,
} from 'features/chat/utils/htmlEntity';
import { StateEmotes } from 'features/chat/selectors';

// prettier-ignore
const regexEmotesMap: { [value: string]: string } = {
  '[oO](_|\\.)[oO]': 'O_o',
  '\\&gt\\;\\(':     '>(',
  '\\&lt\\;3':       '<3',
  '\\:-?(o|O)':      ':O',
  '\\:-?(p|P)':      ':P',
  '\\:-?[\\\\/]':    ':/',
  '\\:-?[z|Z|\\|]':  ':Z',
  '\\:-?\\(':        ':(',
  '\\:-?\\)':        ':)',
  '\\:-?D':          ':D',
  '\\;-?(p|P)':      ';P',
  '\\;-?\\)':        ';)',
  'R-?\\)':          'R)',
  'B-?\\)':          'B)',
};

const createGlobalTwitchEmote = ({ id, code }: TwitchEmote) =>
  createTwitchEmote({ id, code: regexEmotesMap[code] || code });

export type EmoteCategory = {
  title?: string;
  items: HtmlEntityEmote[];
};

const createEmoteCategories = (emotes: StateEmotes) => {
  if (!emotes) return [];

  const {
    twitchGlobal,
    twitchUser,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
  } = emotes;

  return [
    {
      title: 'BetterTTV Channel Emotes',
      items: bttvChannel.map(createBttvEmote),
    },
    {
      title: 'FrankerFaceZ Channel Emotes',
      items: ffzChannel.map(createFfzEmote),
    },
    ...R.pipe<TwitchEmoteSets, TwitchEmote[][], EmoteCategory[]>(
      R.values,
      R.map((items) => ({ items: R.map(createTwitchEmote, items) })),
    )(twitchUser),
    {
      title: 'Twitch',
      items: R.map(createGlobalTwitchEmote, R.propOr([], '0', twitchGlobal)),
    },
    {
      title: 'BetterTTV',
      items: bttvGlobal.map(createBttvEmote),
    },
    {
      title: 'FrankerFaceZ',
      items: ffzGlobal.map(createFfzEmote),
    },
  ].filter(({ items }) => items.length > 0) as EmoteCategory[];
};

export default createEmoteCategories;
