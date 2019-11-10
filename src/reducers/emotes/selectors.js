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

export const emotesSelector = (state) => ({
  twitch: twitchEmotesSelector(state),
  bttv: bttvEmotesSelector(state),
  ffz: ffzEmotesSelector(state),
});

const createIsEmotesLoadedSelector = (type) => (state) => {
  const channel = currentChannelSelector(state);
  const globalLoaded =
    state.emotes[type].global.isLoaded || state.emotes[type].global.isError;
  const channelLoaded =
    path(['emotes', type, 'channels', channel, 'isLoaded'], state) ||
    path(['emotes', type, 'channels', channel, 'isError'], state);
  return globalLoaded && channelLoaded;
};

export const isBttvEmotesLoadedSelector = createIsEmotesLoadedSelector('bttv');

export const isFfzEmotesLoadedSelector = createIsEmotesLoadedSelector('ffz');

export const isTwitchEmotesLoadedSelector = (state) =>
  state.emotes.twitch.isLoaded || state.emotes.twitch.isError;

export const isEmotesLoadedSelector = (state) =>
  isTwitchEmotesLoadedSelector(state) &&
  isBttvEmotesLoadedSelector(state) &&
  isFfzEmotesLoadedSelector(state);
