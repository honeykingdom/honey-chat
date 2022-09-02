import { components } from './ffzApiTypes.generated';

export type FfzEmote = components['schemas']['Emote'];

type FfzEmoteSet = components['schemas']['EmoteSet'];

type FfzRoom = components['schemas']['Room'];

export type FfzGlobalEmotesResponse = {
  default_sets: number[];
  sets: Record<string, FfzEmoteSet>;
  users: Record<string, string[]>;
};

export type FfzChannelEmotesResponse = {
  room: FfzRoom;
  sets: Record<string, FfzEmoteSet>;
};

type FfzEmojiVariant = [
  codePoints: string,
  sheet: [x: number, y: number],
  has: number,
  skinTone: 1 | 2 | 3 | 4 | 5,
  _: number,
  name: string | string[],
];

export type FfzEmoji = [
  category: number,
  sort: number,
  name: string | string[],
  description: string,
  codePoints: string,
  sheet: [x: number, y: number],
  has: number,
  variants: 0 | FfzEmojiVariant[],
];

export type FfzEmojiResponse = {
  v: number;
  n: number;
  b: number;
  t: number;
  o: number;
  /** Categories */
  c: Record<string, string>;
  e: FfzEmoji[];
};

export type FfzBadge = components['schemas']['Badge'];

export type FfzGlobalBadgesResponse = {
  badges: FfzBadge[];
  users: Record<string, number[]>;
};

export type FfzApBadge = {
  id: string | number;
  tier: 1 | 2 | 3;
  badge_color?: string;
  badge_is_colored?: 0 | 1;
  admin?: 1;
};

export type FfzApGlobalBadgesResponse = FfzApBadge[];
