import * as R from 'ramda';

import * as api from 'api';
import twitchEmotes from 'mocks/twitchEmotes.json';
import bttvGlobal from 'mocks/bttvGlobalEmotes.json';
import bttvChannel from 'mocks/bttvChannelEmotes.json';
import ffzGlobal from 'mocks/ffzGlobalEmotes.json';
import ffzChannel from 'mocks/ffzChannelEmotes.json';
import {
  parseTwitchEmotes,
  parseBttvGlobalEmotes,
  parseBttvChannelEmotes,
  parseFfzGlobalEmotes,
  parseFfzChannelEmotes,
} from 'features/chat/utils/parseApiResponse';
import findEmote from 'features/chat/utils/findEmote';

export const emotes = {
  twitchGlobal: R.pipe(parseTwitchEmotes, R.pick(['0']))(twitchEmotes),
  twitchUser: R.pipe(parseTwitchEmotes, R.omit(['0']))(twitchEmotes),
  bttvGlobal: parseBttvGlobalEmotes(bttvGlobal as api.BttvGlobalEmotesResponse),
  bttvChannel: parseBttvChannelEmotes(
    bttvChannel as api.BttvChannelEmotesResponse,
  ),
  ffzGlobal: parseFfzGlobalEmotes(ffzGlobal),
  ffzChannel: parseFfzChannelEmotes(ffzChannel),
};

export const findTwitchEmote = (name: string) =>
  findEmote.twitch.byName(name, emotes);

export const findBttvEmote = (name: string) =>
  findEmote.bttv.byName(name, emotes);

export const findFfzEmote = (name: string) =>
  findEmote.ffz.byName(name, emotes);

export const getEmojiUrl = (code: string) =>
  `https://twemoji.maxcdn.com/v/latest/72x72/${code}.png`;
