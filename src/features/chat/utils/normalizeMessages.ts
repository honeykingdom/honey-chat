import TwitchIrc from 'twitch-simple-irc';
import * as tekko from 'tekko';

import { TwitchBadges } from 'api/twitch';
import { RootState } from 'app/rootReducer';
import {
  Message,
  Notice,
  UserNotice,
  OwnMessage,
} from 'features/chat/slice/messages';
import { ChatState } from 'features/chat/slice';
import {
  blockedUsersSelector,
  globalBadgesSelector,
  channelBadgesSelector,
  emotesSelector,
  StateEmotes,
} from 'features/chat/selectors';
import formatMessage from 'features/chat/utils/formatMessage';
import { createBadges } from 'features/chat/utils/htmlEntity';

export const normalizeMessage = (
  { message, tags, user, channel, isAction }: TwitchIrc.MessageEvent,
  chatState: ChatState,
): Message | null => {
  const fakeState = { chat: chatState } as RootState;
  const blockedUsers = blockedUsersSelector(fakeState);

  if (blockedUsers.includes(user)) return null;

  const globalBadges = globalBadgesSelector(fakeState);
  const channelBadges = channelBadgesSelector(fakeState);
  const emotes = emotesSelector(fakeState);

  return {
    type: 'message',
    id: tags.id,
    message,
    channel,
    entities: formatMessage(message, emotes, tags.emotes),
    user: {
      id: tags.userId,
      login: user,
      displayName: tags.displayName,
      color: tags.color,
      badges: createBadges(tags.badges, globalBadges, channelBadges),
    },
    timestamp: tags.tmiSentTs,
    isAction,
    isHistory: false,
    isDeleted: false,
  };
};

export const normalizeNotice = (
  { message, channel, tags: { msgId } }: TwitchIrc.NoticeEvent,
  id: string,
): Notice => ({
  type: 'notice',
  id,
  message,
  channel,
  noticeType: msgId,
});

export const normalizeUserNotice = ({
  message,
  channel,
  tags: { id, msgId, login, systemMsg },
}: TwitchIrc.UserNoticeEvent): UserNotice => ({
  type: 'user-notice',
  id,
  message,
  channel,
  noticeType: msgId,
  systemMessage: systemMsg,
  user: {
    login,
  },
});

export const normalizeOwnMessage = (
  { message, id, channel, tags, timestamp, userId, userLogin }: OwnMessage,
  chatState: ChatState,
): Message => {
  const fakeState = { chat: chatState } as RootState;
  const globalBadges = globalBadgesSelector(fakeState);
  const channelBadges = channelBadgesSelector(fakeState);
  const emotes = emotesSelector(fakeState);

  const isAction = message.startsWith('/me ');

  return {
    type: 'message',
    id,
    message: isAction ? message.slice(4) : message,
    channel,
    entities: formatMessage(message, emotes, null, { parseTwitch: true }),
    user: {
      id: userId,
      login: userLogin,
      displayName: tags.displayName,
      color: tags.color,
      badges: createBadges(tags.badges, globalBadges, channelBadges),
    },
    timestamp,
    isAction,
    isHistory: false,
    isDeleted: false,
  };
};

export const normalizeHistoryMessage = (
  { tags, params: [channel, message], prefix }: tekko.Message,
  emotes: StateEmotes,
  globalBadges: TwitchBadges,
  channelBadges: TwitchBadges,
): Message => {
  const isAction = TwitchIrc.getIsAction(message);
  const normalizedMessage = isAction
    ? TwitchIrc.normalizeActionMessage(message)
    : message;
  const parsedTags = (TwitchIrc.parseMessageTags(
    tags,
  ) as unknown) as TwitchIrc.MessageTags;

  return {
    type: 'message',
    id: parsedTags.id,
    message,
    channel: channel.slice(1),
    entities: formatMessage(normalizedMessage, emotes, parsedTags.emotes),
    user: {
      id: parsedTags.userId,
      login: prefix ? prefix.name : '',
      displayName: parsedTags.displayName,
      color: parsedTags.color,
      badges: createBadges(parsedTags.badges, globalBadges, channelBadges),
    },
    timestamp: parsedTags.tmiSentTs,
    isAction,
    isHistory: true,
    isDeleted: false,
  };
};

export const normalizeHistoryMessages = (
  rawMessages: string[],
  chatState: ChatState,
): Message[] => {
  const fakeState = { chat: chatState } as RootState;
  const globalBadges = globalBadgesSelector(fakeState);
  const channelBadges = channelBadgesSelector(fakeState);
  const emotes = emotesSelector(fakeState);
  const blockedUsers = blockedUsersSelector(fakeState);

  return rawMessages.reduce<Message[]>((acc, rawMessage) => {
    const message = tekko.parse(rawMessage) as tekko.Message;

    const { command, prefix } = message;

    if (
      command === 'PRIVMSG' &&
      prefix &&
      !blockedUsers.includes(prefix.name)
    ) {
      acc.push(
        normalizeHistoryMessage(message, emotes, globalBadges, channelBadges),
      );
    }

    return acc;
  }, []);
};