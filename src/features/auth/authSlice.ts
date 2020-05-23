/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import * as api from 'api';
import type { FetchStatus } from 'utils/types';
import { writeUserToLocatStorage } from 'features/auth/authUtils';

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
    const user = { id, login };

    writeUserToLocatStorage(user);

    return user;
  },
);

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (state, { payload }: PayloadAction<InitializeAuth>) => {
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
      state.userId = payload.id;
      state.userLogin = payload.login;
    });

    builder.addCase(fetchUser.rejected, (state) => {
      state.status = 'error';
    });
  },
});

export const { initializeAuth, invalidateAuth } = auth.actions;

export default auth.reducer;
