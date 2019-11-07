import R from 'ramda';
import formatMessage, {
  createTwitchEmote,
  createBttvEmote,
  createFfzEmote,
  createEmoji,
  createMention,
  createLink,
} from './formatMessage';
import * as emotes from './mocks/emotes';

const findFfzEmote = (name) => R.find(R.propEq('name', name), emotes.ffz);
const getEmojiUrl = (code) => `https://twemoji.maxcdn.com/2/72x72/${code}.png`;

it('format emotes', () => {
  const message1 =
    'Kappa Keepo hey Kappa 4Head hello world :) KKona KKonaW Zappa EZ hey sumSmash';
  const message1Emotes = {
    '1': [{ start: 40, end: 41 }],
    '25': [{ start: 0, end: 4 }, { start: 16, end: 20 }],
    '354': [{ start: 22, end: 26 }],
    '1902': [{ start: 6, end: 10 }],
  };

  const result1 = [
    createTwitchEmote('Kappa', 25),
    ' ',
    createTwitchEmote('Keepo', 1902),
    ' hey ',
    createTwitchEmote('Kappa', 25),
    ' ',
    createTwitchEmote('4Head', 354),
    ' hello world ',
    createTwitchEmote(':)', 1),
    ' ',
    createBttvEmote('KKona', { id: '566ca04265dbbdab32ec054a' }),
    ' ',
    createFfzEmote('KKonaW', { urls: findFfzEmote('KKonaW').urls }),
    ' ',
    createBttvEmote('Zappa', { id: '5622aaef3286c42e57d8e4ab' }),
    ' ',
    createBttvEmote('EZ', { id: '5590b223b344e2c42a9e28e3' }),
    ' hey ',
    createBttvEmote('sumSmash', { id: '5af84b9e766af63db43bf6b9' }),
  ];

  expect(formatMessage(message1, message1Emotes, emotes)).toEqual(result1);
});

it('format emotes inside onw messages', () => {
  const message1 = 'Kappa Keepo hey KKona this is a test KKonaW';

  const result1 = [
    createTwitchEmote('Kappa', 25),
    ' ',
    createTwitchEmote('Keepo', 1902),
    ' hey ',
    createBttvEmote('KKona', { id: '566ca04265dbbdab32ec054a' }),
    ' this is a test ',
    createFfzEmote('KKonaW', { urls: findFfzEmote('KKonaW').urls }),
  ];

  expect(formatMessage(message1, null, emotes)).toEqual(result1);
});

it('format emoji', () => {
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

  expect(formatMessage(message1, {}, emotes)).toEqual(result1);
  expect(formatMessage(message2, {}, emotes)).toEqual(result2);
  expect(formatMessage(message3, {}, emotes)).toEqual(result3);
  expect(formatMessage(message4, {}, emotes)).toEqual(result4);
});

it('format mensions', () => {
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

  expect(formatMessage(message1, {}, emotes)).toEqual(result1);
  expect(formatMessage(message2, {}, emotes)).toEqual(result2);
  expect(formatMessage(message3, {}, emotes)).toEqual(result3);
});

it('format links', () => {
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

  expect(formatMessage(message1, {}, emotes)).toEqual(result1);
  expect(formatMessage(message2, {}, emotes)).toEqual(result2);
  expect(formatMessage(message3, {}, emotes)).toEqual(result3);
  expect(formatMessage(message4, {}, emotes)).toEqual(result4);
  expect(formatMessage(message5, {}, emotes)).toEqual(result5);
});

it('format emotes (twitch, bttv, ffz), emoji, mention and link', () => {
  const message1 =
    'Hey Kappa KKona KKonaW hello world google.com 🤔 @test, message';
  const message1Emotes = { '25': [{ start: 4, end: 8 }] };
  const result1 = [
    'Hey ',
    createTwitchEmote('Kappa', 25),
    ' ',
    createBttvEmote('KKona', { id: '566ca04265dbbdab32ec054a' }),
    ' ',
    createFfzEmote('KKonaW', { urls: findFfzEmote('KKonaW').urls }),
    ' hello world ',
    createLink('google.com'),
    ' ',
    createEmoji('thinking', getEmojiUrl('1f914')),
    ' ',
    createMention('@test', 'test'),
    ', message',
  ];

  expect(formatMessage(message1, message1Emotes, emotes)).toEqual(result1);
});
