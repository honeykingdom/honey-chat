import type { RootState } from 'app/rootReducer';

export const currentChannelSelector = (state: RootState) =>
  state.chat.currentChannel;

export const isConnectedSelector = (state: RootState) => state.chat.isConnected;

export const currentChannelIdSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.room?.roomId ||
  '';

export const userColorSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.user?.color ||
  '';

export const userDisplayNameSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.user
    ?.displayName || '';

export const userBadgesSelector = (state: RootState) =>
  state.chat.params.byChannels[currentChannelSelector(state)]?.user?.badges ||
  {};
