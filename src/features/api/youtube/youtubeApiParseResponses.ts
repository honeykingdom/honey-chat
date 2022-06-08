import { format } from 'date-fns/fp';
import { MessageCard } from 'features/messageCards';
import { YoutubeVideoResponse } from './youtubeApiTypes';

// eslint-disable-next-line import/prefer-default-export
export const parseYoutubeVideo = ({
  items,
}: YoutubeVideoResponse): MessageCard | null => {
  if (items.length === 0) return null;

  const {
    id,
    snippet: {
      title,
      publishedAt,
      channelTitle,
      thumbnails: {
        default: { url: x1 },
        medium: { url: x2 },
        high: { url: x4 },
      },
    },
  } = items[0];

  const date = format('PP', new Date(publishedAt));

  // TODO:
  return {
    id,
    src: x1,
    srcSet: `${x1} 1x, ${x2} 2x, ${x4} 4x`,
    title,
    description: `${date} · ${channelTitle}`,
  } as any;
};
