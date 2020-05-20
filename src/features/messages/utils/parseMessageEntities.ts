import * as R from 'ramda';
import { parse as twemojiParser } from 'twemoji-parser';
import { lib as emojilib } from 'emojilib';
import urlRegex from 'url-regex';
import twitchIrc from 'twitch-simple-irc';

import type { StateEmotes } from 'features/emotes/emotesSelectors';
import type { MessageEntity } from 'features/messages/messagesSlice';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import findEmote from 'features/emotes/utils/findEmote';

const mentionRegex = /^@([\p{Letter}\p{Number}_]+)/u;
const linkRegex = urlRegex({ strict: false });

const normalizeEmbeddedEmotes = (embeddedEmotes: twitchIrc.Emotes) =>
  Object.entries(embeddedEmotes).reduce((result, [key, items]) => {
    const id = Number.parseInt(key, 10);

    return {
      ...result,
      ...items.reduce((acc, { start }) => ({ ...acc, [start]: id }), {}),
    };
  }, {} as Record<string, number>);

const findEmojiByName = (char: string) =>
  R.pipe<any, any, any, string | undefined>(
    R.filter(R.propEq('char', char)),
    R.keys,
    R.head,
  )(emojilib);

const findEntity = (
  word: string,
  emotes: StateEmotes,
  parseTwitch: boolean,
):
  | htmlEntity.TwitchEmote
  | htmlEntity.BttvEmote
  | htmlEntity.FfzEmote
  | htmlEntity.Emoji
  | [htmlEntity.Mention, number]
  | htmlEntity.Link
  | null => {
  if (!emotes) return null;

  if (parseTwitch) {
    const twitchEmote = findEmote.twitch.byName(word, emotes);

    if (twitchEmote) return twitchEmote;
  }

  const emote =
    findEmote.bttv.byName(word, emotes) || findEmote.ffz.byName(word, emotes);

  if (emote) return emote;

  // Don't parse two or more emotes without spaces between
  // Don't parse emote if it's not in the emojilib package
  const emojiMatch = twemojiParser(word, { assetType: 'png' });

  if (
    emojiMatch &&
    emojiMatch.length === 1 &&
    emojiMatch[0].text.length === word.length
  ) {
    const emoji = findEmojiByName(word);

    if (emoji) {
      const [{ url }] = emojiMatch;

      return htmlEntity.createEmoji(emoji, url);
    }
  }

  const mentionMatch = word.match(mentionRegex);

  if (mentionMatch) {
    const [text, target] = mentionMatch;

    return [
      htmlEntity.createMention(text, target.toLowerCase()),
      word.length - text.length,
    ] as [htmlEntity.Mention, number];
  }

  const linkMatch = word.match(linkRegex);

  if (linkMatch && linkMatch[0].length === word.length) {
    return htmlEntity.createLink(word);
  }

  return null;
};

const parseMessageEntities = (
  message: string,
  emotes: StateEmotes | null,
  embeddedEmotes: twitchIrc.Emotes | null,
  isOwnMessage = false,
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
        !isOwnMessage &&
        embeddedEmotes &&
        Object.keys(embeddedEmotes).length > 0
      ) {
        const normalizedEmotes = normalizeEmbeddedEmotes(embeddedEmotes);
        const id = normalizedEmotes[startIndex];

        if (id) {
          entity = htmlEntity.createTwitchEmote({ id, code: word });
        }
      }

      // Check other entities
      if (!entity) {
        entity = findEntity(word, emotes, isOwnMessage);
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

export default parseMessageEntities;
