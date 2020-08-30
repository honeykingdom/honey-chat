/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  writeOptionsToLocalStore,
  readOptionsFromLocalStorage,
} from 'features/options/optionsUtils';

type OptionsState = {
  showTimestamps: boolean;
  timeFormat24Hours: boolean;
  splitChat: boolean;
  blacklistKeywords: string;
  highlightKeywords: string;
  fixedWidth: boolean;
  highlightNotifications: boolean;
  showTwitchCards: boolean;
  showYoutubeCards: boolean;
};

type ChangeOption = {
  name: keyof OptionsState;
  value: any;
};

export const initialState: OptionsState = {
  showTimestamps: false,
  timeFormat24Hours: false,
  splitChat: true,
  blacklistKeywords: '',
  highlightKeywords: '',
  fixedWidth: false,
  highlightNotifications: true,
  showTwitchCards: true,
  showYoutubeCards: true,
  ...readOptionsFromLocalStorage(),
};

const options = createSlice({
  name: 'options',
  initialState,
  reducers: {
    changeOption: {
      reducer: (state, { payload }: PayloadAction<ChangeOption>) => {
        const { name, value } = payload;

        (state[name] as unknown) = value;
      },
      prepare: (payload: ChangeOption) => {
        const { name, value } = payload;

        writeOptionsToLocalStore({ [name]: value });

        return { payload };
      },
    },
  },
});

export const { changeOption } = options.actions;

export default options.reducer;
