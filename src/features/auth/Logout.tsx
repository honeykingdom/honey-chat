import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  LS_ACCESS_TOKEN,
  LS_ID_TOKEN,
  LS_USER,
  LS_LAST_CHANNEL,
} from 'utils/constants';
import { invalidateAuth } from 'features/auth/authSlice';

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  localStorage.removeItem(LS_ACCESS_TOKEN);
  localStorage.removeItem(LS_ID_TOKEN);
  localStorage.removeItem(LS_USER);

  dispatch(invalidateAuth());

  history.push({
    pathname: '/chat/',
    hash: localStorage.getItem(LS_LAST_CHANNEL) || '',
  });

  return null;
};

export default Logout;
