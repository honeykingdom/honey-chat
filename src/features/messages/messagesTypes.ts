import { MessageBadge } from 'features/badges';
import { MessageCard } from 'features/messageCards';
import { MessagePartType, MessageType } from './messagesConstants';

export type MessagePartText = {
  type: MessagePartType.TEXT;
  content: string;
};

export type MessagePartTwitchEmote = {
  type: MessagePartType.TWITCH_EMOTE;
  content: string;
};

export type MessagePartBttvEmote = {
  type: MessagePartType.BTTV_EMOTE;
  content: string;
};

export type MessagePartFfzEmote = {
  type: MessagePartType.FFZ_EMOTE;
  content: string;
};

export type MessagePartStvEmote = {
  type: MessagePartType.STV_EMOTE;
  content: string;
};

export type MessagePartEmoji = {
  type: MessagePartType.EMOJI;
  content: string;
};

export type MessagePartMention = {
  type: MessagePartType.MENTION;
  content: {
    displayText: string;
    recipient: string;
  };
};

export type MessagePartLink = {
  type: MessagePartType.LINK;
  content: {
    displayText: string;
    url: string;
  };
};

export type MessagePartTwitchClip = {
  type: MessagePartType.TWITCH_CLIP;
  content: {
    displayText: string;
    slug: string;
    url: string;
  };
};

export type MessagePartTwitchVideo = {
  type: MessagePartType.TWITCH_VIDEO;
  content: {
    displayText: string;
    id: string;
    url: string;
  };
};

export type MessagePart =
  | MessagePartText
  | MessagePartTwitchEmote
  | MessagePartBttvEmote
  | MessagePartFfzEmote
  | MessagePartStvEmote
  | MessagePartEmoji
  | MessagePartMention
  | MessagePartLink
  | MessagePartTwitchClip
  | MessagePartTwitchVideo;

export type MessagePartEmote =
  | MessagePartTwitchEmote
  | MessagePartBttvEmote
  | MessagePartFfzEmote
  | MessagePartStvEmote
  | MessagePartEmoji;

export type MessageTypePrivate = {
  type: MessageType.PRIVATE_MESSAGE;
  id: string;
  channelId: string;
  channelName: string;
  timestamp: number;
  user: {
    id: string;
    login: string;
    displayName: string;
    color: string;
    isIntl: false;
  };
  badges: MessageBadge[];
  parts: MessagePart[];
  body: string;
  card: MessageCard | null;
  isAction: boolean;
  isDeleted: boolean;
  isHistory: boolean;
  isSelf: boolean;

  // isHighlighted: boolean;
  // isHidden: boolean;
};

export type MessageTypeNotice = {
  type: MessageType.NOTICE;
  id: string;
  channelId: string;
  channelName: string;
  message: string;
  noticeType: string;
};

export type MessageTypeUserNotice = {
  type: MessageType.USER_NOTICE;
  id: string;
  channelId: string;
  channelName: string;
  message: string;
  // noticeType: keyof typeof twitchIrc.UserNoticeType;
  systemMessage: string;
  user: {
    login: string;
  };
};

export type Messages =
  | MessageTypePrivate
  | MessageTypeNotice
  | MessageTypeUserNotice;
