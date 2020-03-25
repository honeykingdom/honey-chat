import * as R from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import * as api from 'api';
import type { RootState } from 'app/rootReducer';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import type { ChatMessage } from 'features/chat/slice/messages';
import createEmoteCategories from 'features/chat/utils/createEmoteCategories';

export type StateEmotes = {
  twitchGlobal: Record<string, api.TwitchEmote[]>;
  twitchUser: Record<string, api.TwitchEmote[]>;
  bttvGlobal: api.BttvGlobalEmote[];
  bttvChannel: api.BttvChannelEmote[];
  ffzGlobal: api.FfzEmote[];
  ffzChannel: api.FfzEmote[];
} | null;

export const currentChannelSelector = (state: RootState) =>
  state.chat.currentChannel;

export const isConnectedSelector = (state: RootState) => state.chat.isConnected;

// messages

export const messagesSelector = (state: RootState): ChatMessage[] =>
  state.chat.messages[currentChannelSelector(state)]?.items || [];

export const usersSelector = (state: RootState): string[] =>
  state.chat.messages[currentChannelSelector(state)]?.users || [];

export const isHistoryLoadedSelector = (state: RootState) => {
  const currentChannel = currentChannelSelector(state);

  return (
    state.chat.messages[currentChannel]?.history.status === 'success' ||
    state.chat.messages[currentChannel]?.history.status === 'error' ||
    false
  );
};

export const isHistoryAddedSelector = (state: RootState) =>
  state.chat.messages[currentChannelSelector(state)]?.history.isAdded || false;

export const isEvenSelector = (state: RootState) =>
  state.chat.messages[currentChannelSelector(state)]?.isEven || false;

// emotes isLoaded

export const isTwitchEmotesLoadedSelector = (state: RootState) =>
  state.chat.twitchEmotes.status === 'success' ||
  state.chat.twitchEmotes.status === 'error';

export const isBttvGlobalEmotesLoadedSelector = (state: RootState) =>
  state.chat.bttvEmotes.global.status === 'success' ||
  state.chat.bttvEmotes.global.status === 'error';

export const isBttvChannelEmotesLoadedSelector = (state: RootState) => {
  const currentChannel = currentChannelSelector(state);

  return (
    state.chat.bttvEmotes.byChannels[currentChannel]?.status === 'success' ||
    state.chat.bttvEmotes.byChannels[currentChannel]?.status === 'error' ||
    false
  );
};

export const isBttvEmotesLoadedSelector = (state: RootState) =>
  isBttvGlobalEmotesLoadedSelector(state) &&
  isBttvChannelEmotesLoadedSelector(state);

export const isFfzGlobalEmotesLoadedSelector = (state: RootState) =>
  state.chat.ffzEmotes.global.status === 'success' ||
  state.chat.ffzEmotes.global.status === 'error';

export const isFfzChannelEmotesLoadedSelector = (state: RootState) => {
  const currentChannel = currentChannelSelector(state);

  return (
    state.chat.ffzEmotes.byChannels[currentChannel]?.status === 'success' ||
    state.chat.ffzEmotes.byChannels[currentChannel]?.status === 'error' ||
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
const twitchEmotesSelector = (state: RootState) =>
  state.chat.twitchEmotes.items;
const twitchGlobalEmotesSelector = createSelector(
  twitchEmotesSelector,
  R.pick(['0']),
);
const twitchUserEmotesSelector = createSelector(
  twitchEmotesSelector,
  R.omit(['0']),
);

const bttvGlobalEmotesSelector = (state: RootState) =>
  state.chat.bttvEmotes.global.items;
const bttvChannelEmotesSelector = (state: RootState) =>
  state.chat.bttvEmotes.byChannels[currentChannelSelector(state)]?.items || [];

const ffzGlobalEmotesSelector = (state: RootState) =>
  state.chat.ffzEmotes.global.items;
const ffzChannelEmotesSelector = (state: RootState) =>
  state.chat.ffzEmotes.byChannels[currentChannelSelector(state)]?.items || [];

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

// Badges

export const userBadgesSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.user?.badges ||
  {};

export const isGlobalBadgesLoadedSelector = (state: RootState) =>
  state.chat.badges.global.status === 'success' ||
  state.chat.badges.global.status === 'error';

export const isChannelBadgesLoadedSelector = (state: RootState) =>
  state.chat.badges.byChannels[currentChannelSelector(state)]?.status ===
    'success' ||
  state.chat.badges.byChannels[currentChannelSelector(state)]?.status ===
    'error';

export const isBadgesLoadedSelector = (state: RootState) =>
  isGlobalBadgesLoadedSelector(state) && isChannelBadgesLoadedSelector(state);

export const globalBadgesSelector = (state: RootState) =>
  state.chat.badges.global.items;

export const channelBadgesSelector = (state: RootState) =>
  state.chat.badges.byChannels[currentChannelSelector(state)]?.items || {};

export const userBadgesImagesSelector = createSelector(
  userBadgesSelector,
  globalBadgesSelector,
  channelBadgesSelector,
  htmlEntity.createBadges,
);

// params

export const currentChannelIdSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.room?.roomId ||
  '';

export const userColorSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.user?.color ||
  '';

export const userDisplayNameSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.user
    ?.displayName || '';

// blocked users

export const isBlockedUsersLoadedSelector = (state: RootState) =>
  state.chat.blockedUsers.status !== 'idle' &&
  state.chat.blockedUsers.status !== 'loading';

export const blockedUsersSelector = (state: RootState) =>
  state.chat.blockedUsers.items;
