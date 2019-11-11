import { pathOr } from 'ramda';

export const currentChannelSelector = pathOr('', ['chat', 'currentChannel']);

export const channelIdSelector = (state) =>
  pathOr(
    null,
    ['chat', 'channels', currentChannelSelector(state), 'roomState', 'roomId'],
    state,
  );

export const isEvenSelector = (state) =>
  pathOr(false, ['messages', currentChannelSelector(state), 'isEven'], state);

export const isBlockedUsersLoadedSelector = (state) =>
  state.chat.blockedUsers.isLoaded || state.chat.blockedUsers.isError;

export const blockedUsersSelector = (state) => state.chat.blockedUsers.items;
