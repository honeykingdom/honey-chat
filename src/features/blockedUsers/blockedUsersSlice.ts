/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import * as api from 'api';
import type { FetchResult } from 'utils/types';
import { parseBlockedUsers } from 'features/chat/utils/parseApiResponse';

type BlockedUsersState = FetchResult<string[]>;

const initialState: BlockedUsersState = {
  status: 'idle',
  error: {},
  items: [],
};

export const fetchBlockedUsers = createAsyncThunk(
  'chat/fetchBlockedUsers',
  api.fetchBlockedUsers,
);

const blockedUsers = createSlice({
  name: 'blockedUsers',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchBlockedUsers.pending, (state) => {
      state.status = 'loading';
      state.error = {};
    });

    builder.addCase(fetchBlockedUsers.fulfilled, (state, { payload }) => {
      state.status = 'success';
      state.items = parseBlockedUsers(payload);
    });

    builder.addCase(fetchBlockedUsers.rejected, (state, { error }) => {
      state.status = 'error';
      state.error = error;
    });
  },
});

export default blockedUsers.reducer;
