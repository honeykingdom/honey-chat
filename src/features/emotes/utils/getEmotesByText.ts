import { MessagePartType } from 'features/messages';
import type { AllEmotes, HtmlEmote } from '../emotesTypes';
import createHtmlEmote from './createHtmlEmote';

type SearchResult = {
  begins: HtmlEmote[];
  contains: HtmlEmote[];
};

const createFindEmotes =
  <T, U extends keyof T, V extends keyof T>(
    emotes: AllEmotes,
    entries: Record<string, T> | undefined,
    nameProp: U,
    idProp: V,
    type: MessagePartType,
  ) =>
  (result: SearchResult, search: string, limit: number) => {
    if (!entries) return;

    for (const emote of Object.values(entries)) {
      if (result.begins.length + result.contains.length === limit) return true;

      const index = (emote[nameProp] as any).toLowerCase().indexOf(search);

      if (index === -1) continue;

      result[index === 0 ? 'begins' : 'contains'].push(
        createHtmlEmote(emotes, type, emote[idProp] as any)!,
      );
    }
  };

const createFindEmoji =
  (emotes: AllEmotes) =>
  (result: SearchResult, search: string, limit: number) => {
    if (!emotes.emoji?.entries) return;

    for (const emote of Object.values(emotes.emoji.entries)) {
      if (result.begins.length + result.contains.length === limit) return true;

      if (typeof emote.name === 'string') {
        const index = emote.name.toLowerCase().indexOf(search);

        if (index === -1) continue;

        result[index === 0 ? 'begins' : 'contains'].push(
          createHtmlEmote(emotes, MessagePartType.EMOJI, emote.codePoints)!,
        );
      } else {
        for (const keyword of emote.name) {
          const index = keyword.toLowerCase().indexOf(search);

          if (index === -1) continue;

          result[index === 0 ? 'begins' : 'contains'].push(
            createHtmlEmote(emotes, MessagePartType.EMOJI, emote.codePoints)!,
          );

          break;
        }
      }
    }
  };

// TODO: try to refactor this
const getEmotesByText = (
  search: string,
  emotes: AllEmotes,
  limit = -1,
): HtmlEmote[] => {
  const result: SearchResult = { begins: [], contains: [] };

  const findTwitch = createFindEmotes(
    emotes,
    emotes.twitch?.entries,
    'name',
    'id',
    MessagePartType.TWITCH_EMOTE,
  );
  const findBttvChannel = createFindEmotes(
    emotes,
    emotes.bttvChannel?.entries,
    'code',
    'id',
    MessagePartType.BTTV_EMOTE,
  );
  const findBttvGlobal = createFindEmotes(
    emotes,
    emotes.bttvGlobal?.entries,
    'code',
    'id',
    MessagePartType.BTTV_EMOTE,
  );
  const findFfzChannel = createFindEmotes(
    emotes,
    emotes.ffzChannel?.entries,
    'name',
    'id',
    MessagePartType.FFZ_EMOTE,
  );
  const findFfzGlobal = createFindEmotes(
    emotes,
    emotes.ffzGlobal?.entries,
    'name',
    'id',
    MessagePartType.FFZ_EMOTE,
  );
  const findStvChannel = createFindEmotes(
    emotes,
    emotes.stvChannel?.entries,
    'name',
    'id',
    MessagePartType.STV_EMOTE,
  );
  const findStvGlobal = createFindEmotes(
    emotes,
    emotes.stvGlobal?.entries,
    'name',
    'id',
    MessagePartType.STV_EMOTE,
  );
  const findEmoji = createFindEmoji(emotes);

  const isOver =
    findBttvChannel(result, search, limit) ||
    findFfzChannel(result, search, limit) ||
    findStvChannel(result, search, limit) ||
    findTwitch(result, search, limit) ||
    findBttvGlobal(result, search, limit) ||
    findFfzGlobal(result, search, limit) ||
    findStvGlobal(result, search, limit) ||
    findEmoji(result, search, limit);

  return [...result.begins, ...result.contains];
};

export default getEmotesByText;
