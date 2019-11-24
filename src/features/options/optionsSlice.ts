import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OptionsState {
  showTimestamps: boolean;
  splitChat: boolean;
  blacklistKeywords: string;
  highlightKeywords: string;
  fixedWidth: boolean;
}

interface InitializeOptions {
  showTimestamps?: boolean;
  splitChat?: boolean;
  blacklistKeywords?: string;
  highlightKeywords?: string;
  fixedWidth?: boolean;
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
};

const options = createSlice({
  name: 'options',
  initialState,
  reducers: {
    initializeOptions: (state, action: PayloadAction<InitializeOptions>) => ({
      ...state,
      ...action.payload,
    }),

    changeOption: (state, action: PayloadAction<ChangeOption>) => {
      const { name, value } = action.payload;
      (state[name] as unknown) = value;
    },
  },
});

export const { initializeOptions, changeOption } = options.actions;

export default options.reducer;
