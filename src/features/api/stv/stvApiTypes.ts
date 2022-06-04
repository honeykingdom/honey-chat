import { Badges } from '../types';

export type StvRole = {
  id: string;
  name: string;
  position: number;
  color: number;
  allowed: number;
  denied: number;
  default: boolean;
};

export type StvUser = {
  id: string;
  twitch_id: string;
  login: string;
  display_name: string;
  role: StvRole;
  profile_picture_id?: string;
};

export type StvEmote = {
  id: string;
  name: string;
  owner: StvUser;
  visibility: number;
  visibility_simple: (
    | 'GLOBAL'
    | 'OVERRIDE_FFZ'
    | 'OVERRIDE_BTTV'
    | 'ZERO_WIDTH'
  )[];
  mime: 'image/png' | 'image/gif' | 'image/webp' | 'image/jpeg' | string;
  status: number;
  tags: string[];
  width: number[];
  height: number[];
  urls: ['1' | '2' | '3' | '4', string][];
};

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
