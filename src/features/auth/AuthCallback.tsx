import { useHistory } from 'react-router-dom';

const AuthCallback = () => {
  const history = useHistory();

  if (!window.location.hash) return null;

  const params = new URLSearchParams(window.location.hash.slice(1));

  const accessToken = params.get('access_token');
  const idToken = params.get('id_token');

  if (!accessToken || !idToken) return null;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('idToken', idToken);

  history.push({
    pathname: '/chat/',
    hash: localStorage.lastChannel || '',
  });

  return null;
};

export default AuthCallback;
