import { createSelector } from 'reselect';
import * as R from 'ramda';

import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
} from 'utils/formatMessage';
import { currentChannelSelector } from 'reducers/chat/selectors';

const createIsEmotesLoadedSelector = (type) => (state) => {
  const channel = currentChannelSelector(state);
  const globalLoaded =
    state.emotes[type].global.isLoaded || state.emotes[type].global.isError;
  const channelLoaded =
    R.path(['emotes', type, 'channels', channel, 'isLoaded'], state) ||
    R.path(['emotes', type, 'channels', channel, 'isError'], state);
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

const twitchEmotesSelector = R.pathOr([], ['emotes', 'twitch', 'items']);
const twitchGlobalEmotesSelector = createSelector(
  twitchEmotesSelector,
  R.pick(['0']),
);
const twitchUserEmotesSelector = createSelector(
  twitchEmotesSelector,
  R.omit(['0']),
);

const createGlobalEmotesSelector = (type) =>
  R.pathOr([], ['emotes', type, 'global', 'items']);

const createChannelEmotesSelector = (type) => (state) =>
  R.pathOr(
    [],
    ['emotes', type, 'channels', currentChannelSelector(state), 'items'],
    state,
  );

const bttvGlobalEmotesSelector = createGlobalEmotesSelector('bttv');
const bttvChannelEmotesSelector = createChannelEmotesSelector('bttv');

const ffzGlobalEmotesSelector = createGlobalEmotesSelector('ffz');
const ffzChannelEmotesSelector = createChannelEmotesSelector('ffz');

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
    };
  },
);

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
  emotesSelector,
  (emotes) => {
    if (!emotes) return [];

    const {
      twitchGlobal,
      twitchUser,
      bttvGlobal,
      bttvChannel,
      ffzGlobal,
      ffzChannel,
    } = emotes;

    return [
      {
        title: 'BetterTTV Channel Emotes',
        items: bttvChannel.map(createBttvEmote),
      },
      {
        title: 'FrankerFaceZ Channel Emotes',
        items: ffzChannel.map(createFfzEmote),
      },
      ...R.pipe(
        R.values,
        R.map((items) => ({ items: R.map(createTwitchEmote, items) })),
      )(twitchUser),
      {
        title: 'Twitch',
        items: R.map(createGlobalTwitchEmote, R.propOr([], '0', twitchGlobal)),
      },
      {
        title: 'BetterTTV',
        items: bttvGlobal.map(createBttvEmote),
      },
      {
        title: 'FrankerFaceZ',
        items: ffzGlobal.map(createFfzEmote),
      },
    ].filter(({ items }) => items.length > 0);
  },
);
