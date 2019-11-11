/* eslint-disable no-underscore-dangle */
import R from 'ramda';
import { parse as tekkoParse } from 'tekko';

import Client, { parseMessageTags } from 'utils/twitchChat';

const createClient = () => {
  const client = new Client({ identity: {} });

  const socketSend = jest.fn().mockName('socketSend');

  client.socket = {};
  client.socket.send = socketSend;

  return client;
};

it('handle PING command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('ping', handleCommand);

  const message1 = 'PING';
  const result1 = 'PONG :tmi.twitch.tv\r\n';

  client._handleMessage(message1);

  expect(client.socket.send.mock.calls.length).toBe(1);
  expect(client.socket.send.mock.calls[0][0]).toBe(result1);
  expect(handleCommand.mock.calls.length).toBe(1);
});

it('handle PRIVMSG command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('message', handleCommand);

  const message1 = `@badge-info=;badges=broadcaster/1,glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emotes=25:13-17;flags=;id=6c39b700-7f77-405f-84ab-3cf45fbfd3a8;mod=0;room-id=38259425;subscriber=0;tmi-sent-ts=1573190538338;turbo=0;user-id=38259425;user-type= :dmitryscaletta!dmitryscaletta@dmitryscaletta.tmi.twitch.tv PRIVMSG #dmitryscaletta :Hello, world Kappa /`;
  const message2 = `@badge-info=;badges=broadcaster/1,glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emotes=;flags=;id=604ceb66-d047-4ad4-95f4-3eb2aaa26130;mod=0;room-id=38259425;subscriber=0;tmi-sent-ts=1573190975472;turbo=0;user-id=38259425;user-type= :dmitryscaletta!dmitryscaletta@dmitryscaletta.tmi.twitch.tv PRIVMSG #dmitryscaletta :\u0001ACTION Message with action\u0001`;

  const result1 = {
    message: 'Hello, world Kappa /',
    tags: parseMessageTags(tekkoParse(message1).tags),
    user: 'dmitryscaletta',
    channel: 'dmitryscaletta',
    isAction: false,
  };
  const result2 = {
    message: 'Message with action',
    tags: parseMessageTags(tekkoParse(message2).tags),
    user: 'dmitryscaletta',
    channel: 'dmitryscaletta',
    isAction: true,
  };

  client._handleMessage(message1);
  client._handleMessage(message2);

  expect(handleCommand.mock.calls.length).toBe(2);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(handleCommand.mock.calls[1].length).toBe(1);
  expect(handleCommand.mock.calls[1][0]).toEqual(result2);
});

it('handle GLOBALUSERSTATE command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('globaluserstate', handleCommand);

  const message1 = `@badge-info=;badges=glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emote-sets=0,33563;user-id=38259425;user-type= :tmi.twitch.tv GLOBALUSERSTATE`;

  const result1 = {
    tags: parseMessageTags(tekkoParse(message1).tags),
  };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(client.user).toEqual(result1.tags);
});

it('handle USERSTATE command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('userstate', handleCommand);

  const message1 = `@badge-info=;badges=broadcaster/1,glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emote-sets=0,33563;mod=0;subscriber=0;user-type= :tmi.twitch.tv USERSTATE #dmitryscaletta`;

  const result1 = {
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(client.channels[result1.channel].userState).toEqual(result1.tags);
});

it('handle ROOMSTATE command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('roomstate', handleCommand);

  const message1 = `@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=38259425;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #dmitryscaletta`;

  const result1 = {
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(client.channels[result1.channel].roomState).toEqual(result1.tags);
});

it('handle JOIN command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('join', handleCommand);

  const message1 = `JOIN #dmitryscaletta`;
  const result1 = { channel: 'dmitryscaletta' };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(client.channels[result1.channel]).toEqual({});
});

it('handle PART command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('part', handleCommand);

  const message1 = `PART #dmitryscaletta`;
  const result1 = { channel: 'dmitryscaletta' };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
});

it('handle NOTICE command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('notice', handleCommand);

  const message1 = `@msg-id=emote_only_on :tmi.twitch.tv NOTICE #dmitryscaletta :This room is now in emote-only mode.`;

  const result1 = {
    message: 'This room is now in emote-only mode.',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
});

it('handle USERNOTICE command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('usernotice', handleCommand);

  const message1 = `@badge-info=subscriber/3;badges=subscriber/3,premium/1;color=#19E3F5;display-name=LHEATHAL;emotes=;flags=;id=b5343497-bce7-489b-a2c4-947e5cf2d5cd;login=lheathal;mod=0;msg-id=resub;msg-param-cumulative-months=3;msg-param-months=0;msg-param-should-share-streak=1;msg-param-streak-months=1;msg-param-sub-plan-name=Channel\\sSubscription\\s(sodapoppin);msg-param-sub-plan=Prime;room-id=26301881;subscriber=1;system-msg=LHEATHAL\\ssubscribed\\swith\\sTwitch\\sPrime.\\sThey've\\ssubscribed\\sfor\\s3\\smonths,\\scurrently\\son\\sa\\s1\\smonth\\sstreak!;tmi-sent-ts=1573195468132;user-id=48034331;user-type= :tmi.twitch.tv USERNOTICE #sodapoppin :yeee`;
  const message2 = `@badge-info=subscriber/0;badges=subscriber/0,premium/1;color=#8A2BE2;display-name=jaythaden;emotes=;flags=;id=3f6415cc-9ba4-4545-8b01-2992467b3da7;login=jaythaden;mod=0;msg-id=sub;msg-param-cumulative-months=1;msg-param-months=0;msg-param-should-share-streak=0;msg-param-sub-plan-name=Channel\\sSubscription\\s(sodapoppin);msg-param-sub-plan=Prime;room-id=26301881;subscriber=1;system-msg=jaythaden\\ssubscribed\\swith\\sTwitch\\sPrime.;tmi-sent-ts=1573195737406;user-id=48805272;user-type= :tmi.twitch.tv USERNOTICE #sodapoppin`;

  const result1 = {
    message: 'yeee',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'sodapoppin',
  };
  const result2 = {
    message: undefined,
    tags: parseMessageTags(tekkoParse(message2).tags),
    channel: 'sodapoppin',
  };

  client._handleMessage(message1);
  client._handleMessage(message2);

  expect(handleCommand.mock.calls.length).toBe(2);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(handleCommand.mock.calls[1].length).toBe(1);
  expect(handleCommand.mock.calls[1][0]).toEqual(result2);
});

it('handle CLEARCHAT command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('clearchat', handleCommand);

  const message1 = `@ban-duration=600;room-id=38259425;target-user-id=471434202;tmi-sent-ts=1573199604283 :tmi.twitch.tv CLEARCHAT #dmitryscaletta :honeykingdombot`;
  const message2 = `@room-id=38259425;tmi-sent-ts=1573205186559 :tmi.twitch.tv CLEARCHAT #dmitryscaletta`;

  const result1 = {
    message: 'honeykingdombot',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };
  const result2 = {
    message: undefined,
    tags: parseMessageTags(tekkoParse(message2).tags),
    channel: 'dmitryscaletta',
  };

  client._handleMessage(message1);
  client._handleMessage(message2);

  expect(handleCommand.mock.calls.length).toBe(2);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(handleCommand.mock.calls[1].length).toBe(1);
  expect(handleCommand.mock.calls[1][0]).toEqual(result2);
});

it('handle CLEARMSG command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('clearmsg', handleCommand);

  const message1 = `@login=honeykingdombot;room-id=;target-msg-id=9a808ad3-59b7-4849-953c-da11d9c2c9a8;tmi-sent-ts=1573205643267 :tmi.twitch.tv CLEARMSG #dmitryscaletta :Hello :)`;

  const result1 = {
    message: 'Hello :)',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
});

it('handle HOSTTARGET command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('hosttarget', handleCommand);

  const message1 = `:tmi.twitch.tv HOSTTARGET #dmitryscaletta :lasqa 0`;
  const message2 = `:tmi.twitch.tv HOSTTARGET #dmitryscaletta :- 0`;

  const result1 = {
    message: 'lasqa 0',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };
  const result2 = {
    message: '- 0',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'dmitryscaletta',
  };

  client._handleMessage(message1);
  client._handleMessage(message2);

  expect(handleCommand.mock.calls.length).toBe(2);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
  expect(handleCommand.mock.calls[1].length).toBe(1);
  expect(handleCommand.mock.calls[1][0]).toEqual(result2);
});

it('handle WHISPER command', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('whisper', handleCommand);

  const message1 = `@badges=glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emotes=25:6-10;message-id=3;thread-id=38259425_471434202;turbo=0;user-id=38259425;user-type= :dmitryscaletta!dmitryscaletta@dmitryscaletta.tmi.twitch.tv WHISPER honeykingdombot :Hello Kappa /`;

  const result1 = {
    message: 'Hello Kappa /',
    tags: parseMessageTags(tekkoParse(message1).tags),
    channel: 'honeykingdombot',
    user: 'dmitryscaletta',
  };

  client._handleMessage(message1);

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(result1);
});

it('sends a message', () => {
  const client = createClient();
  const handleCommand = jest.fn();

  client.on('ownmessage', handleCommand);

  const message101 = ':tmi.twitch.tv 001 dmitryscaletta :Welcome, GLHF!';
  const globalUserState = `@badge-info=;badges=glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emote-sets=0,33563;user-id=38259425;user-type= :tmi.twitch.tv GLOBALUSERSTATE`;
  const userState = `@badge-info=;badges=broadcaster/1,glhf-pledge/1;color=#1E90FF;display-name=DmitryScaletta;emote-sets=0,33563;mod=0;subscriber=0;user-type= :tmi.twitch.tv USERSTATE #dmitryscaletta`;

  const noticeWithMessageError = `@msg-id=msg_ratelimit :tmi.twitch.tv NOTICE #dmitryscaletta :Your message was not sent because you are sending messages too quickly.`;

  const message1 = 'Hello world!';
  const sendedResult = `PRIVMSG #dmitryscaletta :${message1}\r\n`;
  const eventResult1 = {
    message: message1,
    tags: {
      ...R.omit('emote-sets', parseMessageTags(tekkoParse(userState).tags)),
      id: null,
      tmiSentTs: null,
      userId: parseMessageTags(tekkoParse(globalUserState).tags).userId,
    },
    user: 'dmitryscaletta',
    channel: 'dmitryscaletta',
    isAction: false,
  };

  // initialize channel with some data
  client._handleMessage(message101);
  client._handleMessage(globalUserState);
  client._handleMessage(userState);

  // should not sent an empty message
  client.say('dmitryscaletta', '');

  // message was sent successfully
  client.say('dmitryscaletta', message1);
  client._handleMessage(userState);

  // message wasn't sent
  client.say('dmitryscaletta', message1);
  client._handleMessage(noticeWithMessageError);

  // randomly generated values
  handleCommand.mock.calls[0][0].tags.id = null;
  handleCommand.mock.calls[0][0].tags.tmiSentTs = null;

  expect(handleCommand.mock.calls.length).toBe(1);
  expect(handleCommand.mock.calls[0].length).toBe(1);
  expect(handleCommand.mock.calls[0][0]).toEqual(eventResult1);

  expect(client.socket.send.mock.calls.length).toBe(2);
  expect(client.socket.send.mock.calls[0][0]).toBe(sendedResult);
  expect(client.socket.send.mock.calls[1][0]).toBe(sendedResult);
});
