import { createSelector } from 'reselect';
import { pipe, path, pathOr, values, flatten } from 'ramda';

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

const isBttvGlobalEmotesLoadedSelector = (state) =>
  state.emotes.bttv.global.isLoaded || state.emotes.bttv.global.isError;
const isBttvChannelEmotesLoadedSelector = (state) => {
  const channel = currentChannelSelector(state);
  return (
    path(['emotes', 'bttv', 'channels', channel, 'isLoaded'], state) ||
    path(['emotes', 'bttv', 'channels', channel, 'isError'], state)
  );
};

const isFfzGlobalEmotesLoadedSelector = (state) =>
  state.emotes.ffz.global.isLoaded || state.emotes.ffz.global.isError;
const isFfzChannelEmotesLoadedSelector = (state) => {
  const channel = currentChannelSelector(state);
  return (
    path(['emotes', 'ffz', 'channels', channel, 'isLoaded'], state) ||
    path(['emotes', 'ffz', 'channels', channel, 'isError'], state)
  );
};

const isTwitchEmotesLoadedSelector = (state) =>
  state.emotes.twitch.isLoaded || state.emotes.twitch.isError;

export const isEmotesLoadedSelector = (state) =>
  isTwitchEmotesLoadedSelector(state) &&
  isBttvGlobalEmotesLoadedSelector(state) &&
  isBttvChannelEmotesLoadedSelector(state) &&
  isFfzGlobalEmotesLoadedSelector(state) &&
  isFfzChannelEmotesLoadedSelector(state);
