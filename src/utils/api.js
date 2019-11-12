import fetchRequest from 'utils/fetchRequest';
import { API_REQUESTS_TIMEOUT } from 'utils/constants';

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

const apiRequest = (url, options) =>
  fetchRequest(url, { ...options, timeout: API_REQUESTS_TIMEOUT });

const apiRequestHelix = (url, options) =>
  apiRequest(`${TWITCH_API_HELIX}${url}`, {
    ...options,
    headers: getHelixHeaders(),
  });

const apiRequestKraken = (url, options) =>
  apiRequest(`${TWITCH_API_KRAKEN}${url}`, {
    ...options,
    headers: getKrakenHeaders(),
  });

export const fetchUser = (id) => apiRequestHelix(`/users?id=${id}`);

export const fetchTwitchEmotesBySets = (userId) =>
  apiRequestKraken(`/users/${userId}/emotes`);

export const fetchBttvGlobalEmotes = () =>
  apiRequest('https://api.betterttv.net/3/cached/emotes/global');
export const fetchBttvChannelEmotes = (channelId) =>
  apiRequest(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`);

export const fetchFfzGlobalEmotes = () =>
  apiRequest('https://api.frankerfacez.com/v1/set/global');
export const fetchFfzChannelEmotes = (channelId) =>
  apiRequest(`https://api.frankerfacez.com/v1/room/id/${channelId}`);

export const fetchRecentMessages = (channel) =>
  apiRequest(
    `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}?clearchatToNotice=true`,
  );

export const fetchGlobalBadges = (language = 'en') =>
  apiRequest(
    `https://badges.twitch.tv/v1/badges/global/display?language=${language}`,
  );
export const fetchChannelBadges = (channelId, language = 'en') =>
  apiRequest(
    `https://badges.twitch.tv/v1/badges/channels/${channelId}/display?language=${language}`,
  );

export const fetchBlockedUsers = (userId) =>
  apiRequestKraken(`/users/${userId}/blocks`);
