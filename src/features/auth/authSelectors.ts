import type { RootState } from 'app/rootReducer';

export const isAuthReadySelector = (state: RootState) =>
  state.auth.status !== 'idle' && state.auth.status !== 'loading';

export const isAuthSelector = (state: RootState) =>
  state.auth.status === 'success';

export const userLoginSelector = (state: RootState) => state.auth.userLogin;

export const userIdSelector = (state: RootState) => state.auth.userId;
