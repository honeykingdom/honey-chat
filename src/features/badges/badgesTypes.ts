import type {
  Badges,
  BttvBadge,
  ChatterinoBadge,
  FfzApBadge,
  FfzBadge,
  StvBadge,
  TwitchBadge,
} from 'features/api';
import type { MessageBadgeType } from './badgesConstants';

export type AllBadges = {
  twitchGlobal?: Record<string, TwitchBadge>;
  twitchChannel?: Record<string, TwitchBadge>;
  bttv?: Badges<BttvBadge>;
  ffz?: Badges<FfzBadge>;
  ffzAp?: Badges<FfzApBadge>;
  stv?: Badges<StvBadge>;
  chatterino?: Badges<ChatterinoBadge>;
};

export type MessageBadgeTwitch = [
  type: MessageBadgeType.TWITCH,
  id: string,
  version: string,
];
export type MessageBadgeBttv = [type: MessageBadgeType.BTTV, id: string];
export type MessageBadgeFfz = [type: MessageBadgeType.FFZ, id: string];
export type MessageBadgeFfzAp = [type: MessageBadgeType.FFZ_AP, id: string];
export type MessageBadgeStv = [type: MessageBadgeType.STV, id: string];
export type MessageBadgeChatterino = [
  type: MessageBadgeType.CHATTERINO,
  id: string,
];

export type MessageBadge =
  | MessageBadgeTwitch
  | MessageBadgeBttv
  | MessageBadgeFfz
  | MessageBadgeFfzAp
  | MessageBadgeStv
  | MessageBadgeChatterino;

export type HtmlBadge = {
  id: string;
  title: string;
  alt: string;
  src: string;
  srcSet?: string;
  bgColor?: string | null;
};
