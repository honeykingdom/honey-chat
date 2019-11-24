import {
  TWITCH_API_AUTH_BASE,
  TWITCH_API_CLIENT_ID,
  TWITCH_API_REDIRECT_URI,
} from 'utils/constants';

type StoredUser = {
  id: string;
  login: string;
};

/* eslint-disable @typescript-eslint/camelcase */
const authParams = {
  client_id: TWITCH_API_CLIENT_ID,
  redirect_uri: TWITCH_API_REDIRECT_URI,
  response_type: 'token+id_token',
  scope: [
    'openid',
    'channel:moderate',
    'chat:edit',
    'chat:read',
    'whispers:read',
    'whispers:edit',
    'user_blocks_read',
    'user_blocks_edit',
    'user_subscriptions',
  ].join('+'),
  claims: JSON.stringify({
    id_token: { email_verified: null, picture: null, preferred_username: null },
  }),
  // TODO:
  // state: uid(),
};
/* eslint-enable @typescript-eslint/camelcase */

export const getAuthUrl = (): string => {
  const search = Object.entries(authParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${TWITCH_API_AUTH_BASE}?${search}`;
};

export const isAuthRedirect = (hash: string): boolean =>
  hash.startsWith('#access_token=');

export const writeUserToLocatStorage = (user: StoredUser): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const readUserFromLocatStorage = (): StoredUser | null => {
  let user;

  try {
    user = JSON.parse(localStorage.user);
  } catch (e) {
    user = null;
  }

  if (!user || !user.id || !user.login) return null;

  return user as StoredUser;
};
