import * as R from 'ramda';
import TwitchIrc from 'twitch-simple-irc';

import normalizeHref from 'utils/normalizeHref';
import { TwitchEmote, TwitchBadgeVersion, TwitchBadges } from 'api/twitch';
import { BttvGlobalEmote, BttvChannelEmote } from 'api/bttv';
import { FfzEmote } from 'api/ffz';

export interface HtmlEntityTwitchEmote {
  type: 'twitch-emote';
  alt: string;
  src: string;
  srcSet: string;
}
export interface HtmlEntityBttvEmote {
  type: 'bttv-emote';
  alt: string;
  src: string;
  srcSet: string;
}
export interface HtmlEntityFfzEmote {
  type: 'ffz-emote';
  alt: string;
  src: string;
  srcSet: string;
}
export interface HtmlEntityEmoji {
  type: 'emoji';
  alt: string;
  src: string;
  srcSet: null;
}
export interface HtmlEntityMention {
  type: 'mention';
  text: string;
  target: string;
}
export interface HtmlEntityLink {
  type: 'link';
  text: string;
  href: string;
}
export interface HtmlEntityBadge {
  alt: string;
  label: string;
  src: string;
  srcSet: string;
}

export type HtmlEntityEmote =
  | HtmlEntityTwitchEmote
  | HtmlEntityBttvEmote
  | HtmlEntityFfzEmote;

const TWITCH_EMOTES_CDN = '//static-cdn.jtvnw.net/emoticons/v1';
const BTTV_EMOTES_CDN = '//cdn.betterttv.net/emote';

const getFfzSrcSet = R.pipe(
  // @ts-ignore
  R.toPairs,
  R.map(([dpi, url]) => `${url} ${dpi}x`),
  R.join(', '),
);

export const createTwitchEmote = ({
  id,
  code,
}: TwitchEmote): HtmlEntityTwitchEmote => ({
  type: 'twitch-emote',
  alt: code,
  src: `${TWITCH_EMOTES_CDN}/${id}/1.0`,
  srcSet: `${TWITCH_EMOTES_CDN}/${id}/1.0 1x, ${TWITCH_EMOTES_CDN}/${id}/2.0 2x, ${TWITCH_EMOTES_CDN}/${id}/3.0 4x`,
});

export const createBttvEmote = ({
  id,
  code,
}: BttvGlobalEmote | BttvChannelEmote): HtmlEntityBttvEmote => ({
  type: 'bttv-emote',
  alt: code,
  src: `${BTTV_EMOTES_CDN}/${id}/1x`,
  srcSet: `${BTTV_EMOTES_CDN}/${id}/2x 2x, ${BTTV_EMOTES_CDN}/${id}/3x 4x`,
});

export const createFfzEmote = ({
  name,
  urls,
}: FfzEmote): HtmlEntityFfzEmote => ({
  type: 'ffz-emote',
  alt: name,
  src: urls[1],
  srcSet: getFfzSrcSet(urls),
});

export const createEmoji = (alt: string, src: string): HtmlEntityEmoji => ({
  type: 'emoji',
  alt: `:${alt}:`,
  src,
  srcSet: null,
});

export const createMention = (
  text: string,
  target: string,
): HtmlEntityMention => ({
  type: 'mention',
  text,
  target,
});

export const createLink = (href: string): HtmlEntityLink => ({
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
}: TwitchBadgeVersion): HtmlEntityBadge => ({
  alt: title,
  label: description,
  src: imageUrl1x,
  srcSet: `${imageUrl1x} 1x, ${imageUrl2x} 2x, ${imageUrl4x} 4x`,
});

export const createBadges = (
  badges: TwitchIrc.Badges,
  globalBadges: TwitchBadges,
  channelBadges: TwitchBadges,
) => {
  const mapBadges = ([name, version]: [string, string]) => {
    const badge =
      R.pathOr(false, [name, 'versions', version], channelBadges) ||
      R.pathOr(false, [name, 'versions', version], globalBadges);

    return badge ? createBadge(badge) : false;
  };

  return R.pipe(
    // @ts-ignore
    R.toPairs,
    R.map(mapBadges),
    R.filter(Boolean),
  )(badges) as HtmlEntityBadge[];
};
