/* eslint-disable no-restricted-syntax */
import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
  HtmlEntityEmote,
} from 'features/chat/utils/htmlEntity';
import { StateEmotes } from 'features/chat/selectors/chatSelectors';
import { TwitchEmote } from 'api/twitch';
import { BttvGlobalEmote, BttvChannelEmote } from 'api/bttv';
import { FfzEmote } from 'api/ffz';

const checkTwitch = (
  result: any[],
  sets: {
    [setId: string]: TwitchEmote[];
  },
  beginText: string,
  limit: number,
): boolean => {
  for (const items of Object.values(sets)) {
    for (const emote of items) {
      if (result.length === limit) return true;

      if (emote.code.toLowerCase().includes(beginText)) {
        result.push(createTwitchEmote(emote));
      }
    }
  }

  return false;
};

const checkBttv = (
  result: any[],
  items: Array<BttvGlobalEmote | BttvChannelEmote>,
  beginText: string,
  limit: number,
): boolean => {
  for (const emote of items) {
    if (result.length === limit) return true;

    if (emote.code.toLowerCase().includes(beginText)) {
      result.push(createBttvEmote(emote));
    }
  }

  return false;
};

const checkFfz = (
  result: any[],
  items: FfzEmote[],
  beginText: string,
  limit: number,
): boolean => {
  for (const emote of items) {
    if (result.length === limit) return true;

    if (emote.name.toLowerCase().includes(beginText)) {
      result.push(createFfzEmote(emote));
    }
  }

  return false;
};

const getEmoteSuggestions = (
  beginText: string,
  emotes: StateEmotes,
  limit = 10,
): HtmlEntityEmote[] => {
  if (!emotes) return [];

  const result: HtmlEntityEmote[] = [];
  const {
    twitchGlobal,
    twitchUser,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
  } = emotes;

  const beginTextLower = beginText.toLowerCase();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const isOver =
    checkBttv(result, bttvChannel, beginTextLower, limit) ||
    checkFfz(result, ffzChannel, beginTextLower, limit) ||
    checkTwitch(result, twitchUser, beginTextLower, limit) ||
    checkTwitch(result, twitchGlobal, beginTextLower, limit) ||
    checkBttv(result, bttvGlobal, beginTextLower, limit) ||
    checkFfz(result, ffzGlobal, beginTextLower, limit);

  return result;
};

export default getEmoteSuggestions;
