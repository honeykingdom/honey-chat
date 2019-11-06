import { combineReducers } from 'redux';

import auth from './auth';
import chat from './chat';
import emotes from './emotes/index';
import messages from './messages';

export default combineReducers({
  auth,
  chat,
  emotes,
  messages,
});
