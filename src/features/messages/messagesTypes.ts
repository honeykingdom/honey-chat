import type { MessageBadge } from 'features/badges/badgesTypes';
import type { MessageCard } from 'features/messageCards/messageCardsTypes';
import type { MessagePartType, MessageType } from './messagesConstants';

export type MessagePartText = {
  type: MessagePartType.TEXT;
  content: string;
};

type MessagePartEmoteContent = {
  id: string;
  modifiers: MessagePartEmoteModifier[];
};

export type MessagePartTwitchEmote = {
  type: MessagePartType.TWITCH_EMOTE;
  content: MessagePartEmoteContent;
};

export type MessagePartBttvEmote = {
  type: MessagePartType.BTTV_EMOTE;
  content: MessagePartEmoteContent;
};

export type MessagePartFfzEmote = {
  type: MessagePartType.FFZ_EMOTE;
  content: MessagePartEmoteContent;
};

export type MessagePartStvEmote = {
  type: MessagePartType.STV_EMOTE;
  content: MessagePartEmoteContent;
};

export type MessagePartEmoji = {
  type: MessagePartType.EMOJI;
  content: MessagePartEmoteContent;
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

export type MessagePartEmoteModifier =
  | MessagePartBttvEmote
  | MessagePartFfzEmote
  | MessagePartStvEmote;

type MessageUser = {
  id: string;
  login: string;
  displayName?: string;
  color?: string;
  /** Is displayName not latin characters */
  // isIntl: false;
};

type MessagePrivateTags = {
  emotes?: string;
  badges?: string;
};

type AMessage = {
  id: string;
  channelName: string;
  timestamp: number;
  user: MessageUser;
  badges: MessageBadge[];
  parts: MessagePart[];
  body: string;
  _tags: MessagePrivateTags;
};

// https://github.com/twurple/twurple/blob/main/packages/chat/src/commands/TwitchPrivateMessage.ts
export type MessageTypePrivate = AMessage & {
  type: MessageType.PRIVATE_MESSAGE;
  card: MessageCard | null;
  /** Whether the message is a cheer */
  isCheer: boolean;
  /** Whether the message represents a redemption of a custom channel points reward */
  isRedemption: boolean;
  /** Whether the message is highlighted by using channel points */
  isPointsHighlight: boolean;
  /** Starts with `/me` in the twitch chat */
  isAction: boolean;
  /** Is message was deleted by mods */
  isDeleted: boolean;
  /** Is message loaded from the recent-messages */
  isHistory: boolean;
  /** Is message was sent by current user with chat.say() */
  isSelf: boolean;
  /** Is message highlighted according highlight settings */
  isHighlighted: boolean;

  // isHidden: boolean;
};

export type MessageTypeUserNotice = AMessage & {
  type: MessageType.USER_NOTICE;
  /** @see https://dev.twitch.tv/docs/irc/tags#usernotice-tags */
  noticeType: string;
  systemMessage: string;
};

export type MessageTypeNotice = {
  type: MessageType.NOTICE;
  id: string;
  channelName: string;
  body: string;
  /** @see https://dev.twitch.tv/docs/irc/msg-id */
  noticeType: string;
};

export type Messages =
  | MessageTypePrivate
  | MessageTypeUserNotice
  | MessageTypeNotice;
