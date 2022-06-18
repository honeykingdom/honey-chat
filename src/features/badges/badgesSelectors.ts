import { createSelector } from '@reduxjs/toolkit';
import {
  bttvGlobalBadgesSelector,
  chatterinoBadgesSelector,
  ffsApBadgesSelector,
  ffzGlobalBadgesSelector,
  stvCosmeticsSelector,
  twitchChannelBadgesSelector,
  twitchGlobalBadgesSelector,
} from 'features/api';
import { AllBadges } from './badgesTypes';

export const badgesSelector = createSelector(
  twitchGlobalBadgesSelector,
  twitchChannelBadgesSelector,
  bttvGlobalBadgesSelector,
  ffzGlobalBadgesSelector,
  ffsApBadgesSelector,
  stvCosmeticsSelector,
  chatterinoBadgesSelector,
  (
    { data: twitchGlobal },
    { data: twitchChannel },
    { data: bttv },
    { data: ffz },
    { data: ffzAp },
    { data: stv },
    { data: chatterino },
  ): AllBadges => ({
    twitchGlobal,
    twitchChannel,
    bttv,
    ffz,
    ffzAp,
    stv: stv?.badges,
    chatterino,
  }),
);
