import * as R from 'ramda';

export const currentChannelSelector = R.pathOr('', ['chat', 'currentChannel']);

export const channelIdSelector = (state) =>
  R.pathOr(
    null,
    ['chat', 'channels', currentChannelSelector(state), 'roomState', 'roomId'],
    state,
  );

export const isEvenSelector = (state) =>
  R.pathOr(false, ['messages', currentChannelSelector(state), 'isEven'], state);

export const isBlockedUsersLoadedSelector = (state) =>
  state.chat.blockedUsers.isLoaded || state.chat.blockedUsers.isError;

export const blockedUsersSelector = (state) => state.chat.blockedUsers.items;
