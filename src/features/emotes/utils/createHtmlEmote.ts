import type { BttvEmoteDetailed } from 'features/api';
import { MessagePartType } from 'features/messages';
import { DEFAULT_TWITCH_TEMPLATE } from '../emotesConstants';
import type { AllEmotes, HtmlEmote } from '../emotesTypes';

// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/styles/chat.scss#L402
// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/emotes.js#L959
// https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/tokenizers.jsx#L1195

const createHtmlEmote = (
  emotes: AllEmotes,
  type: MessagePartType,
  id: string,
): HtmlEmote | null => {
  // template: https://static-cdn.jtvnw.net/emoticons/v2/{{id}}/{{format}}/{{theme_mode}}/{{scale}}
  // example: https://static-cdn.jtvnw.net/emoticons/v2/354/default/dark/2.0
  // format: default | static | animated
  // scale: 1.0 | 2.0 | 3.0
  // theme_mode: dark | light
  if (type === MessagePartType.TWITCH_EMOTE) {
    const template = emotes.twitchTemplate || DEFAULT_TWITCH_TEMPLATE;
    const emote = emotes.twitch?.entries[id];
    const title = emote?.name || '';
    const tmp = template
      .replace('{{id}}', id)
      .replace('{{format}}', 'default')
      .replace('{{theme_mode}}', 'dark');
    const x1 = tmp.replace('{{scale}}', '1.0');
    const x2 = tmp.replace('{{scale}}', '2.0');
    const x4 = tmp.replace('{{scale}}', '4.0');
    const ownerId =
      emote?.emote_type === 'follower' || emote?.emote_type === 'subscriptions'
        ? emote?.owner_id
        : undefined;
    return {
      id,
      title,
      alt: title,
      src: x1,
      srcSet: `${x1} 1x, ${x2} 2x, ${x4} 4x`,
      owner: {
        id: ownerId,
      },
    };
  }

  if (type === MessagePartType.BTTV_EMOTE) {
    type MaybeWithUser = { user?: BttvEmoteDetailed['user'] } | undefined;
    const emote =
      emotes.bttvChannel?.entries[id] || emotes.bttvGlobal?.entries[id];
    const title = emote?.code || '';
    const x1 = `//cdn.betterttv.net/emote/${id}/1x`;
    const x2 = `//cdn.betterttv.net/emote/${id}/2x`;
    const x3 = `//cdn.betterttv.net/emote/${id}/3x`;
    return {
      id,
      title,
      alt: title,
      src: x1,
      srcSet: `${x1} 1x, ${x2} 2x, ${x3} 3x`,
      owner: {
        id: (emote as MaybeWithUser)?.user?.providerId,
        name: (emote as MaybeWithUser)?.user?.name,
        displayName: (emote as MaybeWithUser)?.user?.displayName,
      },
    };
  }

  if (type === MessagePartType.FFZ_EMOTE) {
    const emote =
      emotes.ffzChannel?.entries[id] || emotes.ffzGlobal?.entries[id];
    const title = emote?.name || '';
    const x1 = `//cdn.frankerfacez.com/emote/${id}/1`;
    const x2 = `//cdn.frankerfacez.com/emote/${id}/2`;
    const x4 = `//cdn.frankerfacez.com/emote/${id}/4`;
    return {
      id,
      title,
      alt: title,
      src: x1,
      srcSet: `${x1} 1x, ${x2} 2x, ${x4} 4x`,
      owner: {
        id: emote?.owner?._id ? `${emote?.owner?._id}` : undefined,
        name: emote?.owner?.name,
        displayName: emote?.owner?.display_name || undefined,
      },
    };
  }

  if (type === MessagePartType.STV_EMOTE) {
    const emote =
      emotes.stvChannel?.entries[id] || emotes.stvGlobal?.entries[id];
    const title = emote?.name || '';
    let src = '';
    let srcSet = '';
    if (emote?.urls) {
      src = emote.urls[0][1];
      srcSet = emote.urls.map(([scale, url]) => `${url} ${scale}x`).join(', ');
    } else {
      const format = emote?.mime.replace('image/', '') || 'webp';
      const x1 = `//cdn.7tv.app/emote/${id}/1x.${format}`;
      const x2 = `//cdn.7tv.app/emote/${id}/2x.${format}`;
      const x3 = `//cdn.7tv.app/emote/${id}/3x.${format}`;
      const x4 = `//cdn.7tv.app/emote/${id}/4x.${format}`;
      src = x1;
      srcSet = `${x1} 1x, ${x2} 2x, ${x3} 3x, ${x4} 4x`;
    }
    return {
      id,
      title,
      alt: title,
      src,
      srcSet,
      owner: {
        id: emote?.owner.twitch_id,
        name: emote?.owner.login,
        displayName: emote?.owner.display_name,
      },
    };
  }

  // https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/emoji.js
  if (type === MessagePartType.EMOJI) {
    const emote = emotes.emoji?.entries[id];
    if (!emote) return null;
    const alt = emote.char;
    const title = typeof emote.name === 'string' ? emote.name : emote.name[0];
    const w72 = `//cdn.frankerfacez.com/static/emoji/images/twemoji/${emote.codePoints}.png`;
    return {
      id,
      title: `:${title}:`,
      alt,
      src: w72,
      srcSet: `${w72} 72w`,
      owner: {},
    };
  }

  return null;
};

export default createHtmlEmote;
