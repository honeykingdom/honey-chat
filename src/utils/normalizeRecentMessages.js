import { parse } from 'tekko';

import {
  globalBadgesSelector,
  channelBadgesSelector,
} from 'reducers/badges/selectors';
import { emotesSelector } from 'reducers/emotes/selectors';
import { blockedUsersSelector } from 'reducers/chat/selectors';
import { MESSAGE_TYPES } from 'utils/constants';
import {
  getIsAction,
  normalizeActionMessage,
  parseMessageTags,
} from 'twitch-simple-irc';
import formatMessage from 'utils/formatMessage';
import createBadges from 'utils/createBadges';

const normalizeRecentMessages = (state, messages) => {
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);
  const blockedUsers = blockedUsersSelector(state);

  const filterMessages = ({ command, prefix: { user } }) =>
    command === 'PRIVMSG' && !blockedUsers.includes(user);

  const normalizeMessages = ({
    tags,
    params: [channel, message],
    prefix: { user },
  }) => {
    const isAction = getIsAction(message);
    const normalizedMessage = isAction
      ? normalizeActionMessage(message)
      : message;
    const parsedTags = parseMessageTags(tags);

    return {
      type: MESSAGE_TYPES.MESSAGE,
      message: normalizedMessage,
      messageArray: formatMessage(normalizedMessage, parsedTags.emotes, emotes),
      tags: parsedTags,
      badges: createBadges(parsedTags.badges, globalBadges, channelBadges),
      user,
      channel: channel.slice(1),
      isAction,
      isHistory: true,
    };
  };

  return messages
    .map((m) => parse(m))
    .filter(filterMessages)
    .map(normalizeMessages);
};

export default normalizeRecentMessages;
