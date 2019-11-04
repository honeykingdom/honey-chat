import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import jwt from 'jsonwebtoken';

import { fetchUser } from '../reducers/auth';

const AuthCallback = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  if (!window.location.hash) return null;

  const params = new URLSearchParams(window.location.hash.slice(1));

  const accessToken = params.get('access_token');
  const idToken = params.get('id_token');

  if (!accessToken || !idToken) return null;

  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('idToken', idToken);

  const { sub: id } = jwt.decode(idToken);

  fetchUser(dispatch)(id);

  history.push('/chat/');

  return null;
};

export default AuthCallback;
