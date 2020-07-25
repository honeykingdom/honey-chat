export const TWITCH_API_AUTH_BASE = 'https://id.twitch.tv/oauth2/authorize';

export const TWITCH_API_CLIENT_ID = process.env.REACT_APP_TWITCH_API_CLIENT_ID;
export const TWITCH_API_REDIRECT_URI =
  process.env.REACT_APP_TWITCH_API_REDIRECT_URI;

export const CHANNEL_MESSAGES_LIMIT = 500;
export const STORE_USERS_LIMIT = 500;
export const RECENT_USER_MESSAGES_LIMIT = 100;

export const API_REQUESTS_TIMEOUT = 10000;

export const TWITCH_EMOTES_CDN = '//static-cdn.jtvnw.net/emoticons/v1';
export const BTTV_EMOTES_CDN = '//cdn.betterttv.net/emote';

// local storage keys
export const LS_ACCESS_TOKEN = 'accessToken';
export const LS_ID_TOKEN = 'idToken';
export const LS_LAST_CHANNEL = 'lastChannel';
export const LS_USER = 'user';
export const LS_EMOTES_USAGE_STATISTIC = 'emotesUsageStatistic';
export const LS_OPTIONS = 'options';

export const SUGGESTION_TYPES = {
  users: {
    name: 'users',
    limit: 5,
    regex: /^@([\w\d_]*)$/,
  },
  emotes: {
    name: 'emotes',
    limit: 10,
    regex: /^:([\w\d_]{2,})$/,
  },
};

export const NOTICE_MESSAGE_TAGS = [
  'msg_banned',
  'msg_bad_characters',
  'msg_channel_blocked',
  'msg_channel_suspended',
  'msg_duplicate',
  'msg_emoteonly',
  'msg_facebook',
  'msg_followersonly',
  'msg_followersonly_followed',
  'msg_followersonly_zero',
  'msg_r9k',
  'msg_ratelimit',
  'msg_rejected',
  'msg_rejected_mandatory',
  'msg_room_not_found',
  'msg_slowmode',
  'msg_subsonly',
  'msg_suspended',
  'msg_timedout',
  'msg_verified_email',
];
