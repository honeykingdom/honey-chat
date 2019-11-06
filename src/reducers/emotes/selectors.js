import { createSelector } from 'reselect';
import { pipe, pathOr, values, flatten } from 'ramda';

export const twitchEmotesSelector = createSelector(
  pathOr([], ['emotes', 'twitch', 'items']),
  pipe(
    values,
    flatten,
  ),
);

const bttvChannelEmotesSelector = createSelector(
  pathOr({}, ['emotes', 'bttv', 'channels']),
  pathOr('', ['chat', 'currentChannel']),
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
  pathOr('', ['chat', 'currentChannel']),
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
