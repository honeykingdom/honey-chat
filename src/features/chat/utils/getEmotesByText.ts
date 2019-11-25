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
  text: string,
  limit: number,
): boolean => {
  for (const items of Object.values(sets)) {
    for (const emote of items) {
      if (result.length === limit) return true;

      if (emote.code.toLowerCase().includes(text)) {
        result.push(createTwitchEmote(emote));
      }
    }
  }

  return false;
};

const checkBttv = (
  result: any[],
  items: Array<BttvGlobalEmote | BttvChannelEmote>,
  text: string,
  limit: number,
): boolean => {
  for (const emote of items) {
    if (result.length === limit) return true;

    if (emote.code.toLowerCase().includes(text)) {
      result.push(createBttvEmote(emote));
    }
  }

  return false;
};

const checkFfz = (
  result: any[],
  items: FfzEmote[],
  text: string,
  limit: number,
): boolean => {
  for (const emote of items) {
    if (result.length === limit) return true;

    if (emote.name.toLowerCase().includes(text)) {
      result.push(createFfzEmote(emote));
    }
  }

  return false;
};

const getEmotesByText = (
  text: string,
  emotes: StateEmotes,
  limit = -1,
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

  const textLower = text.toLowerCase();

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const isOver =
    checkBttv(result, bttvChannel, textLower, limit) ||
    checkFfz(result, ffzChannel, textLower, limit) ||
    checkTwitch(result, twitchUser, textLower, limit) ||
    checkTwitch(result, twitchGlobal, textLower, limit) ||
    checkBttv(result, bttvGlobal, textLower, limit) ||
    checkFfz(result, ffzGlobal, textLower, limit);

  return result;
};

export default getEmotesByText;
