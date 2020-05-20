import { createSelector } from '@reduxjs/toolkit';

import type { RootState } from 'app/rootReducer';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import {
  currentChannelSelector,
  userBadgesSelector,
} from 'features/chat/chatSelectors';

export const isGlobalBadgesLoadedSelector = (state: RootState) =>
  state.badges.global.status === 'success' ||
  state.badges.global.status === 'error';

export const isChannelBadgesLoadedSelector = (state: RootState) =>
  state.badges.byChannels[currentChannelSelector(state)]?.status ===
    'success' ||
  state.badges.byChannels[currentChannelSelector(state)]?.status === 'error';

export const isBadgesLoadedSelector = (state: RootState) =>
  isGlobalBadgesLoadedSelector(state) && isChannelBadgesLoadedSelector(state);

export const globalBadgesSelector = (state: RootState) =>
  state.badges.global.items;

export const channelBadgesSelector = (state: RootState) =>
  state.badges.byChannels[currentChannelSelector(state)]?.items || {};

export const userBadgesImagesSelector = createSelector(
  userBadgesSelector,
  globalBadgesSelector,
  channelBadgesSelector,
  htmlEntity.createBadges,
);
