import { nanoid } from '@reduxjs/toolkit';
import { Howl } from 'howler';
import { PrivateMessage, NoticeMessage, UserNoticeMessage } from 'twitch-js';
import { RootState } from 'app/store';
import { emotesSelector } from 'features/emotes';
import {
  isHighlightNotificationsSelector,
  isShowTwitchCardsSelector,
  isShowYoutubeCardsSelector,
} from 'features/options/optionsSelectors';
import { writeEmotesUsageStatistic } from 'features/emotes/utils/emotesUsageStatistic';
import { blockedUsersSelector } from 'features/api';
import { meLoginSelector } from 'features/auth';
import { optionsSelector } from 'features/options';
import { badgesSelector, createMessageBadges } from 'features/badges';
import { Message, Notice, UserNotice } from '../chatTypes';
import parseMessageParts from './parseMessageParts';
import tinkSfx from 'assets/ts-tink.ogg';

const tink = new Howl({ src: [tinkSfx] });

export const parsePrivateMessage = (
  { message, tags, channel, username }: PrivateMessage,
  state: RootState,
): Message | null => {
  const blockedUsers = blockedUsersSelector(state);
  const isBlockedUser = blockedUsers.data?.includes(username);

  if (isBlockedUser) return null;

  const options = optionsSelector(state);
  const meLogin = meLoginSelector(state);

  // const isHighlighted = checkIsHighlighted(userLogin, username, message);

  // if (isHighlighted && isHighlightNotifications) tink.play();

  const allEmotes = emotesSelector(state);
  const allBadges = badgesSelector(state);

  const parts = parseMessageParts(message, allEmotes, tags.emotes);
  const badges = createMessageBadges(tags.badges, allBadges, tags.userId);

  // const card = getMessageCard();

  return {
    type: 'message',
    id: tags.id,
    channelId: tags.roomId,
    channelName: channel,
    timestamp: tags.tmiSentTs,
    user: {
      id: tags.userId,
      login: username,
      displayName: tags.displayName,
      color: tags.color,
      isIntl: false, // TODO
    },
    badges,
    parts,
    body: message,
    card: null,
    isAction: false, // TODO
    isDeleted: false,
    isHistory: false,
    isSelf: false,
  };
};

export const normalizeNotice = ({
  message,
  channel,
  tags: { msgId },
}: NoticeMessage): Notice => ({
  type: 'notice',
  id: nanoid(),
  message,
  channel,
  noticeType: msgId,
});

export const normalizeUserNotice = ({
  message,
  channel,
  tags: { id, msgId, login, systemMsg },
}: UserNoticeMessage): UserNotice => ({
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

export const normalizeSelfMessage = (
  { message, channel, tags }: SelfMessage,
  state: RootState,
): Message => {
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);
  const userLogin = userLoginSelector(state) as string;
  const userId = userIdSelector(state) as string;
  const isShowTwitchCards = isShowTwitchCardsSelector(state);
  const isShowYoutubeCards = isShowYoutubeCardsSelector(state);

  const isAction = message.startsWith('/me ');
  const normalizedMessage = isAction ? message.slice(4) : message;

  const entities = parseMessageEntities(normalizedMessage, emotes, null, true);
  const badges = htmlEntity.createBadges(
    tags.badges,
    globalBadges,
    channelBadges,
  );
  const card = getMessageCardFromEntities(entities, [
    isShowTwitchCards,
    isShowYoutubeCards,
  ]);

  writeEmotesUsageStatistic(entities);

  return {
    type: 'message',
    id: nanoid(),
    message: normalizedMessage,
    channel,
    entities,
    user: {
      id: userId,
      login: userLogin,
      displayName: tags.displayName,
      color: tags.color,
      badges,
    },
    timestamp: Date.now(),
    card,
    isAction,
    isHistory: false,
    isDeleted: false,
    isHighlighted: false,
    isSelf: true,
  };
};

export const normalizeHistoryMessage = (
  { tags, params: [channel, message], prefix }: tekko.Message,
  emotes: StateEmotes,
  globalBadges: Record<string, api.TwitchBadge>,
  channelBadges: Record<string, api.TwitchBadge>,
  userLogin: string | null,
): Message => {
  const isAction = twitchIrc.getIsAction(message);
  const normalizedMessage = isAction
    ? twitchIrc.normalizeActionMessage(message)
    : message;
  const parsedTags = twitchIrc.parseMessageTags(
    tags,
  ) as unknown as twitchIrc.MessageTags;

  const messageUser = prefix ? prefix.name : '';
  const isHighlighted = checkIsHighlighted(
    userLogin,
    messageUser,
    normalizedMessage,
  );

  const entities = parseMessageEntities(
    normalizedMessage,
    emotes,
    parsedTags.emotes,
  );
  const badges = htmlEntity.createBadges(
    parsedTags.badges,
    globalBadges,
    channelBadges,
  );

  // TODO: add cards for history?
  // const card = getMessageCardFromEntities(entities);

  return {
    type: 'message',
    id: parsedTags.id,
    message: normalizedMessage,
    channel: channel.slice(1),
    entities,
    user: {
      id: parsedTags.userId,
      login: messageUser,
      displayName: parsedTags.displayName,
      color: parsedTags.color,
      badges,
    },
    timestamp: parsedTags.tmiSentTs,
    card: null,
    isAction,
    isHistory: true,
    isDeleted: false,
    isHighlighted,
    isSelf: false,
  };
};

export const normalizeHistoryMessages = (
  rawMessages: string[],
  state: RootState,
): Message[] => {
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);
  const blockedUsers = blockedUsersSelector(state);
  const userLogin = userLoginSelector(state);

  return rawMessages.reduce<Message[]>((acc, rawMessage) => {
    const message = tekko.parse(rawMessage) as tekko.Message;

    const { command, prefix } = message;

    if (
      command === 'PRIVMSG' &&
      prefix &&
      !blockedUsers.includes(prefix.name)
    ) {
      acc.push(
        normalizeHistoryMessage(
          message,
          emotes,
          globalBadges,
          channelBadges,
          userLogin,
        ),
      );
    }

    return acc;
  }, []);
};
