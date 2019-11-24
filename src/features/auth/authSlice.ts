/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { fetchUser as apiFetchUser, TwitchUsersResponse } from 'api/twitch';
import { AppThunk } from 'app/store';
import { RootState } from 'app/rootReducer';
import { writeUserToLocatStorage } from 'features/auth/authUtils';

interface AuthState {
  isAuthReady: boolean;
  isAuth: boolean;
  userId: string | null;
  userLogin: string | null;
}

interface InitializeAuth {
  isAuth: boolean;
  userId?: string;
  userLogin?: string;
}

export const initialState: AuthState = {
  isAuthReady: false,
  isAuth: false,
  userId: null,
  userLogin: null,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (
      state,
      { payload }: PayloadAction<InitializeAuth>,
    ): void => {
      state.isAuthReady = true;
      state.isAuth = payload.isAuth;

      if (payload.userId) {
        state.userId = payload.userId;
      }

      if (payload.userLogin) {
        state.userLogin = payload.userLogin;
      }
    },

    invalidateAuth: (): AuthState => initialState,

    fetchUserRequest: (state): void => {
      state.isAuthReady = false;
      state.isAuth = false;
    },

    fetchUserSuccess: (
      state,
      { payload }: PayloadAction<TwitchUsersResponse>,
    ): void => {
      state.isAuthReady = true;
      state.isAuth = true;

      state.userId = payload.data[0].id;
      state.userLogin = payload.data[0].login;
    },

    fetchUserFailure: (state, { payload }: PayloadAction<string>): void => {
      state.isAuthReady = true;
      state.isAuth = false;
    },
  },
});

export const {
  initializeAuth,
  invalidateAuth,
  fetchUserRequest,
  fetchUserSuccess,
  fetchUserFailure,
} = auth.actions;

export default auth.reducer;

export const fetchUser = (userId: string): AppThunk => async (
  dispatch,
): Promise<void> => {
  try {
    dispatch(fetchUserRequest());
    const users = await apiFetchUser(userId);
    const { id, login } = users.data[0];
    writeUserToLocatStorage({ id, login });
    dispatch(fetchUserSuccess(users));
  } catch (e) {
    dispatch(fetchUserFailure(e));
  }
};

export const isAuthReadySelector = (state: RootState): boolean =>
  state.auth.isAuthReady;

export const isAuthSelector = (state: RootState): boolean => state.auth.isAuth;

export const userLoginSelector = (state: RootState): string | null =>
  state.auth.userLogin;

export const userIdSelector = (state: RootState): string | null =>
  state.auth.userId;
