import type { BttvEmote, FfzEmote, StvEmote } from 'features/api';
import { MessagePartType } from 'features/messages';
import type { AllEmotes, EmotesCategory, HtmlEmote } from '../emotesTypes';
import createHtmlEmote from './createHtmlEmote';

const createEmoteCategories = (emotes: AllEmotes) => {
  const result: EmotesCategory[] = [];

  const {
    twitch,
    bttvGlobal,
    bttvChannel,
    ffzGlobal,
    ffzChannel,
    stvGlobal,
    stvChannel,
  } = emotes;

  const createBttvHtmlEmote = (emote: BttvEmote) =>
    createHtmlEmote(emotes, MessagePartType.BTTV_EMOTE, emote.id)!;
  const createFfzHtmlEmote = (emote: FfzEmote) =>
    createHtmlEmote(emotes, MessagePartType.FFZ_EMOTE, `${emote.id}`)!;
  const createStvHtmlEmote = (emote: StvEmote) =>
    createHtmlEmote(emotes, MessagePartType.STV_EMOTE, emote.id)!;

  if (bttvChannel) {
    result.push({
      title: 'BetterTTV Channel Emotes',
      items: Object.values(bttvChannel.entries).map(createBttvHtmlEmote),
    });
  }

  if (bttvGlobal) {
    result.push({
      title: 'BetterTTV Global Emotes',
      items: Object.values(bttvGlobal.entries).map(createBttvHtmlEmote),
    });
  }

  if (ffzChannel) {
    result.push({
      title: 'FrankerFaceZ Channel Emotes',
      items: Object.values(ffzChannel.entries).map(createFfzHtmlEmote),
    });
  }

  if (ffzGlobal) {
    result.push({
      title: 'FrankerFaceZ Global Emotes',
      items: Object.values(ffzGlobal.entries).map(createFfzHtmlEmote),
    });
  }

  if (stvChannel) {
    result.push({
      title: '7TV Channel Emotes',
      items: Object.values(stvChannel.entries).map(createStvHtmlEmote),
    });
  }

  if (stvGlobal) {
    result.push({
      title: '7TV Global Emotes',
      items: Object.values(stvGlobal.entries).map(createStvHtmlEmote),
    });
  }

  if (twitch) {
    const user: HtmlEmote[] = [];
    const global: HtmlEmote[] = [];

    for (const emote of Object.values(twitch.entries)) {
      const htmlEmote = createHtmlEmote(
        emotes,
        MessagePartType.TWITCH_EMOTE,
        emote.id,
      )!;

      if (emote.emote_set_id === '0') {
        global.push(htmlEmote);
      } else {
        user.push(htmlEmote);
      }
    }

    result.push({ title: 'Twitch User Emotes', items: user });
    result.push({ title: 'Twitch Global Emotes', items: global });
  }

  return result;
};

export default createEmoteCategories;
