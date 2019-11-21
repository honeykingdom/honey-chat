import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { setAuth } from 'reducers/auth';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  localStorage.removeItem('user');

  dispatch(setAuth({ isAuthReady: false, isAuth: false }));

  history.push({
    pathname: '/chat/',
    hash: localStorage.lastChannel || '',
  });

  return null;
};

export default Logout;
