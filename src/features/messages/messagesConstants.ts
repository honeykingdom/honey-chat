export enum MessageType {
  PRIVATE_MESSAGE = 0,
  NOTICE = 1,
  USER_NOTICE = 2,
}

export enum MessagePartType {
  TEXT = 0,
  MENTION = 4,
  LINK = 5,
  TWITCH_EMOTE = 6,
  TWITCH_CLIP = 7,
  TWITCH_VIDEO = 8,

  BTTV_EMOTE = 101,
  FFZ_EMOTE = 102,
  STV_EMOTE = 103,
  EMOJI = 104,
}
