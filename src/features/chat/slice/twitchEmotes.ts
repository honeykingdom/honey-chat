/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';

import * as api from 'api';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';
import {
  parseTwitchGlobalEmotes,
  parseTwitchChannelEmotes,
} from 'features/chat/utils/parseApiResponse';

export type TwitchEmotesState = {
  global: Record<string, api.TwitchEmote[]>;
  user: Record<string, api.TwitchEmote[]>;
} & FetchFlags;

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
    { payload }: PayloadAction<api.TwitchEmotesResponse>,
  ): void => {
    state.twitchEmotes.global = parseTwitchGlobalEmotes(payload);
    state.twitchEmotes.user = parseTwitchChannelEmotes(payload);

    setFetchFlags(state.twitchEmotes, 'success');
  },

  fetchTwitchEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ): void => {
    setFetchFlags(state.twitchEmotes, 'failure', payload);
  },
};
