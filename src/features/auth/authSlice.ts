import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'app/store';
import { fetchUser as apiFetchUser, TwitchUsersResponse } from 'api/twitch';
import { RootState } from 'app/rootReducer';

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
    initializeAuth: (state, { payload }: PayloadAction<InitializeAuth>) => {
      state.isAuthReady = true;
      state.isAuth = payload.isAuth;

      if (payload.userId) {
        state.userId = payload.userId;
      }

      if (payload.userLogin) {
        state.userLogin = payload.userLogin;
      }
    },

    invalidateAuth: () => initialState,

    fetchUserRequest: (state) => {
      state.isAuthReady = false;
      state.isAuth = false;
    },

    fetchUserSuccess: (
      state,
      { payload }: PayloadAction<TwitchUsersResponse>,
    ) => {
      state.isAuthReady = true;
      state.isAuth = true;

      state.userId = payload.data[0].id;
      state.userLogin = payload.data[0].login;
    },

    fetchUserFailure: (state, { payload }: PayloadAction<string>) => {
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

export const fetchUser = (userId: string): AppThunk => async (dispatch) => {
  try {
    dispatch(fetchUserRequest());
    const users = await apiFetchUser(userId);
    dispatch(fetchUserSuccess(users));
  } catch (e) {
    dispatch(fetchUserFailure(e));
  }
};

export const isAuthReadySelector = (state: RootState) => state.auth.isAuthReady;
export const isAuthSelector = (state: RootState) => state.auth.isAuth;
export const userLoginSelector = (state: RootState) => state.auth.userLogin;
export const userIdSelector = (state: RootState) => state.auth.userId;
