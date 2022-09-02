import urlRegex from 'url-regex';
import type { AllEmotes } from '../../emotes/emotesTypes';
import { MessagePartType } from '../messagesConstants';
import { MessagePart } from '../messagesTypes';

const MENTION_REGEX = /^(@([\p{Letter}\p{Number}_]+))(.*)/u;
const LINK_REGEX = urlRegex({ strict: false });

// https://discuss.dev.twitch.tv/t/28414/2
const getCodePointsCount = (string: string) => {
  let count = 0;
  for (const char of string) count += 1;
  return count;
};

export type EmoteOffsets = Record<string, [string, string]>;

/**
 * Example `emotes` tag: `25:0-4,12-16/1902:6-10/354:18-22`
 * @returns `Record<start: string, emoteId: string>`
 */
const parseEmoteOffsets = (emotesTag: string) => {
  const result: Record<string, string> = {};
  if (!emotesTag) return result;
  const entries = emotesTag.split('/').map((emote) => emote.split(':'));
  for (const [id, positions] of entries) {
    for (const position of positions.split(',')) {
      const [start] = position.split('-');
      result[start] = id;
    }
  }
  return result;
};

const createMessageParts = (
  message: string,
  emotes: AllEmotes,
  emotesTag = '',
  isSelf = false,
): MessagePart[] => {
  const words = message.split(' ');

  const messageParts: MessagePart[] = [];
  let i = 0;
  let offset = 0;
  const emoteOffsets = parseEmoteOffsets(emotesTag);

  for (const word of words) {
    if (!word) continue;

    const isLast = words.length - 1 === i;

    // eslint-disable-next-line no-unreachable-loop
    while (true) {
      if (!isSelf) {
        const emoteId = emoteOffsets[offset];

        if (emoteId) {
          messageParts.push({
            type: MessagePartType.TWITCH_EMOTE,
            content: emoteId,
          });

          break;
        }
      }

      if (isSelf) {
        const twitchEmoteId = emotes.twitch?.names[word];

        if (twitchEmoteId) {
          messageParts.push({
            type: MessagePartType.TWITCH_EMOTE,
            content: twitchEmoteId,
          });

          break;
        }
      }

      const bttvEmoteId =
        emotes.bttvGlobal?.names[word] || emotes.bttvChannel?.names[word];

      if (bttvEmoteId) {
        messageParts.push({
          type: MessagePartType.BTTV_EMOTE,
          content: bttvEmoteId,
        });

        break;
      }

      const ffzEmoteId =
        emotes.ffzGlobal?.names[word] || emotes.ffzChannel?.names[word];

      if (ffzEmoteId) {
        messageParts.push({
          type: MessagePartType.FFZ_EMOTE,
          content: ffzEmoteId,
        });

        break;
      }

      const stvEmoteId =
        emotes.stvGlobal?.names[word] || emotes.stvChannel?.names[word];

      if (stvEmoteId) {
        messageParts.push({
          type: MessagePartType.STV_EMOTE,
          content: stvEmoteId,
        });

        break;
      }

      const emojiId = emotes.emoji?.names[word];

      if (emojiId) {
        messageParts.push({ type: MessagePartType.EMOJI, content: emojiId });

        break;
      }

      let m = word.match(MENTION_REGEX);

      if (m) {
        const [, displayText, target, tail] = m;

        messageParts.push({
          type: MessagePartType.MENTION,
          content: { displayText, recipient: target.toLowerCase() },
        });

        if (tail) {
          messageParts.push({
            type: MessagePartType.TEXT,
            content: tail,
          });
        }

        break;
      }

      m = word.match(LINK_REGEX);

      if (m && m[0].length === word.length) {
        const [link] = m;

        messageParts.push({
          type: MessagePartType.LINK,
          content: { displayText: link, url: link },
        });

        break;
      }

      const lastItem = messageParts[messageParts.length - 1];

      if (lastItem?.type === MessagePartType.TEXT) {
        lastItem.content += word;
      } else {
        messageParts.push({
          type: MessagePartType.TEXT,
          content: word,
        });
      }

      break;
    }

    if (!isLast) {
      const lastItem = messageParts[messageParts.length - 1];

      if (lastItem?.type === MessagePartType.TEXT) {
        lastItem.content += ' ';
      } else {
        messageParts.push({
          type: MessagePartType.TEXT,
          content: ' ',
        });
      }
    }

    i += 1;
    offset += getCodePointsCount(word) + 1;
  }

  return messageParts;
};

export default createMessageParts;
