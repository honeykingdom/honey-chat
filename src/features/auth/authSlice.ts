/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'api';
import { RootState } from 'app/rootReducer';
import { writeUserToLocatStorage } from 'features/auth/authUtils';
import { FetchStatus } from 'utils/types';

type AuthState = {
  status: FetchStatus;
  userId: string | null;
  userLogin: string | null;
};

type InitializeAuth = {
  isAuth: boolean;
  userId?: string;
  userLogin?: string;
};

export const initialState: AuthState = {
  status: 'idle',
  userId: null,
  userLogin: null,
};

export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (userId: string) => {
    const users = await api.fetchUser(userId);
    const { id, login } = users.data[0];

    writeUserToLocatStorage({ id, login });

    return users;
  },
);

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (
      state,
      { payload }: PayloadAction<InitializeAuth>,
    ): void => {
      state.status = payload.isAuth ? 'success' : 'error';

      if (payload.userId) {
        state.userId = payload.userId;
      }

      if (payload.userLogin) {
        state.userLogin = payload.userLogin;
      }
    },

    invalidateAuth: (): AuthState => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = 'loading';
    });

    builder.addCase(fetchUser.fulfilled, (state, { payload }) => {
      state.status = 'success';

      state.userId = payload.data[0].id;
      state.userLogin = payload.data[0].login;
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { initializeAuth, invalidateAuth } = auth.actions;

export default auth.reducer;

export const isAuthReadySelector = (state: RootState): boolean =>
  state.auth.status !== 'idle' && state.auth.status !== 'loading';

export const isAuthSelector = (state: RootState): boolean =>
  state.auth.status === 'success';

export const userLoginSelector = (state: RootState): string | null =>
  state.auth.userLogin;

export const userIdSelector = (state: RootState): string | null =>
  state.auth.userId;
