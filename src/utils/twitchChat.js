/* eslint-disable no-underscore-dangle */
import { pathOr, omit, mergeDeepRight, mergeDeepWith, concat } from 'ramda';
import { EventEmitter } from 'events';
import { parse as tekkoParse, format as tekkoFormat } from 'tekko';
import camelCase from 'camel-case';
import uuid from 'uuid/v4';

const chatUrl = 'wss://irc-ws.chat.twitch.tv:443';

const noopIRCCommands = [
  'CAP',
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

const noticeMessageTags = [
  'msg_banned',
  'msg_bad_characters',
  'msg_channel_blocked',
  'msg_channel_suspended',
  'msg_duplicate',
  'msg_emoteonly',
  'msg_facebook',
  'msg_followersonly',
  'msg_followersonly_followed',
  'msg_followersonly_zero',
  'msg_r9k',
  'msg_ratelimit',
  'msg_rejected',
  'msg_rejected_mandatory',
  'msg_room_not_found',
  'msg_slowmode',
  'msg_subsonly',
  'msg_suspended',
  'msg_timedout',
  'msg_verified_email',
];

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

  if (typeof value === 'string') {
    return value.replace('\\s', ' ');
  }

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

export const parseChatMessage = ({
  message,
  tags,
  params,
  prefix: { user },
}) => {
  const isAction = getIsAction(message);

  return {
    message: isAction ? normalizeActionMessage(message) : message,
    tags,
    user,
    channel: params[0].slice(1),
    isAction,
  };
};

const parseGlobalUserState = ({ tags }) => ({ tags });
const parseState = ({ tags, params: [channel] }) => ({
  tags,
  channel: channel.slice(1),
});
const parseUserState = parseState;
const parseRoomState = parseState;

const parseCommand = ({ message, tags, params: [channel] }) => ({
  message,
  tags,
  channel: channel.slice(1),
});
const parseNotice = parseCommand;
const parseUserNotice = parseCommand;
const parseClearMessage = parseCommand;
const parseClearChat = parseCommand;
const parseHostTarget = parseCommand;

const parseWhisper = ({
  message,
  tags,
  params: [channel],
  prefix: { user },
}) => ({
  message,
  tags,
  channel,
  user,
});

class Client extends EventEmitter {
  socket;

  options;

  user;

  channels;

  _queue;

  _messagesQueue;

  constructor(options = {}) {
    super();
    this.socket = null;
    this.channels = {};
    this.options = options;
    this.user = null;
    this._queue = [];
    this._messagesQueue = {};
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

  _emmitOwnMessage(tags, channel) {
    const message = pathOr([], ['_messagesQueue', channel], this).shift();

    if (typeof message !== 'string') return;

    const isAction = message.startsWith('/me ');
    const messageEventData = {
      message: isAction ? message.slice(4) : message,
      tags: {
        ...tags,
        id: uuid(),
        tmiSentTs: new Date().getTime(),
        userId: this.user.userId,
      },
      user: this.options.identity.name,
      channel,
      isAction,
    };

    this.emit('ownmessage', messageEventData);
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

    if (command === '001') {
      const name = parsedData.params[0];
      this.options.identity.name = name;
      return;
    }

    // noop
    if (noopIRCCommands.includes(command)) {
      return;
    }

    const data = parseMessageData(parsedData);
    const channel = pathOr('', ['params', 0], data).slice(1);

    // Sends a message to a channel
    if (command === 'PRIVMSG') {
      const eventData = parseChatMessage(data);
      this.emit('message', eventData);
      return;
    }

    // Sends user-state data when a user joins a channel or sends a PRIVMSG to a channel
    if (command === 'USERSTATE') {
      const eventData = parseUserState(data);

      this.channels = mergeDeepRight(this.channels, {
        [channel]: { userState: eventData.tags },
      });

      const isSendedAfterPrivateMessage =
        pathOr(0, ['_messagesQueue', channel, 'length'], this) > 0;

      if (isSendedAfterPrivateMessage) {
        this._emmitOwnMessage(eventData.tags, channel);
      }

      this.emit('userstate', eventData);
      return;
    }

    if (command === 'JOIN') {
      const eventData = { channel };
      this.channels = mergeDeepRight(this.channels, { [channel]: {} });
      this.emit('join', eventData);
      return;
    }

    if (command === 'PART') {
      const eventData = { channel };
      this.channels = omit([channel], this.channels);
      this.emit('part', eventData);
      return;
    }

    if (command === 'ROOMSTATE') {
      const eventData = parseRoomState(data);
      this.channels = mergeDeepRight(this.channels, {
        [channel]: { roomState: eventData.tags },
      });
      this.emit('roomstate', eventData);
      return;
    }

    if (command === 'NOTICE') {
      const eventData = parseNotice(data);

      // Last message was not sent
      if (noticeMessageTags.includes(data.tags.msgId)) {
        pathOr([], ['_messagesQueue', channel], this).shift();
      }

      this.emit('notice', eventData);
      return;
    }

    if (command === 'USERNOTICE') {
      const eventData = parseUserNotice(data);
      this.emit('usernotice', eventData);
      return;
    }

    if (command === 'CLEARCHAT') {
      const eventData = parseClearChat(data);
      this.emit('clearchat', eventData);
      return;
    }

    if (command === 'CLEARMSG') {
      const eventData = parseClearMessage(data);
      this.emit('clearmsg', eventData);
      return;
    }

    if (command === 'HOSTTARGET') {
      const eventData = parseHostTarget(data);
      this.emit('hosttarget', eventData);
      return;
    }

    if (command === 'WHISPER') {
      const eventData = parseWhisper(data);
      this.emit('whisper', eventData);
      return;
    }

    if (command === 'GLOBALUSERSTATE') {
      const eventData = parseGlobalUserState(data);
      this.user = eventData.tags;

      while (this._queue.length) {
        const ircMessage = this._queue.shift();
        this.sendRaw(ircMessage);
      }

      this.emit('globaluserstate', eventData);
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
    // TODO: check if conected to the channel before send

    if (!message) return;

    const ircMessage = tekkoFormat({
      command: 'PRIVMSG',
      middle: [`#${channel}`],
      trailing: message,
    });
    this.sendRaw(ircMessage);

    this._messagesQueue = mergeDeepWith(concat, this._messagesQueue, {
      [channel]: [message],
    });
  }

  sendCommand(channel, command, params) {
    const commandParams = Array.isArray(params) ? params.join(' ') : params;
    const ircMessage = tekkoFormat({
      command: 'PRIVMSG',
      middle: [`#${channel}`],
      trailing: `/${command} ${commandParams}`,
    });
    this.sendRaw(ircMessage);
  }

  join(roomName) {
    const ircMessage = tekkoFormat({
      command: 'JOIN',
      middle: [`#${roomName}`],
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
      middle: [`#${roomName}`],
    });

    if (!this.user) {
      this._queue.push(ircMessage);
    } else {
      this.sendRaw(ircMessage);
    }
  }
}

export default Client;
