export const TWITCH_API_HELIX = 'https://api.twitch.tv/helix';
export const TWITCH_API_KRAKEN = 'https://api.twitch.tv/kraken';

// TODO: throw an error if fetch completed with not 2** code

const helixHeaders = {
  Authorization: `Bearer ${localStorage.accessToken}`,
};

const krakenHeaders = {
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': process.env.REACT_APP_TWITCH_API_CLIENT_ID,
  Authorization: `OAuth ${localStorage.accessToken}`,
};

const apiRequestHelix = (url) =>
  fetch(`${TWITCH_API_HELIX}${url}`, {
    headers: helixHeaders,
  }).then((response) => response.json());

const apiRequestKraken = (url) =>
  fetch(`${TWITCH_API_KRAKEN}${url}`, {
    headers: krakenHeaders,
  }).then((response) => response.json());

const apiRequest = (url) => fetch(url).then((response) => response.json());

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

// apiRequest(`https://api.betterttv.net/3/cached/frankerfacez/users/twitch/${channelId}`);

export const fetchRecentMessages = (channel) =>
  apiRequest(
    `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}?clearchatToNotice=true`,
  );
