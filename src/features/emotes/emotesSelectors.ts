import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import {
  bttvChannelEmotesSelector,
  bttvGlobalEmotesSelector,
  ffzChannelEmotesSelector,
  ffzEmojisSelector,
  ffzGlobalEmotesSelector,
  stvChannelEmotesSelector,
  stvGlobalEmotesSelector,
  twitchEmotesSelector,
} from 'features/api';
import createEmoteCategories from 'features/emotes/utils/createEmoteCategories';
import { AllEmotes } from './emotesTypes';

export const emotesSelector = createSelector(
  twitchEmotesSelector,
  bttvGlobalEmotesSelector,
  bttvChannelEmotesSelector,
  ffzGlobalEmotesSelector,
  ffzChannelEmotesSelector,
  stvGlobalEmotesSelector,
  stvChannelEmotesSelector,
  ffzEmojisSelector,
  (
    { data: twitch },
    { data: bttvGlobal },
    { data: bttvChannel },
    { data: ffzGlobal },
    { data: ffzChannel },
    { data: stvGlobal },
    { data: stvChannel },
    { data: emoji },
  ): AllEmotes => ({
    twitch: twitch?.data,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
    stvGlobal,
    stvChannel,
    emoji,
  }),
);

/** @deprecated */
export const emoteCategoriesSelector = (state: RootState, search: string) => {
  const emotes = emotesSelector(state);

  return createEmoteCategories(emotes, search);
};
