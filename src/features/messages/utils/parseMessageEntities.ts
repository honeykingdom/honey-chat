import urlRegex from 'url-regex';
import type twitchIrc from '@honeykingdom/twitch-simple-irc';

import type { StateEmotes } from 'features/emotes/emotesSelectors';
import type { MessageEntity } from 'features/messages/messagesSlice';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import findEmote from 'features/emotes/utils/findEmote';

const MENTION_REGEX = /^(@([\p{Letter}\p{Number}_]+))(.*)/u;
const LINK_REGEX = urlRegex({ strict: false });

// https://discuss.dev.twitch.tv/t/28414/2
const getCodePointsCount = (string: string) => {
  let count = 0;

  // eslint-disable-next-line no-restricted-syntax, @typescript-eslint/no-unused-vars
  for (const char of string) {
    count += 1;
  }

  return count;
};

const normalizeEmbeddedEmotes = (embeddedEmotes: twitchIrc.Emotes) =>
  Object.entries(embeddedEmotes).reduce<Record<string, string>>(
    (result, [key, items]) => ({
      ...result,
      ...items.reduce((acc, { start }) => ({ ...acc, [start]: key }), {}),
    }),
    {},
  );

const findEntity = (
  word: string,
  emotes: StateEmotes,
  parseTwitch: boolean,
):
  | htmlEntity.TwitchEmote
  | htmlEntity.BttvEmote
  | htmlEntity.FfzEmote
  | htmlEntity.Emoji
  | [htmlEntity.Mention, string]
  | htmlEntity.Link
  | null => {
  if (!emotes) return null;

  if (parseTwitch) {
    const twitchEmote = findEmote.twitch.byName(word, emotes);

    if (twitchEmote) return twitchEmote;
  }

  const emote =
    findEmote.bttv.byName(word, emotes) ||
    findEmote.ffz.byName(word, emotes) ||
    findEmote.emoji.byChar(word);

  if (emote) return emote;

  const mentionMatch = word.match(MENTION_REGEX);

  if (mentionMatch) {
    const [, text, target, tail] = mentionMatch;

    return [htmlEntity.createMention(text, target.toLowerCase()), tail];
  }

  const linkMatch = word.match(LINK_REGEX);

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
  const words = message.split(' ');

  const checkEmbeddedEmotes =
    !isOwnMessage && !!embeddedEmotes && Object.keys(embeddedEmotes).length > 0;

  const normalizedEmbeddedEmotes = checkEmbeddedEmotes
    ? normalizeEmbeddedEmotes(embeddedEmotes as twitchIrc.Emotes)
    : {};

  const result: MessageEntity[] = [];
  let offset = 0;

  words.forEach((word, i, arr) => {
    const isLast = arr.length - 1 === i;
    let entity = null;

    if (checkEmbeddedEmotes) {
      const id = normalizedEmbeddedEmotes[offset];

      if (id) {
        entity = htmlEntity.createTwitchEmote({ id, token: word });
      }
    }

    if (!entity) {
      entity = findEntity(word, emotes, isOwnMessage);
    }

    if (entity) {
      if (Array.isArray(entity)) {
        const [entityItem, tail] = entity;

        result.push(entityItem);
        result.push(isLast ? tail : `${tail} `);
      } else {
        result.push(entity);

        if (!isLast) {
          result.push(' ');
        }
      }
    } else {
      const isLastItemString = typeof result[result.length - 1] === 'string';

      if (isLastItemString) {
        result[result.length - 1] += isLast ? word : `${word} `;
      } else {
        result.push(isLast ? word : `${word} `);
      }
    }

    offset += getCodePointsCount(word) + 1;
  });

  return result;
};

export default parseMessageEntities;
