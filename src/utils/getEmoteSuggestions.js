/* eslint-disable no-restricted-syntax */
import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
} from 'utils/formatMessage';

const checkTwitch = (result, sets, beginText, limit) => {
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

const checkBttv = (result, items, beginText, limit) => {
  for (const emote of items) {
    if (result.length === limit) return true;

    if (emote.code.toLowerCase().includes(beginText)) {
      result.push(createBttvEmote(emote));
    }
  }

  return false;
};

const checkFfz = (result, items, beginText, limit) => {
  for (const emote of items) {
    if (result.length === limit) return true;

    if (emote.name.toLowerCase().includes(beginText)) {
      result.push(createFfzEmote(emote));
    }
  }

  return false;
};

const getEmoteSuggestions = (beginText, emotes, limit = 10) => {
  if (!emotes) return [];

  const result = [];
  const {
    twitchGlobal,
    twitchUser,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
  } = emotes;

  const beginTextLower = beginText.toLowerCase();

  // eslint-disable-next-line no-unused-vars
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
