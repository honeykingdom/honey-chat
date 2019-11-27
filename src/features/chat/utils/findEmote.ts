import * as R from 'ramda';

import * as api from 'api';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import { StateEmotes } from 'features/chat/selectors/chatSelectors';

// by id

const findTwitchEmoteByIdInSets = (
  id: number,
  sets: Record<string, api.TwitchEmote[]>,
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const set of Object.values(sets)) {
    const result = R.find(R.propEq('id', id), set);

    if (result) return htmlEntity.createTwitchEmote(result);
  }

  return null;
};

const findTwitchEmoteById = (
  id: number,
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

// by name

const regexMap: Record<number, string> = {
  4: '>\\(', // '\\&gt\\;\\('
  9: '<3', // '\\&lt\\;3'
};

const findTwitchEmoteByNameInSets = (
  name: string,
  sets: Record<string, api.TwitchEmote[]>,
) => {
  // eslint-disable-next-line no-restricted-syntax
  for (const set of Object.values(sets)) {
    const result = R.find(({ id, code }) => {
      // 1-14 - match by regex
      if (id >= 1 && id <= 14) {
        const regexString = regexMap[id] || code;
        return RegExp(`^${regexString}$`).test(name);
      }

      return name === code;
    }, set);

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
  result: any[],
  sets: Record<string, api.TwitchEmote[]>,
  text: string,
  limit: number,
): boolean => {
  for (const items of Object.values(sets)) {
    for (const emote of items) {
      if (result.length === limit) return true;

      if (emote.code.toLowerCase().includes(text)) {
        result.push(htmlEntity.createTwitchEmote(emote));
      }
    }
  }

  return false;
};

const findBttvEmotesByText = (
  result: any[],
  bttv: api.BttvGlobalEmote[] | api.BttvChannelEmote[],
  text: string,
  limit: number,
): boolean => {
  for (const emote of bttv) {
    if (result.length === limit) return true;

    if (emote.code.toLowerCase().includes(text)) {
      result.push(htmlEntity.createBttvEmote(emote));
    }
  }

  return false;
};

const findFfzEmotesByText = (
  result: any[],
  ffz: api.FfzEmote[],
  text: string,
  limit: number,
): boolean => {
  for (const emote of ffz) {
    if (result.length === limit) return true;

    if (emote.name.toLowerCase().includes(text)) {
      result.push(htmlEntity.createFfzEmote(emote));
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
};

export default findEmote;
