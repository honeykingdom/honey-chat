import { Emoji } from 'features/emotes/emotesTypes';
import { Badges, Emotes } from '../types';
import {
  FfzApBadge,
  FfzBadge,
  FfzChannelEmotesResponse,
  FfzEmojiResponse,
  FfzEmote,
  FfzGlobalBadgesResponse,
  FfzGlobalEmotesResponse,
} from './ffzApiTypes';

export const parseFfzGlobalEmotes = ({
  default_sets: defaultSets,
  sets,
}: FfzGlobalEmotesResponse): Emotes<FfzEmote> => {
  const result: Emotes<FfzEmote> = { entries: {}, nameToId: {} };

  for (const setId of defaultSets) {
    for (const emote of sets[setId].emoticons) {
      result.entries[emote.id] = emote;
      result.nameToId[emote.name] = emote.id.toString();
    }
  }

  return result;
};

export const parseFfzChannelEmotes = ({
  room,
  sets,
}: FfzChannelEmotesResponse): Emotes<FfzEmote> => {
  const result: Emotes<FfzEmote> = { entries: {}, nameToId: {} };

  for (const emote of sets[room.set].emoticons) {
    result.entries[emote.id] = emote;
    result.nameToId[emote.name] = emote.id.toString();
  }

  return result;
};

const codePointsToString = (codePoints: string): string =>
  String.fromCodePoint(...codePoints.split('-').map((s) => parseInt(s, 16)));

// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/emoji.js#L305
const hasInTwitter = (has: number) => 0b0010 & has;

export const parseFfzEmoji = ({
  e: emojis,
}: FfzEmojiResponse): Emotes<Emoji> => {
  const result: Emotes<Emoji> = { entries: {}, nameToId: {} };
  // const names: string[] = [];

  const addToNameToId = (
    char: string,
    name: string | string[],
    codePoints: string,
  ) => {
    result.nameToId[char] = codePoints;

    if (Array.isArray(name)) {
      for (const n of name) result.nameToId[`:${n}:`] = codePoints;
      // for (const n of name) names.push(n);
    } else {
      result.nameToId[`:${name}:`] = codePoints;
      // names.push(name);
    }
  };

  for (const [category, sort, name, , codePoints, , has, variants] of emojis) {
    if (!hasInTwitter(has)) continue;

    const char = codePointsToString(codePoints);

    addToNameToId(char, name, codePoints);

    result.entries[codePoints] = {
      category,
      sort,
      char,
      name,
      codePoints,
      variants: variants ? variants.map(([codePoints]) => codePoints) : [],
    };

    if (Array.isArray(variants)) {
      for (const [codePoints, , , , , name] of variants) {
        const char = codePointsToString(codePoints);

        addToNameToId(char, name, codePoints);

        result.entries[codePoints] = {
          category: -1,
          sort: -1,
          char,
          name,
          codePoints,
          variants: [],
        };
      }
    }
  }

  // if (names.length !== new Set(names).size) throw new Error('Duplicate names');

  return result;
};

export const parseFfzGlobalBadges = ({
  badges,
  users,
}: FfzGlobalBadgesResponse): Badges<FfzBadge> => {
  const result: Badges<FfzBadge> = { entries: {}, users: {} };

  for (const badge of badges) result.entries[badge.id] = badge;

  for (const [badgeId, userIds] of Object.entries(users)) {
    for (const userId of userIds) {
      if (!result.users[userId]) result.users[userId] = [];

      result.users[userId].push(badgeId);
    }
  }

  return result;
};

// https://api.ffzap.com/v1/user/badge/default/3
// https://api.ffzap.com/v1/user/badge/${user.id}/3
// https://github.com/FrankerFaceZ/Add-Ons/blob/master/src/ffzap-core/index.js
export const parseFfzApGlobalBadges = (
  data: FfzApBadge[],
): Badges<FfzApBadge> => {
  const result: Badges<FfzApBadge> = { entries: {}, users: {} };

  for (const badge of data) {
    result.entries[badge.id] = badge;
    result.users[badge.id] = [badge.id.toString()];
  }

  return result;
};
