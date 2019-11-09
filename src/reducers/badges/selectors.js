import { pathOr } from 'ramda';

import { currentChannelSelector } from '../chat';

export const globalBadgesSelector = (state) => state.badges.global.items;
export const channelBadgesSelector = (state) =>
  pathOr({}, ['badges', 'channels', currentChannelSelector(state), 'items']);

const isGlobalBadgesLoadedSelector = (state) =>
  state.badges.global.isLoaded || state.badges.global.isError;

const isChannelBadgesLoadedSelector = (state) => {
  const channel = currentChannelSelector(state);
  return (
    pathOr(false, ['badges', 'channels', channel, 'isLoaded'], state) ||
    pathOr(false, ['badges', 'channels', channel, 'isError'], state)
  );
};

export const isBadgesLoadedSelector = (state) =>
  isGlobalBadgesLoadedSelector(state) && isChannelBadgesLoadedSelector(state);