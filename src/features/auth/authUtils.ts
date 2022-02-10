import {
  TWITCH_API_AUTH_BASE,
  TWITCH_API_CLIENT_ID,
  TWITCH_API_REDIRECT_URI,
  LS_USER,
} from 'utils/constants';

type StoredUser = {
  id: string;
  login: string;
};

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
    'user:read:blocked_users',
    'user:manage:blocked_users',
    'user:read:subscriptions',
  ].join('+'),
  claims: JSON.stringify({
    id_token: { email_verified: null, picture: null, preferred_username: null },
  }),
  // TODO:
  // state: uid(),
};

export const getAuthUrl = () => {
  const search = Object.entries(authParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${TWITCH_API_AUTH_BASE}?${search}`;
};

export const isAuthRedirect = (hash: string) =>
  hash.startsWith('#access_token=');

export const writeUserToLocatStorage = (user: StoredUser) => {
  localStorage.setItem(LS_USER, JSON.stringify(user));
};

export const readUserFromLocatStorage = (): StoredUser | null => {
  let user;

  try {
    user = JSON.parse(localStorage.getItem(LS_USER) as string);
  } catch (e) {
    user = null;
  }

  if (!user || !user.id || !user.login) return null;

  return user as StoredUser;
};
