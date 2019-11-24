import { PayloadAction } from '@reduxjs/toolkit';

import {
  BttvGlobalEmote,
  BttvChannelEmote,
  BttvChannelEmotesResponse,
} from 'api/bttv';
import { FetchFlags, initialFetchFlags } from 'utils/constants';
import setFetchFlags from 'utils/setFetchFlags';
import { ChatState } from 'features/chat/slice';

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
    { payload }: PayloadAction<BttvGlobalEmote[]>,
  ) => {
    state.bttvEmotes.global.items = payload;

    setFetchFlags(state.bttvEmotes.global, 'success');
  },

  fetchBttvGlobalEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<string>,
  ) => {
    setFetchFlags(state.bttvEmotes.global, 'failure', payload);
  },

  fetchBttvChannelEmotesRequest: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string }>,
  ) => {
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
  ) => {
    const { channel, data } = payload;

    state.bttvEmotes.byChannels[channel].items = [
      ...data.channelEmotes,
      ...data.sharedEmotes,
    ];

    setFetchFlags(state.bttvEmotes.byChannels[channel], 'success');
  },

  fetchBttvChannelEmotesFailure: (
    state: ChatState,
    { payload }: PayloadAction<{ channel: string; error: string }>,
  ) => {
    const { channel, error } = payload;

    setFetchFlags(state.bttvEmotes.byChannels[channel], 'failure', error);
  },
};
