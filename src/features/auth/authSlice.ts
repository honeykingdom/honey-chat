import { createSlice, isAnyOf } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { twitchApi } from 'features/api/twitch/twitchApiSlice';

type AuthState = {
  status: 'idle' | 'pending' | 'success' | 'error';
  accessToken: string | null;
  user: {
    id: string;
    login: string;
  } | null;
};

const initialAuth = {
  accessToken: null,
  user: null,
};

export const initialState: AuthState = {
  status: 'idle',
  ...initialAuth,
};

const errorState: AuthState = { status: 'error', ...initialAuth };

type InitializeAuthPayload = Pick<AuthState, 'status'> &
  Partial<Omit<AuthState, 'status'>>;

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    initializeAuth: (
      state,
      { payload }: PayloadAction<InitializeAuthPayload>,
    ) => {
      state.status = 'success';

      if (payload.accessToken) state.accessToken = payload.accessToken;
      if (payload.user) state.user = payload.user;
    },

    invalidateAuth: (): AuthState => errorState,
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      isAnyOf(
        twitchApi.endpoints.user.matchRejected,
        twitchApi.endpoints.blockedUsers.matchRejected,
        twitchApi.endpoints.twitchEmotes.matchRejected,
        twitchApi.endpoints.twitchClip.matchRejected,
        twitchApi.endpoints.twitchVideo.matchRejected,
      ),
      (state, { payload }) => {
        // Invalid OAuth token
        if (payload?.status === 401) return errorState;
      },
    );
  },
});

export const { initializeAuth, invalidateAuth } = auth.actions;

export default auth.reducer;
