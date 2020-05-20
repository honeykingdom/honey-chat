import type { RootState } from 'app/rootReducer';

export const isBlockedUsersLoadedSelector = (state: RootState) =>
  state.blockedUsers.status !== 'idle' &&
  state.blockedUsers.status !== 'loading';

export const blockedUsersSelector = (state: RootState) =>
  state.blockedUsers.items;
