export const TWITCH_API_AUTH_BASE = 'https://id.twitch.tv/oauth2/authorize';

export const TWITCH_API_CLIENT_ID = process.env.REACT_APP_TWITCH_API_CLIENT_ID;
export const TWITCH_API_REDIRECT_URI =
  process.env.REACT_APP_TWITCH_API_REDIRECT_URI;

export const CHANNEL_MESSAGES_LIMIT = 500;

export const MESSAGE_TYPES = {
  MESSAGE: 'MESSAGE',
  NOTICE_MESSAGE: 'NOTICE_MESSAGE',
  USER_NOTICE_MESSAGE: 'USER_NOTICE_MESSAGE',
};

export const STORE_FLAGS = {
  DEFAULT: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    error: null,
  },
  REQUEST: {
    isLoading: true,
    isLoaded: false,
    isError: false,
    error: null,
  },
  SUCCESS: {
    isLoading: false,
    isLoaded: true,
    isError: false,
    error: null,
  },
  FAILURE: {
    isLoading: false,
    isLoaded: false,
    isError: true,
  },
};
