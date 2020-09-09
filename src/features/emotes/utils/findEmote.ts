import * as R from 'ramda';

import * as api from 'api';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import type { StateEmotes } from 'features/emotes/emotesSelectors';
import type { EmotesByText } from 'features/emotes/utils/getEmotesByText';
import emojisMap from 'features/emotes/emojisMap.json';

const emojisList = Object.values(emojisMap);

// by id

const findTwitchEmoteByIdInSets = (
  id: number | string,
  sets: Record<string, api.TwitchEmote[]>,
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const set of Object.values(sets)) {
    // eslint-disable-next-line eqeqeq
    const result = R.find((emote) => emote.id == id, set);

    if (result) return htmlEntity.createTwitchEmote(result);
  }

  return null;
};

const findTwitchEmoteById = (
  id: number | string,
  { twitchGlobal, twitchUser }: NonNullable<StateEmotes>,
) =>
  findTwitchEmoteByIdInSets(id, twitchGlobal) ||
  findTwitchEmoteByIdInSets(id, twitchUser);

const findBttvEmoteById = (
  id: string,
  { bttvGlobal, bttvChannel }: NonNullable<StateEmotes>,
) => {
  const findById = R.find<api.BttvGlobalEmote | api.BttvChannelEmote>(
    R.propEq('id', id),
  );
  const result = findById(bttvGlobal) || findById(bttvChannel);

  return result ? htmlEntity.createBttvEmote(result) : null;
};

const findFfzEmoteById = (
  id: number,
  { ffzGlobal, ffzChannel }: NonNullable<StateEmotes>,
) => {
  const findById = R.find<api.FfzEmote>(R.propEq('id', id));
  const result = findById(ffzGlobal) || findById(ffzChannel);

  return result ? htmlEntity.createFfzEmote(result) : null;
};

const findEmojiByChar = (char: string) => {
  const result = R.find(R.propEq('char', char), emojisList);

  return result ? htmlEntity.createEmoji(result) : null;
};

// by name

const emotesMap: Record<string, string[]> = {
  555555557: [':-)', ':)'],
  555555559: [':-(', ':('],
  555555561: [':-D', ':D'],
  555555562: ['>('],
  555555568: [':-z', ':-Z', ':-|', ':z', ':Z', ':|'],
  555555576: ['o_o', 'O_o', 'O_O', 'o_O', 'o.o', 'O.o', 'O.O', 'o.O'],
  555555579: ['B-)', 'B)'],
  555555583: [':-o', ':-O', ':o', ':O'],
  555555584: ['<3'],
  555555588: [':-\\', ':-/', ':\\', ':/'],
  555555590: [';-\\', ';\\'],
  555555594: [':-p', ':-P', ':p', ':P'],
  555555598: [';-p', ';-P', ';p', ';P'],
  555555600: ['R-)', 'R)'],
};

const findTwitchEmoteByNameInSets = (
  name: string,
  sets: Record<string, api.TwitchEmote[]>,
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const set of Object.values(sets)) {
    const result = R.find(
      ({ id, code }) =>
        emotesMap[id] ? emotesMap[id].includes(name) : name === code,
      set,
    );

    if (result) return htmlEntity.createTwitchEmote(result);
  }

  return null;
};

const findTwitchEmoteByName = (
  name: string,
  { twitchGlobal, twitchUser }: NonNullable<StateEmotes>,
) =>
  findTwitchEmoteByNameInSets(name, twitchGlobal) ||
  findTwitchEmoteByNameInSets(name, twitchUser);

const findBttvEmoteByName = (
  name: string,
  { bttvGlobal, bttvChannel }: NonNullable<StateEmotes>,
) => {
  const findByName = R.find<api.BttvGlobalEmote | api.BttvChannelEmote>(
    R.propEq('code', name),
  );
  const result = findByName(bttvGlobal) || findByName(bttvChannel);

  return result ? htmlEntity.createBttvEmote(result) : null;
};

const findFfzEmoteByName = (
  name: string,
  { ffzGlobal, ffzChannel }: NonNullable<StateEmotes>,
) => {
  const findByName = R.find<api.FfzEmote>(R.propEq('name', name));
  const result = findByName(ffzGlobal) || findByName(ffzChannel);

  return result ? htmlEntity.createFfzEmote(result) : null;
};

// by text

/* eslint-disable no-restricted-syntax */
const findTwitchEmotesByText = (
  result: EmotesByText,
  sets: Record<string, api.TwitchEmote[]>,
  text: string,
  limit: number,
) => {
  for (const items of Object.values(sets)) {
    for (const emote of items) {
      if (result.begins.length + result.contains.length === limit) return true;

      const index = emote.code.toLowerCase().indexOf(text);

      if (index !== -1) {
        const type = index === 0 ? 'begins' : 'contains';

        result[type].push(htmlEntity.createTwitchEmote(emote));
      }
    }
  }

  return false;
};

const findBttvEmotesByText = (
  result: EmotesByText,
  bttv: api.BttvGlobalEmote[] | api.BttvChannelEmote[],
  text: string,
  limit: number,
) => {
  for (const emote of bttv) {
    if (result.begins.length + result.contains.length === limit) return true;

    const index = emote.code.toLowerCase().indexOf(text);

    if (index !== -1) {
      const type = index === 0 ? 'begins' : 'contains';

      result[type].push(htmlEntity.createBttvEmote(emote));
    }
  }

  return false;
};

const findFfzEmotesByText = (
  result: EmotesByText,
  ffz: api.FfzEmote[],
  text: string,
  limit: number,
) => {
  for (const emote of ffz) {
    if (result.begins.length + result.contains.length === limit) return true;

    const index = emote.name.toLowerCase().indexOf(text);

    if (index !== -1) {
      const type = index === 0 ? 'begins' : 'contains';

      result[type].push(htmlEntity.createFfzEmote(emote));
    }
  }

  return false;
};

const findEmojisByText = (
  result: EmotesByText,
  text: string,
  limit: number,
) => {
  for (const emoji of emojisList) {
    if (result.begins.length + result.contains.length === limit) return true;

    const { short, keywords } = emoji;

    let index = short.toLowerCase().indexOf(text);

    if (index !== -1) {
      const type = index === 0 ? 'begins' : 'contains';
      const emojiEntity = htmlEntity.createEmoji(emoji);

      result[type].push(emojiEntity);

      // eslint-disable-next-line no-continue
      continue;
    }

    for (const keyword of keywords) {
      index = keyword.toLowerCase().indexOf(text);

      if (index !== -1) {
        const emojiEntity = htmlEntity.createEmoji(emoji);

        result.contains.push(emojiEntity);

        break;
      }
    }
  }

  return false;
};
/* eslint-enable no-restricted-syntax */

const findEmote = {
  twitch: {
    byId: findTwitchEmoteById,
    byName: findTwitchEmoteByName,
    byText: findTwitchEmotesByText,
  },
  bttv: {
    byId: findBttvEmoteById,
    byName: findBttvEmoteByName,
    byText: findBttvEmotesByText,
  },
  ffz: {
    byId: findFfzEmoteById,
    byName: findFfzEmoteByName,
    byText: findFfzEmotesByText,
  },
  emoji: {
    byChar: findEmojiByChar,
    byText: findEmojisByText,
  },
};

export default findEmote;
