import {
  TWITCH_API_AUTH_BASE,
  TWITCH_API_CLIENT_ID,
  TWITCH_API_REDIRECT_URI,
} from './constants';

const authParams = {
  client_id: TWITCH_API_CLIENT_ID,
  redirect_uri: TWITCH_API_REDIRECT_URI,
  response_type: 'token+id_token',
  scope: [
    'openid',
    'chat:edit',
    'chat:read',
    'user_blocks_read',
    'user_blocks_edit',
  ].join('+'),
  claims: JSON.stringify({
    id_token: { email_verified: null, picture: null, preferred_username: null },
  }),
  // state: uid(),
};

// const getAuthUrl = () => {
//   const search = new URLSearchParams();
//   Object.entries(authParams).forEach(([key, value]) => search.set(key, value));

//   return `${TWITCH_API_AUTH_BASE}?${search.toString()}`;
// };

const getAuthUrl = () => {
  const search = Object.entries(authParams)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${TWITCH_API_AUTH_BASE}?${search}`;
};

export default getAuthUrl;
