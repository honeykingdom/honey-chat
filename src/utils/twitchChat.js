/* eslint-disable no-underscore-dangle */
import { EventEmitter } from 'events';
import { parse as tekkoParse, format as tekkoFormat } from 'tekko';
import camelCase from 'camel-case';

const chatUrl = 'wss://irc-ws.chat.twitch.tv:443';

const noopIRCCommands = [
  'CAP',
  '001',
  '002',
  '003',
  '004',
  '353',
  '366',
  '375',
  '372',
  '376',
];

const booleanMessageTags = [
  'mod',
  'emote-only',
  'r9k',
  'rituals',
  'subs-only',
  'msg-param-should-share-streak',
];

const numberMessageTags = [
  'ban-duration',
  'bits',
  'msg-param-cumulative-months',
  'msg-param-months',
  'msg-param-promo-gift-total',
  'msg-param-streak-months',
  'msg-param-viewerCount',
  'msg-param-threshold',
];

const depricatedMessageTags = ['subscriber', 'turbo', 'user-type'];

const parseMessageEmotes = (raw = '') => {
  if (!raw) return {};

  return raw.split('/').reduce((acc, emote) => {
    const [id, indexes] = emote.split(':');

    return {
      ...acc,
      [id]: indexes.split(',').map((index) => {
        const [start, end] = index.split('-');

        return {
          start: Number.parseInt(start, 10),
          end: Number.parseInt(end, 10),
        };
      }),
    };
  }, {});
};

const parseBadges = (data = '') => {
  if (!data) return {};

  return data.split(',').reduce((acc, badge) => {
    const [name, value] = badge.split('/');

    return {
      ...acc,
      [name]: value,
    };
  }, {});
};

const normalizeTagValue = (name, value) => {
  if (name === 'emotes') return parseMessageEmotes(value);
  if (name === 'badges') return parseBadges(value);
  if (name === 'badge-info') return parseBadges(value);

  if (name === 'followers-only') {
    let followersOnly = false;
    if (value === '-1') {
      followersOnly = false;
    } else if (value === '0') {
      followersOnly = true;
    } else if (typeof value === 'string') {
      followersOnly = parseInt(value, 10);
    }
    return followersOnly;
  }

  if (name === 'slow') {
    let slow = false;
    if (value === '0') {
      slow = false;
    } else if (typeof value === 'string') {
      slow = parseInt(value, 10);
    }
    return slow;
  }

  if (booleanMessageTags.includes(name)) return value === '1';
  if (numberMessageTags.includes(name)) return parseInt(value, 10);

  return value;
};

export const parseMessageTags = (data = {}) =>
  Object.entries(data)
    .filter(([key]) => !depricatedMessageTags.includes(key))
    .reduce((acc, [key, value]) => {
      return {
        ...acc,
        [camelCase(key)]: normalizeTagValue(key, value),
      };
    }, {});

export const isBroadcaster = (tags = {}) =>
  Object.prototype.hasOwnProperty.call(tags, 'broadcaster');

export const isMod = (tags = {}) =>
  Object.prototype.hasOwnProperty.call(tags, 'moderator');

export const isSub = (tags = {}) =>
  Object.prototype.hasOwnProperty.call(tags, 'subscriber');

export const isVIP = (tags = {}) =>
  Object.prototype.hasOwnProperty.call(tags, 'vip');

export const monthsSubbed = (tags = {}) => {
  const subbed = tags.subscriber;

  return subbed ? parseInt(subbed, 10) : 0;
};

export const getIsAction = (message) =>
  message.startsWith('\u0001ACTION ') && message.endsWith('\u0001');
export const normalizeActionMessage = (message) => message.slice(8, -1);

export const parseMessageData = ({
  raw,
  command,
  tags,
  middle: params,
  trailing: message,
  prefix,
}) => ({
  raw,
  command,
  tags: parseMessageTags(tags),
  params,
  message,
  prefix,
});

export const parseChatMessage = (data) => {
  const { message } = data;
  const isAction = getIsAction(message);

  return {
    ...data,
    message: isAction ? normalizeActionMessage(message) : message,
    isAction,
  };
};

class Client extends EventEmitter {
  socket;

  options;

  user;

  channels;

  _queue;

  constructor(opts = {}) {
    super();
    this.socket = null;
    this.channels = [];
    this.options = opts || {};
    this.user = null;
    this._queue = [];
  }

  _onConnect() {
    const { name, auth } = this.options.identity;
    this.sendRaw([
      'CAP REQ :twitch.tv/tags twitch.tv/commands',
      `PASS oauth:${auth}`,
      `NICK ${name}`,
    ]);
    this.emit('connected');
  }

  _onClose(hadError) {
    // TODO
    const willReconnect = false;
    this.emit('disconnected', { willReconnect, hadError });
    if (willReconnect) {
      this.connect();
    }
  }

  _onError(error) {
    // TODO
    this.emit('error', error);
  }

  _onData(rawData) {
    const data = rawData.trim().split('\r\n');
    data.forEach((line) => this._handleMessage(line));
  }

  _handleMessage(raw) {
    const parsedData = tekkoParse(raw);
    parsedData.raw = raw;
    const { command } = parsedData;

    if (command === 'PING') {
      this.sendRaw('PONG :tmi.twitch.tv');
      this.emit('ping');
      return;
    }

    if (parsedData.prefix && parsedData.prefix.user === 'jtv') {
      // console.log('JTV');
      // console.log(parsedData);
      return;
    }

    // noop
    if (noopIRCCommands.includes(command)) {
      return;
    }

    const data = parseMessageData(parsedData);

    if (command === 'PRIVMSG') {
      this.emit('message', data);
      return;
    }

    if (command === 'USERSTATE') {
      this.emit('userstate', data);
      return;
    }

    if (command === 'JOIN') {
      this.emit('join', data);
      return;
    }

    if (command === 'PART') {
      this.emit('part', data);
      return;
    }

    if (command === 'ROOMSTATE') {
      this.emit('roomstate', data);
      return;
    }

    if (command === 'GLOBALUSERSTATE') {
      this.user = data;

      while (this._queue.length) {
        const ircMessage = this._queue.shift();
        this.sendRaw(ircMessage);
      }

      this.emit('globaluserstate', { data });
      return;
    }

    this.emit('unhandled-command', data);
  }

  sendRaw(message) {
    const handleError = (err) => {
      if (err) {
        this.emit('error', err);
      }
    };

    if (Array.isArray(message)) {
      message.forEach((line) => this.socket.send(`${line}\r\n`, handleError));
    } else {
      this.socket.send(`${message}\r\n`, handleError);
    }
  }

  connect() {
    this.socket = new WebSocket(chatUrl);
    const { socket } = this;

    socket.addEventListener('open', () => this._onConnect());
    socket.addEventListener('close', (hadError) => this._onClose(hadError));
    socket.addEventListener('error', (error) => this._onError(error));
    socket.addEventListener('message', (data) => this._onData(data.data));
  }

  say(channel, message) {
    const ircMessage = tekkoFormat({
      command: 'PRIVMSG',
      middle: [channel],
      trailing: message,
    });
    this.sendRaw(ircMessage);
  }

  sendCommand(channel, command, params) {
    const commandParams = Array.isArray(params) ? params.join(' ') : params;
    const ircMessage = tekkoFormat({
      command: 'PRIVMSG',
      middle: [channel],
      trailing: `/${command} ${commandParams}`,
    });
    this.sendRaw(ircMessage);
  }

  join(roomName) {
    const ircMessage = tekkoFormat({
      command: 'JOIN',
      middle: [roomName],
    });

    if (!this.user) {
      this._queue.push(ircMessage);
    } else {
      this.sendRaw(ircMessage);
    }
  }

  part(roomName) {
    const ircMessage = tekkoFormat({
      command: 'PART',
      middle: [roomName],
    });

    if (!this.user) {
      this._queue.push(ircMessage);
    } else {
      this.sendRaw(ircMessage);
    }
  }
}

export default Client;
