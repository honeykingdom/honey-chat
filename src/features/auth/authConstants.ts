import { CLIENT_ID } from 'utils/constants';

export const AUTH_BASE_URL = 'https://id.twitch.tv/oauth2/authorize';

export const AUTH_PARAMS = {
  client_id: CLIENT_ID,
  redirect_uri: process.env.NEXT_PUBLIC_TWITCH_REDIRECT_URI,
  response_type: 'token+id_token',
  scope: [
    'openid',
    'chat:edit',
    'chat:read',
    'channel:moderate',
    'user:read:blocked_users',
    'user:manage:blocked_users',
    'user:manage:chat_color',
    'moderator:read:chat_settings',
    'moderator:manage:chat_settings',
    'moderator:manage:announcements',
    'moderator:manage:chat_messages',
  ].join('+'),
  claims: JSON.stringify({
    id_token: { email_verified: null, picture: null, preferred_username: null },
  }),
  // TODO: state: uid(),
};
