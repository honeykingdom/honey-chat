import * as R from 'ramda';
import { createSelector } from '@reduxjs/toolkit';

import * as api from 'api';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import type { StateEmotes } from 'features/chat/selectors';
import getEmotesByText from 'features/chat/utils/getEmotesByText';
import { getEmotesFromUsageStatistic } from 'features/chat/utils/emotesUsageStatistic';

export type EmoteCategory = {
  title?: string;
  items: htmlEntity.Emote[];
};

const getTwitchUserEmoteCategories = R.pipe<
  Record<string, api.TwitchEmote[]>,
  api.TwitchEmote[][],
  EmoteCategory[]
>(
  R.values,
  R.map((items) => ({ items: R.map(htmlEntity.createTwitchEmote, items) })),
);

const createMainEmoteCategories = (emotes: StateEmotes) => {
  if (!emotes) return [];

  const {
    twitchGlobal,
    twitchUser,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
  } = emotes;

  return [
    {
      title: 'BetterTTV Channel Emotes',
      items: bttvChannel.map(htmlEntity.createBttvEmote),
    },
    {
      title: 'FrankerFaceZ Channel Emotes',
      items: ffzChannel.map(htmlEntity.createFfzEmote),
    },
    ...getTwitchUserEmoteCategories(twitchUser),
    {
      title: 'Twitch',
      items: R.map(
        htmlEntity.createTwitchEmote,
        R.propOr([], '0', twitchGlobal),
      ),
    },
    {
      title: 'BetterTTV',
      items: bttvGlobal.map(htmlEntity.createBttvEmote),
    },
    {
      title: 'FrankerFaceZ',
      items: ffzGlobal.map(htmlEntity.createFfzEmote),
    },
  ].filter(R.path(['items', 'length'])) as EmoteCategory[];
};

const getMainEmoteCategories = createSelector(
  (emotes: any) => emotes,
  createMainEmoteCategories,
);

const createEmoteCategories = (emotes: StateEmotes, text: string) => {
  if (!emotes) return [];

  if (text) {
    const items = getEmotesByText(text, emotes);
    const title = `${items.length ? '' : 'No '}Search Results for "${text}"`;

    return [{ title, items }];
  }

  const mainEmoteCategories = getMainEmoteCategories(emotes);
  const frequentlyUsed = getEmotesFromUsageStatistic(emotes);

  if (!frequentlyUsed.length) {
    return mainEmoteCategories;
  }

  const frequentlyUsedCategory = {
    title: 'Frequently Used',
    items: frequentlyUsed,
  };

  return [frequentlyUsedCategory, ...mainEmoteCategories] as EmoteCategory[];
};

export default createEmoteCategories;
