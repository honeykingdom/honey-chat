import * as R from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import * as api from 'api';
import type { RootState } from 'app/rootReducer';
import { currentChannelSelector } from 'features/chat/chatSelectors';
import createEmoteCategories from 'features/emotes/utils/createEmoteCategories';

export type StateEmotes = {
  twitchGlobal: Record<string, api.TwitchEmote[]>;
  twitchUser: Record<string, api.TwitchEmote[]>;
  bttvGlobal: api.BttvGlobalEmote[];
  bttvChannel: api.BttvChannelEmote[];
  ffzGlobal: api.FfzEmote[];
  ffzChannel: api.FfzEmote[];
} | null;

// emotes isLoaded
export const isTwitchEmotesLoadedSelector = (state: RootState) =>
  state.emotes.twitch.status === 'success' ||
  state.emotes.twitch.status === 'error';

export const isBttvGlobalEmotesLoadedSelector = (state: RootState) =>
  state.emotes.bttv.global.status === 'success' ||
  state.emotes.bttv.global.status === 'error';

export const isBttvChannelEmotesLoadedSelector = (state: RootState) => {
  const currentChannel = currentChannelSelector(state);

  return (
    state.emotes.bttv.byChannels[currentChannel]?.status === 'success' ||
    state.emotes.bttv.byChannels[currentChannel]?.status === 'error' ||
    false
  );
};

export const isBttvEmotesLoadedSelector = (state: RootState) =>
  isBttvGlobalEmotesLoadedSelector(state) &&
  isBttvChannelEmotesLoadedSelector(state);

export const isFfzGlobalEmotesLoadedSelector = (state: RootState) =>
  state.emotes.ffz.global.status === 'success' ||
  state.emotes.ffz.global.status === 'error';

export const isFfzChannelEmotesLoadedSelector = (state: RootState) => {
  const currentChannel = currentChannelSelector(state);

  return (
    state.emotes.ffz.byChannels[currentChannel]?.status === 'success' ||
    state.emotes.ffz.byChannels[currentChannel]?.status === 'error' ||
    false
  );
};

export const isFfzEmotesLoadedSelector = (state: RootState) =>
  isFfzGlobalEmotesLoadedSelector(state) &&
  isFfzChannelEmotesLoadedSelector(state);

export const isEmotesLoadedSelector = (state: RootState) =>
  isTwitchEmotesLoadedSelector(state) &&
  isBttvGlobalEmotesLoadedSelector(state) &&
  isBttvChannelEmotesLoadedSelector(state) &&
  isFfzGlobalEmotesLoadedSelector(state) &&
  isFfzChannelEmotesLoadedSelector(state);

// emotes
const twitchEmotesSelector = (state: RootState) => state.emotes.twitch.items;
const twitchGlobalEmotesSelector = createSelector(
  twitchEmotesSelector,
  R.pick(['0']),
);
const twitchUserEmotesSelector = createSelector(
  twitchEmotesSelector,
  R.omit(['0']),
);

const bttvGlobalEmotesSelector = (state: RootState) =>
  state.emotes.bttv.global.items;
const bttvChannelEmotesSelector = (state: RootState) =>
  state.emotes.bttv.byChannels[currentChannelSelector(state)]?.items || [];

const ffzGlobalEmotesSelector = (state: RootState) =>
  state.emotes.ffz.global.items;
const ffzChannelEmotesSelector = (state: RootState) =>
  state.emotes.ffz.byChannels[currentChannelSelector(state)]?.items || [];

export const emotesSelector = createSelector(
  isEmotesLoadedSelector,
  twitchGlobalEmotesSelector,
  twitchUserEmotesSelector,
  bttvGlobalEmotesSelector,
  bttvChannelEmotesSelector,
  ffzGlobalEmotesSelector,
  ffzChannelEmotesSelector,
  (
    isEmotesLoaded,
    twitchGlobal,
    twitchUser,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
  ) => {
    if (!isEmotesLoaded) return null;

    return {
      twitchGlobal,
      twitchUser,
      bttvGlobal,
      bttvChannel,
      ffzGlobal,
      ffzChannel,
    } as StateEmotes;
  },
);

export const emoteCategoriesSelector = (state: RootState, search: string) => {
  const emotes = emotesSelector(state);

  return createEmoteCategories(emotes, search);
};
