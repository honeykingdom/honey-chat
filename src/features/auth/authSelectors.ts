import type { RootState } from 'app/store';

export const authStatusSelector = (state: RootState) => state.auth.status;
export const isAuthSelector = (state: RootState) =>
  state.auth.status === 'success';
export const accessTokenSelector = (state: RootState) => state.auth.accessToken;
export const meSelector = (state: RootState) => state.auth.user;
export const meIdSelector = (state: RootState) => state.auth.user?.id || null;
export const meLoginSelector = (state: RootState) =>
  state.auth.user?.login || null;
