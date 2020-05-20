/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  writeOptionsToLocalStore,
  readOptionsFromLocalStorage,
} from 'features/options/optionsUtils';

type OptionsState = {
  showTimestamps: boolean;
  splitChat: boolean;
  blacklistKeywords: string;
  highlightKeywords: string;
  fixedWidth: boolean;
  highlightNotifications: boolean;
};

type ChangeOption = {
  name: keyof OptionsState;
  value: any;
};

export const initialState: OptionsState = {
  showTimestamps: false,
  splitChat: true,
  blacklistKeywords: '',
  highlightKeywords: '',
  fixedWidth: false,
  highlightNotifications: true,
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
