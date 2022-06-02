import { Badges } from '../types';
import {
  ChatterinoBadge,
  ChatterinoBadgesResponse,
} from './chatterinoApiTypes';

// https://github.com/FrankerFaceZ/Add-Ons/blob/master/src/chatterino-badges/index.js
export const parseChatterinoBadges = ({
  badges,
}: ChatterinoBadgesResponse): Badges<ChatterinoBadge> => {
  const result: Badges<ChatterinoBadge> = { entries: {}, users: {} };

  let i = 0;

  for (const { users, ...badge } of badges) {
    result.entries[i] = badge;

    for (const userId of users) {
      if (!result.users[userId]) result.users[userId] = [];

      result.users[userId].push(i.toString());
    }

    i += 1;
  }

  return result;
};
