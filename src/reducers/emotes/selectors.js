import { createSelector } from 'reselect';
import { pipe, path, pathOr, values, flatten } from 'ramda';

import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
} from 'utils/formatMessage';
import { currentChannelSelector } from '../chat';

export const twitchEmotesSelector = createSelector(
  pathOr([], ['emotes', 'twitch', 'items']),
  pipe(values, flatten),
);

const createGlobalEmotesSelector = (type) =>
  pathOr([], ['emotes', type, 'global', 'items']);
const createChannelEmotesSelector = (type) => (state) =>
  pathOr(
    [],
    ['emotes', type, 'channels', currentChannelSelector(state), 'items'],
    state,
);

const bttvGlobalEmotesSelector = createGlobalEmotesSelector('bttv');
const bttvChannelEmotesSelector = createChannelEmotesSelector('bttv');
export const bttvEmotesSelector = createSelector(
  bttvGlobalEmotesSelector,
  bttvChannelEmotesSelector,
  (bttvGlobal, bttvChannel) => [...bttvGlobal, ...bttvChannel],
);

const ffzGlobalEmotesSelector = createGlobalEmotesSelector('ffz');
const ffzChannelEmotesSelector = createChannelEmotesSelector('ffz');
export const ffzEmotesSelector = createSelector(
  ffzGlobalEmotesSelector,
  ffzChannelEmotesSelector,
  (ffzGlobal, ffzChannel) => [...ffzGlobal, ...ffzChannel],
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
