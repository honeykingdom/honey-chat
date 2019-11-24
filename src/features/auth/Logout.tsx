import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { invalidateAuth } from 'features/auth/authSlice';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  localStorage.removeItem('accessToken');
  localStorage.removeItem('idToken');
  localStorage.removeItem('user');

  dispatch(invalidateAuth());

  history.push({
    pathname: '/chat/',
    hash: localStorage.lastChannel || '',
  });

  return null;
};

export default Logout;
