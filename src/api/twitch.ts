import { LS_ACCESS_TOKEN } from 'utils/constants';
import fetchRequest from 'utils/fetchRequest';
import type { FetchRequestOptions } from 'utils/fetchRequest';

const API_BASE = 'https://api.twitch.tv/helix';
const API_GQL_BASE = 'https://gql.twitch.tv/gql';

const getHeaders = () => ({
  'Client-ID': process.env.REACT_APP_TWITCH_API_CLIENT_ID,
  Authorization: `Bearer ${localStorage.getItem(LS_ACCESS_TOKEN)}`,
});

const apiRequest = (url: string, options?: FetchRequestOptions) =>
  fetchRequest(`${API_BASE}${url}`, {
    ...options,
    headers: getHeaders(),
  } as FetchRequestOptions);

const getGqlHeaders = () => ({
  'Client-ID': process.env.REACT_APP_TWITCH_API_CLIENT_ID,
  Authorization: `OAuth ${localStorage.getItem(LS_ACCESS_TOKEN)}`,
  'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  Accept: 'application/json, text/javascript, */*; q=0.01',
});

const apiGqlRequest = (query: string, variables?: Record<string, any>) =>
  fetchRequest(API_GQL_BASE, {
    method: 'POST',
    body: JSON.stringify({ query, variables }),
    headers: getGqlHeaders(),
  } as FetchRequestOptions);

export interface TwitchUser {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
}

export interface TwitchUsersResponse {
  data: TwitchUser[];
}

export interface TwitchEmote {
  id: string;
  token: string;
  type:
    | 'GLOBALS'
    | 'SMILIES'
    | 'LIMITED_TIME'
    | 'MEGA_COMMERCE'
    | 'TWO_FACTOR'
    | 'SUBSCRIPTIONS';
}

export interface TwitchEmotesResponse {
  data: {
    channel: {
      self: {
        availableEmoteSets: {
          emotes: TwitchEmote[];
          id: string;
          owner: {
            id: string;
            displayName: string;
            profileImageURL: string;
          } | null;
        }[];
      };
    };
  };
  extensions: {
    durationMilliseconds: number;
    requestID: string;
  };
  emoticon_sets: Record<string, TwitchEmote[]>;
}

export interface TwitchBadgeVersion {
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  description: string;
  title: string;
  click_action: string;
  click_url: string;
  last_updated: null;
}

export interface TwitchBadge {
  versions: Record<string, TwitchBadgeVersion>;
}

export interface TwitchBadgesResponse {
  badge_sets: Record<string, TwitchBadge>;
}

export interface TwitchBlockedUser {
  display_name: string;
  _id: string;
  name: string;
  type: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
  logo: string;
}

export interface TwitchBlockedUsersResponse {
  data: {
    user_id: string;
    user_login: string;
    display_name: string;
  }[];
}

interface TwitchClipData {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
}

export interface TwitchClipResponse {
  data: TwitchClipData[];
  pagination: Record<string, unknown>;
}

interface TwitchVideoData {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: 'public' | 'private';
  view_count: number;
  language: string;
  type: 'upload' | 'archive' | 'highlight';
  duration: string;
}

export interface TwitchVideoResponse {
  data: TwitchVideoData[];
  pagination: Record<string, unknown>;
}

export const fetchUser = (userId: string): Promise<TwitchUsersResponse> =>
  apiRequest(`/users?id=${userId}`);

const AVAILABLE_EMOTES_FOR_CHANNEL_QUERY = `
  query AvailableEmotesForChannel($channelID: ID!) {
    channel(id: $channelID) {
      self {
        availableEmoteSets {
          emotes {
            id,
            token,
            type
          },
          id,
          owner {
            id,
            displayName,
            profileImageURL(width: 300)
          }
        }
      }
    }
  }
`;

export const fetchTwitchEmotes = (
  userId: string,
): Promise<TwitchEmotesResponse[]> =>
  apiGqlRequest(AVAILABLE_EMOTES_FOR_CHANNEL_QUERY, { channelID: userId });

export const fetchGlobalBadges = (
  language = 'en',
): Promise<TwitchBadgesResponse> =>
  fetchRequest(
    `https://badges.twitch.tv/v1/badges/global/display?language=${language}`,
  );

export const fetchChannelBadges = (
  channelId: string,
  language = 'en',
): Promise<TwitchBadgesResponse> =>
  fetchRequest(
    `https://badges.twitch.tv/v1/badges/channels/${channelId}/display?language=${language}`,
  );

export const fetchBlockedUsers = (
  userId: string,
): Promise<TwitchBlockedUsersResponse> =>
  apiRequest(`/users/blocks?broadcaster_id=${userId}`);

export const fetchTwitchClip = (id: string): Promise<TwitchClipResponse> =>
  apiRequest(`/clips?id=${id}`);

export const fetchTwitchVideo = (id: string): Promise<TwitchVideoResponse> =>
  apiRequest(`/videos?id=${id}`);
