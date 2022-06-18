import { Badges } from 'twitch-js';
import { MessageBadgeType } from './badgesConstants';
import { AllBadges, MessageBadge } from './badgesTypes';

export const createMessageBadges = (
  badges: Partial<Badges>,
  allBadges: AllBadges,
  userId: string,
): MessageBadge[] => {
  const badgesList: MessageBadge[] = [];

  for (const [id, versionRaw] of Object.entries(badges)) {
    const version = versionRaw === true ? 1 : versionRaw;

    badgesList.push([MessageBadgeType.TWITCH, id, version]);
  }

  let ids = allBadges.bttv?.users[userId];

  if (ids) for (const id of ids) badgesList.push([MessageBadgeType.BTTV, id]);

  ids = allBadges.ffz?.users[userId];

  if (ids) for (const id of ids) badgesList.push([MessageBadgeType.FFZ, id]);

  ids = allBadges.ffzAp?.users[userId];

  if (ids) for (const id of ids) badgesList.push([MessageBadgeType.FFZ_AP, id]);

  ids = allBadges.stv?.users[userId];

  if (ids) for (const id of ids) badgesList.push([MessageBadgeType.STV, id]);

  ids = allBadges.chatterino?.users[userId];

  if (ids) {
    for (const id of ids) badgesList.push([MessageBadgeType.CHATTERINO, id]);
  }

  return badgesList;
};
