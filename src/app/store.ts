import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import auth from 'features/auth/authSlice';
import chat from 'features/chat/chatSlice';
import options from 'features/options/optionsSlice';
import { twitchApi } from 'features/api/twitch/twitchApiSlice';
import { bttvApi } from 'features/api/bttv/bttvApiSlice';
import { ffzApi } from 'features/api/ffz/ffzApiSlice';
import { stvApi } from 'features/api/stv/stvApiSlice';
import { chatterinoApi } from 'features/api/chatterino/chatterinoApiSlice';
import { recentMessagesApi } from 'features/api/recentMessages/recentMessagesApiSlice';
import { youtubeApi } from 'features/api/youtube/youtubeApiSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      auth,
      chat,
      options,
      [twitchApi.reducerPath]: twitchApi.reducer,
      [bttvApi.reducerPath]: bttvApi.reducer,
      [ffzApi.reducerPath]: ffzApi.reducer,
      [stvApi.reducerPath]: stvApi.reducer,
      [chatterinoApi.reducerPath]: chatterinoApi.reducer,
      [recentMessagesApi.reducerPath]: recentMessagesApi.reducer,
      [youtubeApi.reducerPath]: youtubeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({ serializableCheck: false }),
      twitchApi.middleware,
      bttvApi.middleware,
      ffzApi.middleware,
      stvApi.middleware,
      chatterinoApi.middleware,
      recentMessagesApi.middleware,
      youtubeApi.middleware,
    ],
  });

const store = makeStore();

// https://redux-toolkit.js.org/rtk-query/usage/cache-behavior#re-fetching-on-window-focus-with-refetchonfocus
// enable listener behavior for the store
// setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
