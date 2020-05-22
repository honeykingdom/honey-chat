import { combineReducers } from '@reduxjs/toolkit';

import auth from 'features/auth/authSlice';
import chat from 'features/chat/chatSlice';
import messages from 'features/messages/messagesSlice';
import messageCards from 'features/messageCards/messageCardsSlice';
import emotes from 'features/emotes/emotesSlice';
import badges from 'features/badges/badgesSlice';
import blockedUsers from 'features/blockedUsers/blockedUsersSlice';
import options from 'features/options/optionsSlice';

const rootReducer = combineReducers({
  auth,
  chat,
  messages,
  messageCards,
  emotes,
  badges,
  blockedUsers,
  options,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
