/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import * as api from 'api';
import type { FetchResult } from 'utils/types';
import type { ChatState } from 'features/chat/slice';
import { parseBlockedUsers } from 'features/chat/utils/parseApiResponse';

export type BlockedUsersState = FetchResult<string[]>;

export const blockedUsersInitialState: BlockedUsersState = {
  status: 'idle',
  error: {},
  items: [],
};

export const fetchBlockedUsers = createAsyncThunk(
  'chat/fetchBlockedUsers',
  (userId: string) => api.fetchBlockedUsers(userId),
);

export const blockedUsersExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder.addCase(fetchBlockedUsers.pending, (state) => {
    state.blockedUsers.status = 'loading';
    state.blockedUsers.error = {};
  });

  builder.addCase(fetchBlockedUsers.fulfilled, (state, { payload }): void => {
    state.blockedUsers.status = 'success';
    state.blockedUsers.items = parseBlockedUsers(payload);
  });

  builder.addCase(fetchBlockedUsers.rejected, (state, { error }): void => {
    state.blockedUsers.status = 'error';
    state.blockedUsers.error = error;
  });
};
