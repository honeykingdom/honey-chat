import * as R from 'ramda';

import {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
  createEmoji,
  createMention,
  createLink,
} from 'features/chat/utils/htmlEntity';
import parseMessageEntities from 'features/chat/utils/parseMessageEntities';
import twitchEmotes from 'features/chat/mocks/twitchEmotes';
import bttvGlobal from 'features/chat/mocks/bttvGlobalEmotes';
import bttvChannel from 'features/chat/mocks/bttvChannelEmotes';
import ffzGlobal from 'features/chat/mocks/ffzGlobalEmotes';
import ffzChannel from 'features/chat/mocks/ffzChannelEmotes';
import {
  parseTwitchGlobalEmotes,
  parseTwitchChannelEmotes,
  parseBttvGlobalEmotes,
  parseBttvChannelEmotes,
  parseFfzGlobalEmotes,
  parseFfzChannelEmotes,
} from 'features/chat/utils/parseApiResponse';

const emotes = {
  twitchGlobal: parseTwitchGlobalEmotes(twitchEmotes),
  twitchUser: parseTwitchChannelEmotes(twitchEmotes),
  bttvGlobal: parseBttvGlobalEmotes(bttvGlobal),
  bttvChannel: parseBttvChannelEmotes(bttvChannel),
  ffzGlobal: parseFfzGlobalEmotes(ffzGlobal),
  ffzChannel: parseFfzChannelEmotes(ffzChannel),
};

const bttv = [...emotes.bttvGlobal, ...emotes.bttvChannel];
const ffz = [...emotes.ffzGlobal, ...emotes.ffzChannel];

const findBttvEmote = (name) => R.find(R.propEq('code', name), bttv);

const findFfzEmote = (name) => R.find(R.propEq('name', name), ffz);

const getEmojiUrl = (code) =>
  `https://twemoji.maxcdn.com/v/latest/72x72/${code}.png`;

it('should format emotes', () => {
  const message1 =
    'Kappa Keepo hey Kappa 4Head hello world :) KKona KKonaW Zappa EZ hey sumSmash';
  const message1Emotes = {
    '1': [{ start: 40, end: 41 }],
    '25': [
      { start: 0, end: 4 },
      { start: 16, end: 20 },
    ],
    '354': [{ start: 22, end: 26 }],
    '1902': [{ start: 6, end: 10 }],
  };

  const result1 = [
    createTwitchEmote({ id: 25, code: 'Kappa' }),
    ' ',
    createTwitchEmote({ id: 1902, code: 'Keepo' }),
    ' hey ',
    createTwitchEmote({ id: 25, code: 'Kappa' }),
    ' ',
    createTwitchEmote({ id: 354, code: '4Head' }),
    ' hello world ',
    createTwitchEmote({ id: 1, code: ':)' }),
    ' ',
    createBttvEmote(findBttvEmote('KKona')),
    ' ',
    createFfzEmote(findFfzEmote('KKonaW')),
    ' ',
    createBttvEmote(findBttvEmote('Zappa')),
    ' ',
    createBttvEmote(findBttvEmote('EZ')),
    ' hey ',
    createBttvEmote(findBttvEmote('sumSmash')),
  ];

  expect(parseMessageEntities(message1, emotes, message1Emotes)).toEqual(
    result1,
  );
});

it('should format emotes inside onw messages', () => {
  const message1 = 'Kappa Keepo hey KKona this is a test KKonaW';
  const message2 = 'R-) R) <3 >( o_O O.o';

  const result1 = [
    createTwitchEmote({ id: 25, code: 'Kappa' }),
    ' ',
    createTwitchEmote({ id: 1902, code: 'Keepo' }),
    ' hey ',
    createBttvEmote(findBttvEmote('KKona')),
    ' this is a test ',
    createFfzEmote(findFfzEmote('KKonaW')),
  ];
  const result2 = [
    createTwitchEmote({ id: 14, code: 'R-)' }),
    ' ',
    createTwitchEmote({ id: 14, code: 'R)' }),
    ' ',
    createTwitchEmote({ id: 9, code: '<3' }),
    ' ',
    createTwitchEmote({ id: 4, code: '>(' }),
    ' ',
    createTwitchEmote({ id: 6, code: 'o_O' }),
    ' ',
    createTwitchEmote({ id: 6, code: 'O.o' }),
  ];

  expect(
    parseMessageEntities(message1, emotes, null, { parseTwitch: true }),
  ).toEqual(result1);
  expect(
    parseMessageEntities(message2, emotes, null, { parseTwitch: true }),
  ).toEqual(result2);
});

it('should format emoji', () => {
  const message1 = '🤔 test';
  const message2 = 'test 😂 👌';
  const message3 = 'this is a 😡 test';
  const message4 = '😂👌';

  const result1 = [createEmoji('thinking', getEmojiUrl('1f914')), ' test'];
  const result2 = [
    'test ',
    createEmoji('joy', getEmojiUrl('1f602')),
    ' ',
    createEmoji('ok_hand', getEmojiUrl('1f44c')),
  ];
  const result3 = [
    'this is a ',
    createEmoji('rage', getEmojiUrl('1f621')),
    ' test',
  ];
  const result4 = ['😂👌'];

  expect(parseMessageEntities(message1, emotes, {})).toEqual(result1);
  expect(parseMessageEntities(message2, emotes, {})).toEqual(result2);
  expect(parseMessageEntities(message3, emotes, {})).toEqual(result3);
  expect(parseMessageEntities(message4, emotes, {})).toEqual(result4);
});

it('should format mensions', () => {
  const message1 = '@twitch hey';
  const message2 = 'hello @twitch, hey';
  const message3 = '@Twitch_TV @lirik hey @shroud, @summit1g, guys';

  const result1 = [createMention('@twitch', 'twitch'), ' hey'];
  const result2 = ['hello ', createMention('@twitch', 'twitch'), ', hey'];
  const result3 = [
    createMention('@Twitch_TV', 'twitch_tv'),
    ' ',
    createMention('@lirik', 'lirik'),
    ' hey ',
    createMention('@shroud', 'shroud'),
    ', ',
    createMention('@summit1g', 'summit1g'),
    ', guys',
  ];

  expect(parseMessageEntities(message1, emotes, {})).toEqual(result1);
  expect(parseMessageEntities(message2, emotes, {})).toEqual(result2);
  expect(parseMessageEntities(message3, emotes, {})).toEqual(result3);
});

it('should format links', () => {
  const message1 = 'google.com link';
  const message2 = 'http://google.com link';
  const message3 = 'test https://google.com/ link';
  const message4 = 'google.com/qwerty many yandex.ru/#qwerty links';
  const message5 = 'yandex.ru/helloworldприветмир#hello test';

  const result1 = [createLink('google.com'), ' link'];
  const result2 = [createLink('http://google.com'), ' link'];
  const result3 = ['test ', createLink('https://google.com/'), ' link'];
  const result4 = [
    createLink('google.com/qwerty'),
    ' many ',
    createLink('yandex.ru/#qwerty'),
    ' links',
  ];
  const result5 = [createLink('yandex.ru/helloworldприветмир#hello'), ' test'];

  expect(parseMessageEntities(message1, emotes, {})).toEqual(result1);
  expect(parseMessageEntities(message2, emotes, {})).toEqual(result2);
  expect(parseMessageEntities(message3, emotes, {})).toEqual(result3);
  expect(parseMessageEntities(message4, emotes, {})).toEqual(result4);
  expect(parseMessageEntities(message5, emotes, {})).toEqual(result5);
});

it('should format emotes (twitch, bttv, ffz), emoji, mention and link', () => {
  const message1 =
    'Hey Kappa KKona KKonaW hello world google.com 🤔 @test, message';
  const message1Emotes = { '25': [{ start: 4, end: 8 }] };
  const result1 = [
    'Hey ',
    createTwitchEmote({ id: 25, code: 'Kappa' }),
    ' ',
    createBttvEmote(findBttvEmote('KKona')),
    ' ',
    createFfzEmote(findFfzEmote('KKonaW')),
    ' hello world ',
    createLink('google.com'),
    ' ',
    createEmoji('thinking', getEmojiUrl('1f914')),
    ' ',
    createMention('@test', 'test'),
    ', message',
  ];

  expect(parseMessageEntities(message1, emotes, message1Emotes)).toEqual(
    result1,
  );
});
