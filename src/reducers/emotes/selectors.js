import { createSelector } from 'reselect';
import { pipe, path, pathOr, propOr, values, flatten, omit, map } from 'ramda';

import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
} from 'utils/formatMessage';
import { currentChannelSelector } from 'reducers/chat/selectors';

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

// prettier-ignore
const regexEmotesMap = {
  '[oO](_|\\.)[oO]': 'O_o',
  '\\&gt\\;\\(':     '>(',
  '\\&lt\\;3':       '<3',
  '\\:-?(o|O)':      ':O',
  '\\:-?(p|P)':      ':P',
  '\\:-?[\\\\/]':    ':/',
  '\\:-?[z|Z|\\|]':  ':Z',
  '\\:-?\\(':        ':(',
  '\\:-?\\)':        ':)',
  '\\:-?D':          ':D',
  '\\;-?(p|P)':      ';P',
  '\\;-?\\)':        ';)',
  'R-?\\)':          'R)',
  'B-?\\)':          'B)',
};

const createGlobalTwitchEmote = ({ id, code }) =>
  createTwitchEmote({ id, code: regexEmotesMap[code] || code });

export const emoteCategoriesSelector = createSelector(
  (state) => state.emotes.twitch.items,
  bttvGlobalEmotesSelector,
  bttvChannelEmotesSelector,
  ffzGlobalEmotesSelector,
  ffzChannelEmotesSelector,
  (twitch, bttvGlobal, bttvChannel, ffzGlobal, ffzChannel) =>
    [
      {
        title: 'BetterTTV Channel Emotes',
        items: bttvChannel.map(createBttvEmote),
      },
      {
        title: 'FrankerFaceZ Channel Emotes',
        items: ffzChannel.map(createFfzEmote),
      },
      ...pipe(
        omit(['0']),
        values,
        map((items) => ({ items: map(createTwitchEmote, items) })),
      )(twitch),
      {
        title: 'Twitch',
        items: map(createGlobalTwitchEmote, propOr([], '0', twitch)),
      },
      {
        title: 'BetterTTV',
        items: bttvGlobal.map(createBttvEmote),
      },
      {
        title: 'FrankerFaceZ',
        items: ffzGlobal.map(createFfzEmote),
      },
    ].filter(({ items }) => items.length > 0),
);

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
