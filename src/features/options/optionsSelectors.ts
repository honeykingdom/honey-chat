import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import { meLoginSelector } from 'features/chat';
import createOptionsCategories from './utils/createOptionsCategories';

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
  meLoginSelector,
  highlightKeywordsSelector,
  (meLogin, highlightKeywords): RegExp | undefined => {
    const keywords: string[] = [];
    if (meLogin) keywords.push(meLogin);
    if (highlightKeywords) {
      for (const keyword of highlightKeywords.split(',')) {
        const normalizedKeyword = keyword.trim();
        if (normalizedKeyword) keywords.push(normalizedKeyword);
      }
    }
    if (keywords.length === 0) return;
    return new RegExp(`(${keywords.join('|')})`, 'i');
  },
);

export const optionsCategoriesSelector = createSelector(
  optionsSelector,
  createOptionsCategories,
);
