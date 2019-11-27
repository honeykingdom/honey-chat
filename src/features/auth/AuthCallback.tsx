import { useHistory } from 'react-router-dom';

import { LS_ACCESS_TOKEN, LS_ID_TOKEN, LS_LAST_CHANNEL } from 'utils/constants';

const AuthCallback = () => {
  const history = useHistory();

  if (!window.location.hash) return null;

  const params = new URLSearchParams(window.location.hash.slice(1));

  const accessToken = params.get('access_token');
  const idToken = params.get('id_token');

  if (!accessToken || !idToken) return null;

  localStorage.setItem(LS_ACCESS_TOKEN, accessToken);
  localStorage.setItem(LS_ID_TOKEN, idToken);

  history.push({
    pathname: '/chat/',
    hash: localStorage.getItem(LS_LAST_CHANNEL) || '',
  });

  return null;
};

export default AuthCallback;
