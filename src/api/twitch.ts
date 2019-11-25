import fetchRequest, { FetchRequestOptions } from 'utils/fetchRequest';

const TWITCH_API_HELIX = 'https://api.twitch.tv/helix';
const TWITCH_API_KRAKEN = 'https://api.twitch.tv/kraken';

const getHelixHeaders = () => ({
  Authorization: `Bearer ${localStorage.accessToken}`,
});

const getKrakenHeaders = () => ({
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': process.env.REACT_APP_TWITCH_API_CLIENT_ID,
  Authorization: `OAuth ${localStorage.accessToken}`,
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

export interface TwitchEmoteSets {
  [id: string]: TwitchEmote[];
}

export interface TwitchEmotesResponse {
  emoticon_sets: TwitchEmoteSets;
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
  versions: {
    [version: string]: TwitchBadgeVersion;
  };
}

export interface TwitchBadges {
  [name: string]: TwitchBadge;
}

export interface TwitchBadgesResponse {
  badge_sets: TwitchBadges;
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
  blocks: Array<{
    user: TwitchBlockedUser;
  }>;
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
