import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from 'app/store';
import type { AllEmotes } from './emotesTypes';
import createEmoteCategories from './utils/createEmoteCategories';

export const emotesSelector = createSelector(
  (state: RootState) => state.chat.emotes.twitch.data,
  (state: RootState) => state.chat.emotes.twitch.template,
  (state: RootState) => state.chat.emotes.bttv.data,
  (state: RootState) => state.chat.emotes.ffz.data,
  (state: RootState) => state.chat.emotes.stv.data,
  (state: RootState) => state.chat.emotes.emoji.data,
  (state: RootState) =>
    state.chat.channels.entities[state.chat.currentChannel!]?.emotes.bttv.data,
  (state: RootState) =>
    state.chat.channels.entities[state.chat.currentChannel!]?.emotes.ffz.data,
  (state: RootState) =>
    state.chat.channels.entities[state.chat.currentChannel!]?.emotes.stv.data,
  (
    twitch,
    twitchTemplate,
    bttvGlobal,
    ffzGlobal,
    stvGlobal,
    emoji,
    bttvChannel,
    ffzChannel,
    stvChannel,
  ): AllEmotes => ({
    twitch,
    twitchTemplate,
    bttvGlobal,
    ffzGlobal,
    stvGlobal,
    emoji,
    bttvChannel,
    ffzChannel,
    stvChannel,
  }),
);

export const emoteCategoriesSelector = createSelector(
  emotesSelector,
  createEmoteCategories,
);
