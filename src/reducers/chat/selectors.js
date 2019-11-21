import * as R from 'ramda';
import { createSelector } from 'reselect';

import {
  globalBadgesSelector,
  channelBadgesSelector,
} from 'reducers/badges/selectors';
import createBadges from 'utils/createBadges';

export const currentChannelSelector = R.pathOr('', ['chat', 'currentChannel']);

export const currentChannelIdSelector = (state) =>
  R.pathOr(
    null,
    ['chat', 'channels', currentChannelSelector(state), 'roomState', 'roomId'],
    state,
  );

export const isConnectedSelector = (state) => state.chat.isConnected;

export const isBlockedUsersLoadedSelector = (state) =>
  state.chat.blockedUsers.isLoaded || state.chat.blockedUsers.isError;

export const blockedUsersSelector = (state) => state.chat.blockedUsers.items;

export const userColorSelector = (state) =>
  R.pathOr(
    '',
    ['chat', 'channels', currentChannelSelector(state), 'userState', 'color'],
    state,
  );

export const userBadgesSelector = (state) =>
  R.pathOr(
    {},
    ['chat', 'channels', currentChannelSelector(state), 'userState', 'badges'],
    state,
  );

export const userBadgesImagesSelector = createSelector(
  userBadgesSelector,
  globalBadgesSelector,
  channelBadgesSelector,
  (userBadges, globalBadges, channelBadges) =>
    createBadges(userBadges, globalBadges, channelBadges),
);
