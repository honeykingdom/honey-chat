import type { DeepRequired } from 'ts-essentials';
import type { definitions } from './stvApiTypes.generated';
import type { Badges } from '../types';

export type StvGlobalEmotesResponse = DeepRequired<
  definitions['model.EmoteSetModel']
>;
export type StvChannelEmotesResponse = DeepRequired<
  definitions['model.UserConnectionModel']
>;
export type StvEmoteSet = DeepRequired<definitions['model.EmoteSetModel']>;
export type StvEmote = DeepRequired<definitions['model.ActiveEmoteModel']>;

export type StvRawBadge = {
  id: string;
  name: string;
  tooltip: string;
  urls: ['1' | '2' | '3', string][];
  users: string[];
  misc?: boolean;
};

type StvPaintShadow = {
  x_offset: number;
  y_offset: number;
  radius: number;
  color: number;
};

export type StvPaint = {
  id: string;
  name: string;
  users: string[];
  function: string;
  color: number | null;
  stops: { at: number; color: number }[];
  repeat: boolean;
  angle: number;
  image_url?: string;
  shape?: string;
  drop_shadow: StvPaintShadow;
  drop_shadows?: StvPaintShadow[];
  animation: {
    speed: 0;
    keyframes: null;
  };
};

export type StvCosmeticsResponse = {
  badges: StvRawBadge[];
  paints: StvPaint[];
};

export type StvBadge = Omit<StvRawBadge, 'users'>;

export type StvCosmetics = {
  badges: Badges<StvBadge>;
};
