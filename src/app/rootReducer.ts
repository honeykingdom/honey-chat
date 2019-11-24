import { combineReducers } from '@reduxjs/toolkit';

import auth from 'features/auth/authSlice';
import chat from 'features/chat/slice/chatSlice';
import options from 'features/options/optionsSlice';

const rootReducer = combineReducers({
  auth,
  chat,
  options,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
