import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
// import { setupListeners } from '@reduxjs/toolkit/query';
import chat from 'features/chat/chatSlice';
import { twitchApi } from 'features/api/twitch/twitchApiSlice';
import { youtubeApi } from 'features/api/youtube/youtubeApiSlice';

export const makeStore = () =>
  configureStore({
    reducer: {
      chat,
      [twitchApi.reducerPath]: twitchApi.reducer,
      [youtubeApi.reducerPath]: youtubeApi.reducer,
    },
    middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({ serializableCheck: false }),
      twitchApi.middleware,
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
