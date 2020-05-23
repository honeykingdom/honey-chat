import * as R from 'ramda';
import { format } from 'date-fns/fp';

import * as api from 'api';

export const parseTwitchEmotes = R.prop('emoticon_sets');

export const parseBttvGlobalEmotes = (
  data: api.BttvGlobalEmotesResponse,
): api.BttvGlobalEmote[] => data;

export const parseBttvChannelEmotes = (
  data: api.BttvChannelEmotesResponse,
): api.BttvChannelEmote[] => [...data.channelEmotes, ...data.sharedEmotes];

export const parseFfzGlobalEmotes = ({
  default_sets: defaultSets,
  sets,
}: api.FfzGlobalEmotesResponse): api.FfzEmote[] =>
  R.pipe<any, any, any, any, api.FfzEmote[]>(
    R.pick((defaultSets as unknown) as string[]),
    R.values,
    R.map(R.propOr([], 'emoticons')),
    R.flatten,
  )(sets);

export const parseFfzChannelEmotes: (
  data: api.FfzChannelEmotesResponse,
) => api.FfzEmote[] = R.pipe(
  R.pathOr({}, ['sets']),
  R.values,
  R.map(R.pathOr([], ['emoticons'])),
  R.flatten,
);

export const parseBlockedUsers = R.pipe<
  api.TwitchBlockedUsersResponse,
  {}[],
  string[]
>(R.prop('blocks'), R.map<any, any>(R.path(['user', 'name'])));

export const parseBadges = R.prop('badge_sets');

export const parseTwitchClip = ({ data }: api.TwitchClipResponse) => {
  if (data.length === 0) return null;

  const {
    id,
    url,
    thumbnail_url: thumbnailUrl,
    title,
    creator_name: creatorName,
  } = data[0];

  const x1 = thumbnailUrl.replace('480x272', '86x45');
  const x2 = thumbnailUrl.replace('480x272', '260x147');

  return {
    id,
    url,
    src: x1,
    srcSet: `${x1} 1x, ${x2} 2x`,
    title,
    description: `Clipped by ${creatorName}`,
  };
};

export const parseTwitchVideo = ({ data }: api.TwitchVideoResponse) => {
  if (data.length === 0) return null;

  const {
    id,
    thumbnail_url: thumbnailUrl,
    title,
    user_name: userName,
    published_at: publishedAt,
  } = data[0];

  const date = format('PP', new Date(publishedAt));

  const thumbnailReplace = '%{width}x%{height}';

  const x1 = thumbnailUrl.replace(thumbnailReplace, '80x45');
  const x2 = thumbnailUrl.replace(thumbnailReplace, '160x90');
  const x4 = thumbnailUrl.replace(thumbnailReplace, '320x180');

  return {
    id,
    src: x1,
    srcSet: `${x1} 1x, ${x2} 2x, ${x4} 4x`,
    title,
    description: `${date} · ${userName}`,
  };
};

export const parseYoutubeVideo = ({ items }: api.YoutubeVideoResponse) => {
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
