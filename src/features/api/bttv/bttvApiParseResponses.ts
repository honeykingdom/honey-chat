import { Badges, Emotes } from '../types';
import {
  BttvBadge,
  BttvEmoteDetailed,
  BttvChannelEmotesResponse,
  BttvEmoteCommon,
  BttvGlobalEmotesResponse,
} from './bttvApiTypes';

export const parseBttvGlobalEmotes = (
  data: BttvGlobalEmotesResponse,
): Emotes<BttvEmoteCommon> => {
  const result: Emotes<BttvEmoteCommon> = { entries: {}, names: {} };

  for (const emote of data) {
    result.entries[emote.id] = emote;
    result.names[emote.code] = emote.id;
  }

  return result;
};

export const parseBttvChannelEmotes = (
  data: BttvChannelEmotesResponse,
): Emotes<BttvEmoteDetailed> => {
  const result: Emotes<BttvEmoteDetailed> = { entries: {}, names: {} };

  for (const emote of data.channelEmotes) {
    result.entries[emote.id] = emote;
    result.names[emote.code] = emote.id;
  }

  for (const emote of data.sharedEmotes) {
    result.entries[emote.id] = emote;
    result.names[emote.code] = emote.id;
  }

  return result;
};

export const parseBttvGlobalBadges = (data: BttvBadge[]): Badges<BttvBadge> => {
  const result: Badges<BttvBadge> = { entries: {}, users: {} };

  for (const badge of data) {
    result.entries[badge.id] = badge;
    result.users[badge.providerId] = [badge.id];
  }

  return result;
};
