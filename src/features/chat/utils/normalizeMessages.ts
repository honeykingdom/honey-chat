import uuid from 'uuid/v4';
import * as twitchIrc from 'twitch-simple-irc';
import * as tekko from 'tekko';

import * as api from 'api';
import { RootState } from 'app/rootReducer';
import { userIdSelector, userLoginSelector } from 'features/auth/authSlice';
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
import parseMessageEntities from 'features/chat/utils/parseMessageEntities';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import { writeEmotesUsageStatistic } from 'features/chat/utils/emotesUsageStatistic';

export const normalizeMessage = (
  { message, tags, user, channel, isAction }: twitchIrc.MessageEvent,
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
    entities: parseMessageEntities(message, emotes, tags.emotes),
    user: {
      id: tags.userId,
      login: user,
      displayName: tags.displayName,
      color: tags.color,
      badges: htmlEntity.createBadges(tags.badges, globalBadges, channelBadges),
    },
    timestamp: tags.tmiSentTs,
    isAction,
    isHistory: false,
    isDeleted: false,
  };
};

export const normalizeNotice = (
  { message, channel, tags: { msgId } }: twitchIrc.NoticeEvent,
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
}: twitchIrc.UserNoticeEvent): UserNotice => ({
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
  { message, channel, tags }: OwnMessage,
  state: RootState,
): Message => {
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);
  const userId = userIdSelector(state);
  const userLogin = userLoginSelector(state);

  const isAction = message.startsWith('/me ');
  const normalizedMessage = isAction ? message.slice(4) : message;

  const entities = parseMessageEntities(normalizedMessage, emotes, null, true);
  writeEmotesUsageStatistic(entities);

  return {
    type: 'message',
    id: uuid(),
    message: normalizedMessage,
    channel,
    entities,
    user: {
      id: userId as string,
      login: userLogin as string,
      displayName: tags.displayName,
      color: tags.color,
      badges: htmlEntity.createBadges(tags.badges, globalBadges, channelBadges),
    },
    timestamp: Date.now(),
    isAction,
    isHistory: false,
    isDeleted: false,
  };
};

export const normalizeHistoryMessage = (
  { tags, params: [channel, message], prefix }: tekko.Message,
  emotes: StateEmotes,
  globalBadges: Record<string, api.TwitchBadge>,
  channelBadges: Record<string, api.TwitchBadge>,
): Message => {
  const isAction = twitchIrc.getIsAction(message);
  const normalizedMessage = isAction
    ? twitchIrc.normalizeActionMessage(message)
    : message;
  const parsedTags = (twitchIrc.parseMessageTags(
    tags,
  ) as unknown) as twitchIrc.MessageTags;

  return {
    type: 'message',
    id: parsedTags.id,
    message,
    channel: channel.slice(1),
    entities: parseMessageEntities(
      normalizedMessage,
      emotes,
      parsedTags.emotes,
    ),
    user: {
      id: parsedTags.userId,
      login: prefix ? prefix.name : '',
      displayName: parsedTags.displayName,
      color: parsedTags.color,
      badges: htmlEntity.createBadges(
        parsedTags.badges,
        globalBadges,
        channelBadges,
      ),
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
