/* eslint-disable no-restricted-syntax */
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import type { StateEmotes } from 'features/emotes/emotesSelectors';
import findEmote from 'features/emotes/utils/findEmote';

export type EmotesByText = {
  begins: htmlEntity.Emote[];
  contains: htmlEntity.Emote[];
};

const getEmotesByText = (
  text: string,
  emotes: StateEmotes,
  limit = -1,
): htmlEntity.Emote[] => {
  if (!emotes) return [];

  const result: EmotesByText = {
    begins: [],
    contains: [],
  };
  const textLower = text.toLowerCase();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const isOver =
    findEmote.bttv.byText(result, emotes.bttvChannel, textLower, limit) ||
    findEmote.ffz.byText(result, emotes.ffzChannel, textLower, limit) ||
    findEmote.twitch.byText(result, emotes.twitchUser, textLower, limit) ||
    findEmote.twitch.byText(result, emotes.twitchGlobal, textLower, limit) ||
    findEmote.bttv.byText(result, emotes.bttvGlobal, textLower, limit) ||
    findEmote.ffz.byText(result, emotes.ffzGlobal, textLower, limit);

  return [...result.begins, ...result.contains];
};

export default getEmotesByText;
