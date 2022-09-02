import { type MessagePart, MessagePartType } from 'features/messages';
import type { MessageCard } from '../messageCardsTypes';
import {
  MessageCardType,
  TWITCH_CLIP_REGEX,
  TWITCH_VIDEO_REGEX,
  YOUTUBE_VIDEO_REGEX,
} from '../messageCardsConstants';

const createMessageCard = (
  parts: MessagePart[],
  twitch = true,
  youtube = true,
): MessageCard | null => {
  if (!twitch && !youtube) return null;

  for (const part of parts) {
    if (part.type !== MessagePartType.LINK) continue;

    if (twitch) {
      let m = TWITCH_CLIP_REGEX.exec(part.content.displayText);

      if (m) {
        return {
          type: MessageCardType.TWITCH_CLIP,
          id: m[1],
          url: part.content.url,
        };
      }

      m = TWITCH_VIDEO_REGEX.exec(part.content.displayText);

      if (m) {
        return {
          type: MessageCardType.TWITCH_VIDEO,
          id: m[1],
          url: part.content.url,
        };
      }
    }

    if (youtube) {
      const m = YOUTUBE_VIDEO_REGEX.exec(part.content.displayText);

      if (m) {
        return {
          type: MessageCardType.YOUTUBE_VIDEO,
          id: m[4],
          url: part.content.url,
        };
      }
    }
  }

  return null;
};

export default createMessageCard;
