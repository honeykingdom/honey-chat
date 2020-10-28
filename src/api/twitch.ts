import { LS_ACCESS_TOKEN } from 'utils/constants';
import fetchRequest from 'utils/fetchRequest';
import type { FetchRequestOptions } from 'utils/fetchRequest';

const TWITCH_API_HELIX = 'https://api.twitch.tv/helix';
const TWITCH_API_KRAKEN = 'https://api.twitch.tv/kraken';

const getHelixHeaders = () => ({
  'Client-ID': process.env.REACT_APP_TWITCH_API_CLIENT_ID,
  Authorization: `Bearer ${localStorage.getItem(LS_ACCESS_TOKEN)}`,
});

const getKrakenHeaders = () => ({
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': process.env.REACT_APP_TWITCH_API_CLIENT_ID,
  Authorization: `OAuth ${localStorage.getItem(LS_ACCESS_TOKEN)}`,
});

const apiRequestHelix = (url: string, options?: FetchRequestOptions) =>
  fetchRequest(`${TWITCH_API_HELIX}${url}`, {
    ...options,
    headers: getHelixHeaders(),
  } as FetchRequestOptions);

const apiRequestKraken = (url: string, options?: FetchRequestOptions) =>
  fetchRequest(`${TWITCH_API_KRAKEN}${url}`, {
    ...options,
    headers: getKrakenHeaders(),
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
  id: number;
  code: string;
}

export interface TwitchEmotesResponse {
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
  _total: number;
  blocks: {
    user: TwitchBlockedUser;
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
  apiRequestHelix(`/users?id=${userId}`);

export const fetchTwitchEmotes = (
  userId: string,
): Promise<TwitchEmotesResponse> => apiRequestKraken(`/users/${userId}/emotes`);

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
  apiRequestKraken(`/users/${userId}/blocks`);

export const fetchTwitchClip = (id: string): Promise<TwitchClipResponse> =>
  apiRequestHelix(`/clips?id=${id}`);

export const fetchTwitchVideo = (id: string): Promise<TwitchVideoResponse> =>
  apiRequestHelix(`/videos?id=${id}`);
