import { parse } from 'tekko';

import {
  globalBadgesSelector,
  channelBadgesSelector,
} from '../reducers/badges/selectors';
import { emotesSelector } from '../reducers/emotes/selectors';
import {
  getIsAction,
  normalizeActionMessage,
  parseMessageTags,
} from './twitchChat';
import formatMessage from './formatMessage';
import getMessageBadges from './getMessageBadges';

const normalizeRecentMessages = (state, messages) => {
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);

  return messages
    .map((m) => parse(m))
    .filter((m) => m.command === 'PRIVMSG')
    .map(({ tags, params: [channel, message], prefix: { user } }) => {
      const isAction = getIsAction(message);
      const normalizedMessage = isAction
        ? normalizeActionMessage(message)
        : message;
      const parsedTags = parseMessageTags(tags);
      return {
        type: 'MESSAGE',
        message: normalizedMessage,
        messageArray: formatMessage(
          normalizedMessage,
          parsedTags.emotes,
          emotes,
        ),
        tags: parsedTags,
        badges: getMessageBadges(
          parsedTags.badges,
          globalBadges,
          channelBadges,
        ),
        user,
        channel: channel.slice(1),
        isAction,
        isHistory: true,
      };
    });
};

export default normalizeRecentMessages;
