import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { meLoginSelector } from 'features/chat';
import createOptionsCategories from './utils/createOptionsCategories';
import getHighlightRegex from './utils/getHighlightRegex';

export const optionsSelector = (state: RootState) => state.chat.options;
export const showCardsSelector = createSelector(optionsSelector, (options) => ({
  twitch: options.twitch.cards,
  youtube: options.youtube.cards,
}));
export const timestampFormatSelector = (state: RootState) =>
  state.chat.options.ui.timestampFormat;
export const splitChatSelector = (state: RootState) =>
  state.chat.options.ui.splitChat;
const highlightKeywordsSelector = (state: RootState) =>
  state.chat.options.notifications.highlightKeywords;
export const highlightRegExpSelector = createSelector(
  highlightKeywordsSelector,
  meLoginSelector,
  getHighlightRegex,
);

export const optionsCategoriesSelector = createSelector(
  optionsSelector,
  createOptionsCategories,
);
