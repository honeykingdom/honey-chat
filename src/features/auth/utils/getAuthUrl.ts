import {
  TWITCH_API_AUTH_BASE,
  TWITCH_API_CLIENT_ID,
  TWITCH_API_REDIRECT_URI,
} from 'utils/constants';

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
  // state: uid(),
};

const getAuthUrl = () => {
  const search = Object.entries(authParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${TWITCH_API_AUTH_BASE}?${search}`;
};

export default getAuthUrl;
