import uuid from 'uuid/v4';

const createOwnMessage = (message, tags, channel, user, userId) => {
  if (typeof message !== 'string') return {};

  const isAction = message.startsWith('/me ');

  return {
    message: isAction ? message.slice(4) : message,
    tags: {
      ...tags,
      id: uuid(),
      tmiSentTs: new Date().getTime(),
      userId,
    },
    user,
    channel,
    isAction,
  };
};

export default createOwnMessage;
