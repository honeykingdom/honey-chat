import { getAuthUrl } from 'features/auth/authUtils';

const Auth = () => {
  window.location.href = getAuthUrl();

  return null;
};

export default Auth;
