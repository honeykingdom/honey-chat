import { format } from 'date-fns/fp';
import { Emotes } from '../types';
import {
  MessageCard,
  TwitchBadge,
  TwitchBadgesResponse,
  TwitchBlockedUsersResponse,
  TwitchClipResponse,
  TwitchEmote,
  TwitchEmotesResponse,
  TwitchVideoResponse,
} from './twitchApiTypes';

export const parseBadges = (
  response: TwitchBadgesResponse,
): Record<string, TwitchBadge> => response.badge_sets;

export const parseBlockedUsers = (
  response: TwitchBlockedUsersResponse,
): string[] => response.data.map((user) => user.user_login);

export const parseTwitchEmotes = (
  responses: TwitchEmotesResponse[],
): Emotes<TwitchEmote> => {
  const result: Emotes<TwitchEmote> = { entries: {}, nameToId: {} };

  for (const response of responses) {
    for (const emote of response.data) {
      result.entries[emote.id] = emote;
      result.nameToId[emote.name] = emote.id;
    }
  }

  return result;
};

export const parseTwitchClip = ({
  data,
}: TwitchClipResponse): MessageCard | null => {
  if (data.length === 0) return null;

  const {
    id,
    thumbnail_url: thumbnailUrl,
    title,
    creator_name: creatorName,
  } = data[0];

  const x1 = thumbnailUrl.replace('480x272', '86x45');
  const x2 = thumbnailUrl.replace('480x272', '260x147');

  return {
    id,
    src: x1,
    srcSet: `${x1} 1x, ${x2} 2x`,
    title,
    description: `Clipped by ${creatorName}`,
  };
};

export const parseTwitchVideo = ({
  data,
}: TwitchVideoResponse): MessageCard | null => {
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
