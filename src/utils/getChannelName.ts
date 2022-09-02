import type { Message } from 'ircv3';

const getIrcChannelName = (msg: Message) =>
  (msg as any)._params[0].value.slice(1);

export default getIrcChannelName;
