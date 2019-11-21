import * as R from 'ramda';

import { currentChannelSelector } from 'reducers/chat/selectors';

export const globalBadgesSelector = (state) => state.badges.global.items;
export const channelBadgesSelector = (state) =>
  R.pathOr(
    {},
    ['badges', 'channels', currentChannelSelector(state), 'items'],
    state,
  );

const isGlobalBadgesLoadedSelector = (state) =>
  state.badges.global.isLoaded || state.badges.global.isError;

const isChannelBadgesLoadedSelector = (state) => {
  const channel = currentChannelSelector(state);
  return (
    R.pathOr(false, ['badges', 'channels', channel, 'isLoaded'], state) ||
    R.pathOr(false, ['badges', 'channels', channel, 'isError'], state)
  );
};

export const isBadgesLoadedSelector = (state) =>
  isGlobalBadgesLoadedSelector(state) && isChannelBadgesLoadedSelector(state);
