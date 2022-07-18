import type {
  MessageEntity,
  MessageCardInfo,
} from 'features/messages/messagesSlice';

// https://regex101.com/r/jGbDV1/5
const TWITCH_CLIP_REGEX =
  /^(?:https?:\/\/)?(?:clips\.twitch\.tv\/|(?:www\.|m\.)?twitch\.tv\/(?:[\d\w]+)\/clip\/)([\d\w-]+)(?:\?.+)?$/;

// https://regex101.com/r/xsgeA4/4
const TWITCH_VIDEO_REGEX =
  /^(?:https?:\/\/)?(?:www\.|m\.)?twitch\.tv\/videos\/(\d+)(?:\?.+)?$/;

// https://regexr.com/3dj5t
const YOUTUBE_VIDEO_REGEX =
  /^((?:https?:)?\/\/)?((?:www|m)\.)?(?:youtube\.com|youtu.be)(\/(?:[\w-]+\?v=|embed\/|v\/)?)([\w-]+)(\S+)?$/;

const getMessageCard = (
  entities: MessageEntity[],
  [parseTwitch, parseYoutube]: [boolean, boolean] = [true, true],
): MessageCardInfo | null => {
  if (!parseTwitch && !parseYoutube) return null;

  // eslint-disable-next-line no-restricted-syntax
  for (const entity of entities) {
    if (typeof entity === 'object' && entity.type === 'link') {
      if (parseTwitch) {
        // twitch clip
        let m = TWITCH_CLIP_REGEX.exec(entity.text);

        if (m) {
          return {
            type: 'twitch-clip',
            id: m[1],
            url: entity.href,
          };
        }

        // twitch video
        m = TWITCH_VIDEO_REGEX.exec(entity.text);

        if (m) {
          return {
            type: 'twitch-video',
            id: m[1],
            url: entity.href,
          };
        }
      }

      if (parseYoutube) {
        // youtube video
        const m = YOUTUBE_VIDEO_REGEX.exec(entity.text);

        if (m) {
          return {
            type: 'youtube-video',
            id: m[4],
            url: entity.href,
          };
        }
      }
    }
  }

  return null;
};

export default getMessageCard;
