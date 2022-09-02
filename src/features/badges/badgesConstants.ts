export enum MessageBadgeType {
  TWITCH = 0,
  BTTV = 1,
  FFZ = 2,
  FFZ_AP = 3,
  STV = 4,
  CHATTERINO = 5,
}

// https://github.com/FrankerFaceZ/Add-Ons/blob/master/src/ffzap-core/index.js#L11
export enum FfzAp {
  Developer = 'FFZ:AP Developer',
  Supporter = 'FFZ:AP Supporter',
  Helper = 'FFZ:AP Helper',
}
export const FFZ_AP_HELPERS: Record<string, string> = {
  26964566: FfzAp.Developer,
  11819690: FfzAp.Helper,
  36442149: FfzAp.Helper,
  29519423: FfzAp.Helper,
  22025290: FfzAp.Helper,
  4867723: FfzAp.Helper,
};
export const FFZ_AP_COLORS: Record<string, string> = {
  [FfzAp.Developer]: '#E4107F',
  [FfzAp.Supporter]: '#755000',
};
