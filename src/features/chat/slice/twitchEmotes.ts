import { PayloadAction } from '@reduxjs/toolkit';
import * as R from 'ramda';

import { TwitchEmote, TwitchEmotesResponse } from 'api/twitch';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';

export interface TwitchEmotesState extends FetchFlags {
  global: {
    [setId: string]: TwitchEmote[];
  };
  user: {
    [setId: string]: TwitchEmote[];
  };
}

export const twitchEmotesInitialState: TwitchEmotesState = {
  ...initialFetchFlags,
  global: {},
  user: {},
};

export const twitchEmotesReducers = {
  fetchTwitchEmotesRequest: (state: ChatState) => {
    setFetchFlags(state.twitchEmotes, 'request');
  },

  fetchTwitchEmotesSuccess: (
    state: ChatState,
    { payload }: PayloadAction<TwitchEmotesResponse>,
  ) => {
    state.twitchEmotes.global = R.pick(['0'], payload.emoticon_sets);
    state.twitchEmotes.user = R.omit(['0'], payload.emoticon_sets);

    setFetchFlags(state.twitchEmotes, 'success');
  },

  fetchTwitchEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ) => {
    setFetchFlags(state.twitchEmotes, 'failure', payload);
  },
};
