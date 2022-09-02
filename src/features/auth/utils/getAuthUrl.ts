import { AUTH_PARAMS, AUTH_BASE_URL } from '../authConstants';

const getAuthUrl = () => {
  const search = Object.entries(AUTH_PARAMS)
    .map(([key, value]) => `${key}=${value}`)
    .join('&');

  return `${AUTH_BASE_URL}?${search}`;
};

export default getAuthUrl;
