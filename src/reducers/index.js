import { combineReducers } from 'redux';

import auth from './auth';
import messages from './messages';

export default combineReducers({
  auth,
  messages,
});
