import { format } from 'date-fns/fp';
import type { MessageCardDetails } from 'features/messageCards';
import type { YoutubeVideoResponse } from './youtubeApiTypes';

export const parseYoutubeVideo = ({
  items,
}: YoutubeVideoResponse): MessageCardDetails | null => {
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

  return {
    id,
    src: x1,
    srcSet: `${x1} 1x, ${x2} 2x, ${x4} 4x`,
    title,
    description: `${date} · ${channelTitle}`,
  };
};
