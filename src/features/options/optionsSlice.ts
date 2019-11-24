/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AppThunk } from 'app/store';
import {
  writeOptionsToLocalStore,
  readOptionsFromLocalStorage,
} from 'features/options/optionsUtils';

interface OptionsState {
  showTimestamps: boolean;
  splitChat: boolean;
  blacklistKeywords: string;
  highlightKeywords: string;
  fixedWidth: boolean;
}

interface ChangeOption {
  name: keyof OptionsState;
  value: any;
}

const initialState: OptionsState = {
  showTimestamps: false,
  splitChat: true,
  blacklistKeywords: '',
  highlightKeywords: '',
  fixedWidth: false,
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

// export const {} = options.actions;

export default options.reducer;

const { changeOption } = options.actions;

export const changeChatOption = ({
  name,
  value,
}: ChangeOption): AppThunk => async (dispatch): Promise<void> => {
  writeOptionsToLocalStore({ [name]: value });
  dispatch(changeOption({ name, value }));
};
