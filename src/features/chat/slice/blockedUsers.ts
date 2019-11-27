/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';

import { TwitchBlockedUsersResponse } from 'api/twitch';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';
import { parseBlockedUsers } from 'features/chat/utils/parseApiResponse';

export type BlockedUsersState = {
  items: string[];
} & FetchFlags;

export const blockedUsersInitialState = {
  ...initialFetchFlags,
  items: [],
};

export const blockedUsersReducers = {
  fetchBlockedUsersRequest: (state: ChatState): void => {
    setFetchFlags(state.blockedUsers, 'request');
  },

  fetchBlockedUsersSuccess: (
    state: ChatState,
    { payload }: PayloadAction<TwitchBlockedUsersResponse>,
  ): void => {
    state.blockedUsers.items = parseBlockedUsers(payload);

    setFetchFlags(state.blockedUsers, 'success');
  },

  fetchBlockedUsersFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ): void => {
    setFetchFlags(state.blockedUsers, 'failure', payload);
  },
};
