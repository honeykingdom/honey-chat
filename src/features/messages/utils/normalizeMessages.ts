import { nanoid } from '@reduxjs/toolkit';
import * as twitchIrc from 'twitch-simple-irc';
import * as tekko from 'tekko';
import { Howl } from 'howler';

import type * as api from 'api';
import type { RootState } from 'app/rootReducer';
import type {
  Message,
  Notice,
  UserNotice,
  OwnMessage,
} from 'features/messages/messagesSlice';
import { emotesSelector } from 'features/emotes/emotesSelectors';
import { blockedUsersSelector } from 'features/blockedUsers/blockedUsersSelectors';
import {
  globalBadgesSelector,
  channelBadgesSelector,
} from 'features/badges/badgesSelectors';
import {
  isHighlightNotificationsSelector,
  isShowTwitchCardsSelector,
  isShowYoutubeCardsSelector,
} from 'features/options/optionsSelectors';
import { userLoginSelector, userIdSelector } from 'features/auth/authSelectors';
import type { StateEmotes } from 'features/emotes/emotesSelectors';
import parseMessageEntities from 'features/messages/utils/parseMessageEntities';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import checkIsHighlighted from 'features/messages/utils/checkIsHighlighted';
import getMessageCardFromEntities from 'features/messageCards/utils/getMessageCardFromEntities';
import { writeEmotesUsageStatistic } from 'features/emotes/utils/emotesUsageStatistic';

import tinkSfx from 'assets/ts-tink.ogg';

const tink = new Howl({ src: [tinkSfx] });

export const normalizeMessage = (
  { message, tags, user, channel, isAction }: twitchIrc.MessageEvent,
  state: RootState,
): Message | null => {
  const blockedUsers = blockedUsersSelector(state);
  const isBlockedUser = blockedUsers.includes(user);

  if (isBlockedUser) {
    return null;
  }

  const isHighlightNotifications = isHighlightNotificationsSelector(state);
  const isShowTwitchCards = isShowTwitchCardsSelector(state);
  const isShowYoutubeCards = isShowYoutubeCardsSelector(state);
  const userLogin = userLoginSelector(state);
  const isHighlighted = checkIsHighlighted(userLogin, user, message);

  if (isHighlighted && isHighlightNotifications) {
    tink.play();
  }

  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);

  const entities = parseMessageEntities(message, emotes, tags.emotes);
  const badges = htmlEntity.createBadges(
    tags.badges,
    globalBadges,
    channelBadges,
  );
  const card = getMessageCardFromEntities(entities, [
    isShowTwitchCards,
    isShowYoutubeCards,
  ]);

  return {
    type: 'message',
    id: tags.id,
    message,
    channel,
    entities,
    user: {
      id: tags.userId,
      login: user,
      displayName: tags.displayName,
      color: tags.color,
      badges,
    },
    timestamp: tags.tmiSentTs,
    card,
    isAction,
    isHistory: false,
    isDeleted: false,
    isHighlighted,
    isOwnMessage: false,
  };
};

export const normalizeNotice = ({
  message,
  channel,
  tags: { msgId },
}: twitchIrc.NoticeEvent): Notice => ({
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
    isOwnMessage: true,
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
  const parsedTags = (twitchIrc.parseMessageTags(
    tags,
  ) as unknown) as twitchIrc.MessageTags;

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
    isOwnMessage: false,
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
