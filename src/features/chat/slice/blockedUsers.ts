/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { TwitchBlockedUsersResponse } from 'api/twitch';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';

export interface BlockedUsersState extends FetchFlags {
  items: string[];
}

export const blockedUsersInitialState = {
  ...initialFetchFlags,
  items: [],
};

const parseBlockedUsers = R.pipe(
  // @ts-ignore
  R.prop('blocks'),
  R.map(R.path(['user', 'name'])),
);

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
