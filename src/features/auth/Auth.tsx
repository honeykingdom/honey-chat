import getAuthUrl from 'features/auth/utils/getAuthUrl';

const Auth = () => {
  window.location.href = getAuthUrl();

  return null;
};

export default Auth;
