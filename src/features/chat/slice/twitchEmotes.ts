/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { TwitchEmoteSets, TwitchEmotesResponse } from 'api/twitch';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';

export interface TwitchEmotesState extends FetchFlags {
  global: TwitchEmoteSets;
  user: TwitchEmoteSets;
}

export const twitchEmotesInitialState: TwitchEmotesState = {
  ...initialFetchFlags,
  global: {},
  user: {},
};

export const twitchEmotesReducers = {
  fetchTwitchEmotesRequest: (state: ChatState): void => {
    setFetchFlags(state.twitchEmotes, 'request');
  },

  fetchTwitchEmotesSuccess: (
    state: ChatState,
    { payload }: PayloadAction<TwitchEmotesResponse>,
  ): void => {
    state.twitchEmotes.global = R.pick(['0'], payload.emoticon_sets);
    state.twitchEmotes.user = R.omit(['0'], payload.emoticon_sets);

    setFetchFlags(state.twitchEmotes, 'success');
  },

  fetchTwitchEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ): void => {
    setFetchFlags(state.twitchEmotes, 'failure', payload);
  },
};
