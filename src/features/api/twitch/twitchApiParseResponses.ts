import { format } from 'date-fns/fp';
import type { TwitchBadges } from 'features/badges/badgesTypes';
import type { MessageCardDetails } from 'features/messageCards/messageCardsTypes';
import type { Emotes } from '../types';
import type {
  TwitchBadgesResponse,
  TwitchUserBlockListsResponse,
  TwitchClipsResponse,
  TwitchEmote,
  TwitchEmoteSetsResponse,
  TwitchVideosResponse,
} from './twitchApiTypes';

export const parseTwitchBadges = (response: TwitchBadgesResponse) => {
  const result: TwitchBadges = {};
  for (const { set_id: setId, versions } of response.data) {
    result[setId] = {};
    for (const version of versions) {
      result[setId][version.id] = version;
    }
  }
  return result;
};

export const parseBlockedUsers = (
  response: TwitchUserBlockListsResponse,
): string[] => response.data.map((user) => user.user_login);

export const parseTwitchEmotes = (
  response: TwitchEmoteSetsResponse,
): Emotes<TwitchEmote> => {
  const result: Emotes<TwitchEmote> = { entries: {}, names: {} };

  for (const emote of response.data) {
    result.entries[emote.id] = emote;
    result.names[emote.name] = emote.id;
  }

  return result;
};

export const parseTwitchClip = ({
  data,
}: TwitchClipsResponse): MessageCardDetails | null => {
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
}: TwitchVideosResponse): MessageCardDetails | null => {
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
