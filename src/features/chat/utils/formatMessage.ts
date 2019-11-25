import * as R from 'ramda';
import { parse as twemojiParser } from 'twemoji-parser';
import { lib as emojilib } from 'emojilib';
import urlRegex from 'url-regex';
import TwitchIrc from 'twitch-simple-irc';

import { BttvGlobalEmote, BttvChannelEmote } from 'api/bttv';
import { TwitchEmote, TwitchEmoteSets } from 'api/twitch';
import { FfzEmote } from 'api/ffz';
import { StateEmotes } from 'features/chat/selectors/chatSelectors';
import { MessageEntity } from 'features/chat/slice/messages';
import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
  createEmoji,
  createMention,
  createLink,
  HtmlEntityTwitchEmote,
  HtmlEntityBttvEmote,
  HtmlEntityFfzEmote,
  HtmlEntityMention,
  HtmlEntityLink,
  HtmlEntityEmoji,
} from 'features/chat/utils/htmlEntity';

const mentionRegex = /^@([\p{Letter}\p{Number}_]+)/u;
const linkRegex = urlRegex({ strict: false });

const normalizeEmotesFromTags = R.pipe(
  // @ts-ignore
  R.toPairs,
  // @ts-ignore
  R.map(([id, value]) => R.map((v) => ({ id, ...v }), value)),
  R.flatten,
);

const regexMap: { [id: number]: string } = {
  4: '>\\(', // '\\&gt\\;\\('
  9: '<3', // '\\&lt\\;3'
};

const findTwitchEmote = (
  name: string,
  items: TwitchEmote[],
): TwitchEmote | undefined =>
  R.find(({ id, code }) => {
    // 1-14 - match by regex
    if (id >= 1 && id <= 14) {
      const regexString = regexMap[id] || code;
      return RegExp(`^${regexString}$`).test(name);
    }

    return name === code;
  }, items);

const findTwitchEmoteInSets = (
  name: string,
  sets: TwitchEmoteSets,
): TwitchEmote | null => {
  // eslint-disable-next-line no-restricted-syntax
  for (const set of Object.values(sets)) {
    const result = findTwitchEmote(name, set);

    if (result) return result;
  }

  return null;
};

const findBttvEmote = (
  name: string,
  items: Array<BttvGlobalEmote | BttvChannelEmote>,
): BttvGlobalEmote | BttvChannelEmote | undefined =>
  R.find(R.propEq('code', name), items);

const findFfzEmote = (name: string, items: FfzEmote[]): FfzEmote | undefined =>
  R.find(R.propEq('name', name), items);

const findEmoji = (char: string): string | undefined =>
  // @ts-ignore
  R.pipe(R.filter(R.propEq('char', char)), R.keys, R.head)(emojilib);

const findEntity = (
  word: string,
  emotes: StateEmotes,
  parseTwitch: boolean,
):
  | HtmlEntityTwitchEmote
  | HtmlEntityBttvEmote
  | HtmlEntityFfzEmote
  | HtmlEntityEmoji
  | [HtmlEntityMention, number]
  | HtmlEntityLink
  | null => {
  if (!emotes) return null;

  const {
    twitchGlobal,
    twitchUser,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
  } = emotes;

  if (parseTwitch) {
    const twitchEmote =
      findTwitchEmoteInSets(word, twitchGlobal) ||
      findTwitchEmoteInSets(word, twitchUser);

    if (twitchEmote) {
      return createTwitchEmote({ id: twitchEmote.id, code: word });
    }
  }

  const bttvEmote =
    findBttvEmote(word, bttvGlobal) || findBttvEmote(word, bttvChannel);

  if (bttvEmote) {
    return createBttvEmote(bttvEmote);
  }

  const ffzEmote =
    findFfzEmote(word, ffzGlobal) || findFfzEmote(word, ffzChannel);

  if (ffzEmote) {
    return createFfzEmote(ffzEmote);
  }

  // Don't parse two or more emotes without spaces between
  // Don't parse emote if it's not in the emojilib package
  const emojiMatch = twemojiParser(word, { assetType: 'png' });

  if (
    emojiMatch &&
    emojiMatch.length === 1 &&
    emojiMatch[0].text.length === word.length
  ) {
    const emoji = findEmoji(word);

    if (emoji) {
      const [{ url }] = emojiMatch;

      return createEmoji(emoji, url);
    }
  }

  const mentionMatch = word.match(mentionRegex);

  if (mentionMatch) {
    const [text, target] = mentionMatch;

    return [
      createMention(text, target.toLowerCase()),
      word.length - text.length,
    ] as [HtmlEntityMention, number];
  }

  const linkMatch = word.match(linkRegex);

  if (linkMatch && linkMatch[0].length === word.length) {
    return createLink(word);
  }

  return null;
};

const formatMessage = (
  message: string,
  emotes: StateEmotes | null,
  embeddedEmotes: TwitchIrc.Emotes | null,
  { parseTwitch = false }: { parseTwitch?: boolean } = {},
): MessageEntity[] => {
  // If the message was sent by the current user, there is no embedded emotes
  // So we need to parse twitch emotes manually

  const result = [];
  let offset = 0;
  // Before that offset all content was added to the result array
  let arrayOffset = 0;

  // Check every word. From offset to the next space index
  do {
    const spaceIndex = message.indexOf(' ', offset + 1);

    const isStart = offset === 0;
    const isEnd = spaceIndex === -1;

    const startIndex = isStart ? offset : offset + 1;
    const endIndex = isEnd ? message.length : spaceIndex;

    const word = message.substring(startIndex, endIndex);

    if (word) {
      let entity = null;

      // Check embedded twitch emotes
      if (
        !parseTwitch &&
        embeddedEmotes &&
        Object.keys(embeddedEmotes).length > 0
      ) {
        const normalizedEmbeddedEmotes = normalizeEmotesFromTags(
          embeddedEmotes,
        );

        const embeddedEmote = R.find(
          R.propEq('start', startIndex),
          normalizedEmbeddedEmotes,
        );

        if (embeddedEmote) {
          entity = createTwitchEmote({ id: embeddedEmote.id, code: word });
        }
      }

      // Check other entities
      if (!entity) {
        entity = findEntity(word, emotes, parseTwitch);
      }

      if (entity) {
        // Push all text before this entity
        if (arrayOffset !== startIndex) {
          const textBefore = message.substring(arrayOffset, startIndex);
          result.push(textBefore);
        }

        // If entity it's an array it means entity may be not full word
        // The second element is the difference between word length and entity length
        if (Array.isArray(entity)) {
          const [entityObject, difference] = entity;
          result.push(entityObject);
          arrayOffset = endIndex - difference;
        } else {
          result.push(entity);
          arrayOffset = endIndex;
        }
      }
    }

    // If it's the last word and it wasn't added to the result add it now
    if (spaceIndex === -1 && arrayOffset !== endIndex) {
      const textAfter = message.substring(arrayOffset, endIndex);
      result.push(textAfter);
    }

    offset = spaceIndex;
  } while (offset !== -1);

  return result;
};

export default formatMessage;
