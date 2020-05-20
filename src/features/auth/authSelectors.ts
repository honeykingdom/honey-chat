import type { RootState } from 'app/rootReducer';

export const isAuthReadySelector = (state: RootState): boolean =>
  state.auth.status !== 'idle' && state.auth.status !== 'loading';

export const isAuthSelector = (state: RootState): boolean =>
  state.auth.status === 'success';

export const userLoginSelector = (state: RootState): string | null =>
  state.auth.userLogin;

export const userIdSelector = (state: RootState): string | null =>
  state.auth.userId;
