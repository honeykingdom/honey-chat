import * as R from 'ramda';

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
