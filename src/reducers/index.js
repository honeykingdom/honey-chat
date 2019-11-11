import { combineReducers } from 'redux';

import auth from './auth';
import badges from './badges';
import chat from './chat';
import emotes from './emotes/index';
import messages from './messages';
import options from './options';

export default combineReducers({
  auth,
  badges,
  chat,
  emotes,
  messages,
  options,
});
