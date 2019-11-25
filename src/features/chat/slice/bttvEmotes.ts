/* eslint-disable no-param-reassign */
import { PayloadAction } from '@reduxjs/toolkit';

import {
  BttvGlobalEmote,
  BttvChannelEmote,
  BttvGlobalEmotesResponse,
  BttvChannelEmotesResponse,
} from 'api/bttv';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';
import {
  parseBttvGlobalEmotes,
  parseBttvChannelEmotes,
} from 'features/chat/utils/parseApiResponse';

export interface BttvEmotesState {
  global: {
    items: BttvGlobalEmote[];
  } & FetchFlags;
  byChannels: {
    [channel: string]: {
      items: BttvChannelEmote[];
    } & FetchFlags;
  };
}

export const bttvEmotesInitialState: BttvEmotesState = {
  global: {
    ...initialFetchFlags,
    items: [],
  },
  byChannels: {},
};

const bttvChannelEmotesInitialState = {
  ...initialFetchFlags,
  items: [],
};

export const bttvEmotesReducers = {
  fetchBttvGlobalEmotesRequest: (state: ChatState) => {
    setFetchFlags(state.bttvEmotes.global, 'request');
  },

  fetchBttvGlobalEmotesSuccess: (
    state: ChatState,
    { payload }: PayloadAction<BttvGlobalEmotesResponse>,
  ): void => {
    state.bttvEmotes.global.items = parseBttvGlobalEmotes(payload);

    setFetchFlags(state.bttvEmotes.global, 'success');
  },

  fetchBttvGlobalEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ): void => {
    setFetchFlags(state.bttvEmotes.global, 'failure', payload);
  },

  fetchBttvChannelEmotesRequest: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string }>,
  ): void => {
    const { channel } = payload;

    if (!state.bttvEmotes.byChannels[channel]) {
      state.bttvEmotes.byChannels[channel] = bttvChannelEmotesInitialState;
    }

    setFetchFlags(state.bttvEmotes.byChannels[channel], 'request');
  },

  fetchBttvChannelEmotesSuccess: (
    state: ChatState,
    {
      payload,
    }: PayloadAction<{ channel: string; data: BttvChannelEmotesResponse }>,
  ): void => {
    const { channel, data } = payload;

    state.bttvEmotes.byChannels[channel].items = parseBttvChannelEmotes(data);

    setFetchFlags(state.bttvEmotes.byChannels[channel], 'success');
  },

  fetchBttvChannelEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string; error: string }>,
  ): void => {
    const { channel, error } = payload;

    setFetchFlags(state.bttvEmotes.byChannels[channel], 'failure', error);
  },
};
