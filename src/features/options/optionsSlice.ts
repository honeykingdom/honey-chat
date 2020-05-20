/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'app/store';
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
    changeOption: (state, { payload }: PayloadAction<ChangeOption>): void => {
      const { name, value } = payload;
      (state[name] as unknown) = value;
    },
  },
});

export const { changeOption } = options.actions;

export default options.reducer;

export const changeChatOption = ({
  name,
  value,
}: ChangeOption): AppThunk => async (dispatch): Promise<void> => {
  writeOptionsToLocalStore({ [name]: value });
  dispatch(changeOption({ name, value }));
};