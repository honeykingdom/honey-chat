import { createSelector } from '@reduxjs/toolkit';

import { TwitchEmoteSets } from 'api/twitch';
import { BttvGlobalEmote, BttvChannelEmote } from 'api/bttv';
import { FfzEmote } from 'api/ffz';
import { RootState } from 'app/rootReducer';
import { createBadges } from 'features/chat/utils/htmlEntity';
import { ChatMessage } from 'features/chat/slice/messages';
import createEmoteCategories from 'features/chat/utils/createEmoteCategories';

export type StateEmotes = {
  twitchGlobal: TwitchEmoteSets;
  twitchUser: TwitchEmoteSets;
  bttvGlobal: BttvGlobalEmote[];
  bttvChannel: BttvChannelEmote[];
  ffzGlobal: FfzEmote[];
  ffzChannel: FfzEmote[];
} | null;

export const currentChannelSelector = (state: RootState) =>
  state.chat.currentChannel;

export const isConnectedSelector = (state: RootState) => state.chat.isConnected;

// messages

export const messagesSelector = (state: RootState): ChatMessage[] => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'messages', channel, 'items'];

  return R.pathOr([], path, state);
};

export const usersSelector = (state: RootState): string[] => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'messages', channel, 'users'];

  return R.pathOr([], path, state);
};

export const isHistoryLoadedSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'messages', channel, 'history', 'isLoaded'];

  return R.pathOr(false, path, state);
};

export const isHistoryAddedSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'messages', channel, 'history', 'isAdded'];

  return R.pathOr(false, path, state);
};

export const isEvenSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'messages', channel, 'isEven'];

  return R.pathOr(false, path, state);
};

// emotes isLoaded

export const isTwitchEmotesLoadedSelector = (state: RootState) =>
  state.chat.twitchEmotes.isLoaded;

export const isBttvGlobalEmotesLoadedSelector = (state: RootState) =>
  state.chat.bttvEmotes.global.isLoaded;

export const isBttvChannelEmotesLoadedSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'bttvEmotes', 'byChannels', channel, 'isLoaded'];

  return R.pathOr(false, path, state);
};

export const isBttvEmotesLoadedSelector = (state: RootState) =>
  isBttvGlobalEmotesLoadedSelector(state) &&
  isBttvChannelEmotesLoadedSelector(state);

export const isFfzGlobalEmotesLoadedSelector = (state: RootState) =>
  state.chat.ffzEmotes.global.isLoaded;

export const isFfzChannelEmotesLoadedSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'ffzEmotes', 'byChannels', channel, 'isLoaded'];

  return R.pathOr(false, path, state);
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

const twitchGlobalEmotesSelector = (state: RootState) =>
  state.chat.twitchEmotes.global;
const twitchUserEmotesSelector = (state: RootState) =>
  state.chat.twitchEmotes.user;

const createChannelEmotesSelector = <T>(type: 'bttvEmotes' | 'ffzEmotes') => (
  state: RootState,
): T[] => {
  const channel = currentChannelSelector(state);
  const path = ['chat', type, 'byChannels', channel, 'items'];

  return R.pathOr([], path, state);
};

const bttvGlobalEmotesSelector = (state: RootState) =>
  state.chat.bttvEmotes.global.items;
const bttvChannelEmotesSelector = createChannelEmotesSelector<BttvChannelEmote>(
  'bttvEmotes',
);

const ffzGlobalEmotesSelector = (state: RootState) =>
  state.chat.ffzEmotes.global.items;
const ffzChannelEmotesSelector = createChannelEmotesSelector<FfzEmote>(
  'ffzEmotes',
);

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

export const emoteCategoriesSelector = createSelector(
  emotesSelector,
  createEmoteCategories,
);

// Badges

export const userBadgesSelector = (
  state: RootState,
): {
  [name: string]: TwitchBadge;
} => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'params', 'byChannels', channel, 'user', 'badges'];

  return R.pathOr({}, path, state);
};

export const isGlobalBadgesLoadedSelector = (state: RootState) =>
  state.chat.badges.global.isLoaded;

export const isChannelBadgesLoadedSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'badges', 'byChannels', channel, 'isLoaded'];

  return R.pathOr(false, path, state);
};

export const isBadgesLoadedSelector = (state: RootState) =>
  isGlobalBadgesLoadedSelector(state) && isChannelBadgesLoadedSelector(state);

export const globalBadgesSelector = (state: RootState) =>
  state.chat.badges.global.items;

export const channelBadgesSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'badges', 'byChannels', channel, 'items'];

  return R.pathOr({}, path, state) as TwitchBadges;
};

export const userBadgesImagesSelector = createSelector(
  userBadgesSelector,
  globalBadgesSelector,
  channelBadgesSelector,
  (userBadges, globalBadges, channelBadges) =>
    createBadges(userBadges, globalBadges, channelBadges),
);

// params

export const currentChannelIdSelector = (state: RootState): string | null => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'params', 'byChannels', channel, 'room', 'roomId'];

  return R.pathOr(null, path, state);
};

export const userColorSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'params', 'byChannels', channel, 'user', 'color'];

  return R.pathOr('', path, state);
};

export const userDisplayNameSelector = (state: RootState) => {
  const channel = currentChannelSelector(state);
  const path = ['chat', 'params', 'byChannels', channel, 'user', 'displayName'];

  return R.pathOr('', path, state);
};

// blocked users

export const isBlockedUsersLoadedSelector = (state: RootState) =>
  state.chat.blockedUsers.isLoaded;

export const blockedUsersSelector = (state: RootState) =>
  state.chat.blockedUsers.items;
