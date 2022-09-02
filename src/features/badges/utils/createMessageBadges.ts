import type { AllBadges, MessageBadge } from 'features/badges';
import { MessageBadgeType } from 'features/badges';

const createMessageBadges = (
  allBadges: AllBadges,
  twitchBadges: Record<string, string>,
  userId: string,
): MessageBadge[] => {
  const badges: MessageBadge[] = [];

  for (const [id, version] of Object.entries(twitchBadges)) {
    badges.push([MessageBadgeType.TWITCH, id, version]);
  }

  const bttvBadges = allBadges.bttv?.users[userId] || [];
  const ffzBadges = allBadges.ffz?.users[userId] || [];
  const ffzApBadges = allBadges.ffzAp?.users[userId] || [];
  const stvBadges = allBadges.stv?.users[userId] || [];
  const chBadges = allBadges.chatterino?.users[userId] || [];

  for (const id of bttvBadges) badges.push([MessageBadgeType.BTTV, id]);
  for (const id of ffzBadges) badges.push([MessageBadgeType.FFZ, id]);
  for (const id of ffzApBadges) badges.push([MessageBadgeType.FFZ_AP, id]);
  for (const id of stvBadges) badges.push([MessageBadgeType.STV, id]);
  for (const id of chBadges) badges.push([MessageBadgeType.CHATTERINO, id]);

  return badges;
};

export default createMessageBadges;
