/* eslint-disable no-param-reassign */
import { createAsyncThunk } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import * as api from 'api';
import type { ChatState } from 'features/chat/slice';
import { parseTwitchEmotes } from 'features/chat/utils/parseApiResponse';
import type { FetchResult } from 'utils/types';

export type TwitchEmotesState = FetchResult<Record<string, api.TwitchEmote[]>>;

export const twitchEmotesInitialState: TwitchEmotesState = {
  status: 'idle',
  error: {},
  items: {},
};

export const fetchTwitchEmotes = createAsyncThunk(
  'chat/fetchTwitchEmotes',
  (userId: string) => api.fetchTwitchEmotes(userId),
);

export const twitchEmotesExtraReducers = (
  builder: ActionReducerMapBuilder<ChatState>,
) => {
  builder.addCase(fetchTwitchEmotes.pending, (state) => {
    state.twitchEmotes.status = 'loading';
    state.twitchEmotes.error = {};
  });

  builder.addCase(fetchTwitchEmotes.fulfilled, (state, { payload }): void => {
    state.twitchEmotes.status = 'success';
    state.twitchEmotes.items = parseTwitchEmotes(payload);
  });

  builder.addCase(fetchTwitchEmotes.rejected, (state, { error }) => {
    state.twitchEmotes.status = 'error';
    state.twitchEmotes.error = error;
  });
};
