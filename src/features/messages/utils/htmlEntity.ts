import * as R from 'ramda';
import type twitchIrc from 'twitch-simple-irc';

import * as api from 'api';
import normalizeHref from 'utils/normalizeHref';

export interface TwitchEmote {
  type: 'twitch-emote';
  id: number;
  alt: string;
  src: string;
  srcSet: string;
}
export interface BttvEmote {
  type: 'bttv-emote';
  id: string;
  alt: string;
  src: string;
  srcSet: string;
}
export interface FfzEmote {
  type: 'ffz-emote';
  id: number;
  alt: string;
  src: string;
  srcSet: string;
}
export interface Emoji {
  type: 'emoji';
  alt: string;
  src: string;
}
export interface Mention {
  type: 'mention';
  text: string;
  target: string;
}
export interface Link {
  type: 'link';
  text: string;
  href: string;
}
export interface Badge {
  alt: string;
  label: string;
  src: string;
  srcSet: string;
}

export type Emote = TwitchEmote | BttvEmote | FfzEmote;

const TWITCH_EMOTES_CDN = '//static-cdn.jtvnw.net/emoticons/v1';
const BTTV_EMOTES_CDN = '//cdn.betterttv.net/emote';

// prettier-ignore
export const regexEmotesMap: Record<string, string> = {
  '[oO](_|\\.)[oO]': 'O_o',
  '\\&gt\\;\\(':     '>(',
  '\\&lt\\;3':       '<3',
  '\\:-?(o|O)':      ':O',
  '\\:-?(p|P)':      ':P',
  '\\:-?[\\\\/]':    ':/',
  '\\:-?[z|Z|\\|]':  ':Z',
  '\\:-?\\(':        ':(',
  '\\:-?\\)':        ':)',
  '\\:-?D':          ':D',
  '\\;-?(p|P)':      ';P',
  '\\;-?\\)':        ';)',
  'R-?\\)':          'R)',
  'B-?\\)':          'B)',
};

export const getFfzSrcSet = R.pipe<{}, [string, string][], string[], string>(
  R.toPairs,
  R.map(([dpi, url]) => `${url} ${dpi}x`),
  R.join(', '),
);

export const createTwitchEmote = ({
  id,
  code,
}: api.TwitchEmote): TwitchEmote => ({
  type: 'twitch-emote',
  id,
  alt: regexEmotesMap[code] || code,
  src: `${TWITCH_EMOTES_CDN}/${id}/1.0`,
  srcSet: `${TWITCH_EMOTES_CDN}/${id}/1.0 1x, ${TWITCH_EMOTES_CDN}/${id}/2.0 2x, ${TWITCH_EMOTES_CDN}/${id}/3.0 4x`,
});

export const createBttvEmote = ({
  id,
  code,
}: api.BttvGlobalEmote | api.BttvChannelEmote): BttvEmote => ({
  type: 'bttv-emote',
  id,
  alt: code,
  src: `${BTTV_EMOTES_CDN}/${id}/1x`,
  srcSet: `${BTTV_EMOTES_CDN}/${id}/2x 2x, ${BTTV_EMOTES_CDN}/${id}/3x 4x`,
});

export const createFfzEmote = ({ id, name, urls }: api.FfzEmote): FfzEmote => ({
  type: 'ffz-emote',
  id,
  alt: name,
  src: urls[1],
  srcSet: getFfzSrcSet(urls),
});

export const createEmoji = (alt: string, src: string): Emoji => ({
  type: 'emoji',
  alt: `:${alt}:`,
  src,
});

export const createMention = (text: string, target: string): Mention => ({
  type: 'mention',
  text,
  target,
});

export const createLink = (href: string): Link => ({
  type: 'link',
  text: href,
  href: normalizeHref(href),
});

export const createBadge = ({
  title,
  description,
  image_url_1x: imageUrl1x,
  image_url_2x: imageUrl2x,
  image_url_4x: imageUrl4x,
}: api.TwitchBadgeVersion): Badge => ({
  alt: title,
  label: description,
  src: imageUrl1x,
  srcSet: `${imageUrl1x} 1x, ${imageUrl2x} 2x, ${imageUrl4x} 4x`,
});

export const createBadges = (
  badges: twitchIrc.Badges,
  globalBadges: Record<string, api.TwitchBadge>,
  channelBadges: Record<string, api.TwitchBadge>,
): Badge[] => {
  const mapBadges = ([name, version]: [string, string]): Badge | false => {
    const badge =
      channelBadges[name]?.versions[version] ||
      globalBadges[name]?.versions[version];

    return badge ? createBadge(badge) : false;
  };

  return R.pipe<{}, [string, string][], any[], any[]>(
    R.toPairs,
    R.map(mapBadges),
    R.filter(Boolean),
  )(badges);
};
