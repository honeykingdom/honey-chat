import { createSelector } from 'reselect';
import { pipe, pathOr, values, flatten } from 'ramda';

import { currentChannelSelector } from '../chat';

export const twitchEmotesSelector = createSelector(
  pathOr([], ['emotes', 'twitch', 'items']),
  pipe(
    values,
    flatten,
  ),
);

const bttvChannelEmotesSelector = createSelector(
  pathOr({}, ['emotes', 'bttv', 'channels']),
  currentChannelSelector,
  (channels, currentChannel) => pathOr([], [currentChannel, 'items'], channels),
);
export const bttvEmotesSelector = createSelector(
  pathOr([], ['emotes', 'bttv', 'global', 'items']),
  bttvChannelEmotesSelector,
  (globalBttvEmotes, channelBttvEmotes) => [
    ...globalBttvEmotes,
    ...channelBttvEmotes,
  ],
);

const ffzChannelEmotesSelector = createSelector(
  pathOr({}, ['emotes', 'ffz', 'channels']),
  currentChannelSelector,
  (channels, currentChannel) => pathOr([], [currentChannel, 'items'], channels),
);
export const ffzEmotesSelector = createSelector(
  pathOr([], ['emotes', 'ffz', 'global', 'items']),
  ffzChannelEmotesSelector,
  (globalFfzEmotes, channelFfzEmotes) => [
    ...globalFfzEmotes,
    ...channelFfzEmotes,
  ],
);

const isBttvChannelEmotesLoadedSelector = (state) =>
  pathOr(false, [
    'emotes',
    'bttv',
    'channels',
    currentChannelSelector(state),
    'isLoaded',
  ])(state);

const isFfzChannelEmotesLoadedSelector = (state) =>
  pathOr(false, [
    'emotes',
    'ffz',
    'channels',
    currentChannelSelector(state),
    'isLoaded',
  ])(state);

export const isAllEmotesLoadedSelector = createSelector(
  pathOr(false, ['emotes', 'twitch', 'isLoaded']),
  pathOr(false, ['emotes', 'bttv', 'global', 'isLoaded']),
  isBttvChannelEmotesLoadedSelector,
  pathOr(false, ['emotes', 'ffz', 'global', 'isLoaded']),
  isFfzChannelEmotesLoadedSelector,
  (twitch, bttvGlobal, bttvChannel, ffzGlobal, ffzChannel) =>
    twitch && bttvGlobal && bttvChannel && ffzGlobal && ffzChannel,
);
