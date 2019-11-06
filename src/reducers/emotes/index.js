import { combineReducers } from 'redux';

import twitch from './twitch';
import bttv from './bttv';
import ffz from './ffz';

export default combineReducers({
  twitch,
  bttv,
  ffz,
});
