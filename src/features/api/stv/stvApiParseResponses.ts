import { Emotes } from '../types';
import { StvCosmetics, StvCosmeticsResponse, StvEmote } from './stvApiTypes';

export const parseStvEmotes = (data: StvEmote[]): Emotes<StvEmote> => {
  const result: Emotes<StvEmote> = { entries: {}, nameToId: {} };

  for (const emote of data) {
    result.entries[emote.id] = emote;
    result.nameToId[emote.name] = emote.id;
  }

  return result;
};

export const parseStvCosmetics = (data: StvCosmeticsResponse): StvCosmetics => {
  const badges: StvCosmetics['badges'] = { entries: {}, users: {} };

  for (const { users, ...badge } of data.badges) {
    badges.entries[badge.id] = badge;

    for (const userId of users) {
      if (!badges.users[userId]) badges.users[userId] = [];

      badges.users[userId].push(badge.id);
    }
  }

  return { badges };
};
