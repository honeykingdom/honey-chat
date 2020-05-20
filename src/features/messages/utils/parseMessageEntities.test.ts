import {
  emotes,
  findTwitchEmote,
  findBttvEmote,
  findFfzEmote,
  getEmojiUrl,
} from 'mocks';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import parseMessageEntities from 'features/messages/utils/parseMessageEntities';

describe('parse message entities', () => {
  it('should format emotes', () => {
    expect(
      parseMessageEntities(
        'Kappa Keepo hey Kappa 4Head hello world :) KKona KKonaW Zappa EZ hey sumSmash',
        emotes,
        {
          '1': [{ start: 40, end: 41 }],
          '25': [
            { start: 0, end: 4 },
            { start: 16, end: 20 },
          ],
          '354': [{ start: 22, end: 26 }],
          '1902': [{ start: 6, end: 10 }],
        },
      ),
    ).toEqual([
      findTwitchEmote('Kappa'),
      ' ',
      findTwitchEmote('Keepo'),
      ' hey ',
      findTwitchEmote('Kappa'),
      ' ',
      findTwitchEmote('4Head'),
      ' hello world ',
      findTwitchEmote(':)'),
      ' ',
      findBttvEmote('KKona'),
      ' ',
      findFfzEmote('KKonaW'),
      ' ',
      findBttvEmote('Zappa'),
      ' ',
      findBttvEmote('EZ'),
      ' hey ',
      findBttvEmote('sumSmash'),
    ]);
  });

  it('should format emotes inside onw messages', () => {
    expect(
      parseMessageEntities(
        'Kappa Keepo hey KKona this is a test KKonaW',
        emotes,
        null,
        true,
      ),
    ).toEqual([
      findTwitchEmote('Kappa'),
      ' ',
      findTwitchEmote('Keepo'),
      ' hey ',
      findBttvEmote('KKona'),
      ' this is a test ',
      findFfzEmote('KKonaW'),
    ]);

    expect(
      parseMessageEntities('R-) R) <3 >( o_O O.o', emotes, null, true),
    ).toEqual([
      htmlEntity.createTwitchEmote({ id: 14, code: 'R)' }),
      ' ',
      htmlEntity.createTwitchEmote({ id: 14, code: 'R)' }),
      ' ',
      htmlEntity.createTwitchEmote({ id: 9, code: '<3' }),
      ' ',
      htmlEntity.createTwitchEmote({ id: 4, code: '>(' }),
      ' ',
      htmlEntity.createTwitchEmote({ id: 6, code: 'O_o' }),
      ' ',
      htmlEntity.createTwitchEmote({ id: 6, code: 'O_o' }),
    ]);
  });

  it('should format emoji', () => {
    expect(parseMessageEntities('🤔 test', emotes, {})).toEqual([
      htmlEntity.createEmoji('thinking', getEmojiUrl('1f914')),
      ' test',
    ]);

    expect(parseMessageEntities('test 😂 👌', emotes, {})).toEqual([
      'test ',
      htmlEntity.createEmoji('joy', getEmojiUrl('1f602')),
      ' ',
      htmlEntity.createEmoji('ok_hand', getEmojiUrl('1f44c')),
    ]);

    expect(parseMessageEntities('this is a 😡 test', emotes, {})).toEqual([
      'this is a ',
      htmlEntity.createEmoji('rage', getEmojiUrl('1f621')),
      ' test',
    ]);

    expect(parseMessageEntities('😂👌', emotes, {})).toEqual(['😂👌']);
  });

  it('should format mensions', () => {
    expect(parseMessageEntities('@twitch hey', emotes, {})).toEqual([
      htmlEntity.createMention('@twitch', 'twitch'),
      ' hey',
    ]);

    expect(parseMessageEntities('hello @twitch, hey', emotes, {})).toEqual([
      'hello ',
      htmlEntity.createMention('@twitch', 'twitch'),
      ', hey',
    ]);

    expect(
      parseMessageEntities(
        '@Twitch_TV @lirik hey @shroud, @summit1g, guys',
        emotes,
        {},
      ),
    ).toEqual([
      htmlEntity.createMention('@Twitch_TV', 'twitch_tv'),
      ' ',
      htmlEntity.createMention('@lirik', 'lirik'),
      ' hey ',
      htmlEntity.createMention('@shroud', 'shroud'),
      ', ',
      htmlEntity.createMention('@summit1g', 'summit1g'),
      ', guys',
    ]);
  });

  it('should format links', () => {
    expect(parseMessageEntities('google.com link', emotes, {})).toEqual([
      htmlEntity.createLink('google.com'),
      ' link',
    ]);

    expect(parseMessageEntities('http://google.com link', emotes, {})).toEqual([
      htmlEntity.createLink('http://google.com'),
      ' link',
    ]);

    expect(
      parseMessageEntities('test https://google.com/ link', emotes, {}),
    ).toEqual(['test ', htmlEntity.createLink('https://google.com/'), ' link']);

    expect(
      parseMessageEntities(
        'google.com/qwerty many yandex.ru/#qwerty links',
        emotes,
        {},
      ),
    ).toEqual([
      htmlEntity.createLink('google.com/qwerty'),
      ' many ',
      htmlEntity.createLink('yandex.ru/#qwerty'),
      ' links',
    ]);

    expect(
      parseMessageEntities(
        'yandex.ru/helloworldприветмир#hello test',
        emotes,
        {},
      ),
    ).toEqual([
      htmlEntity.createLink('yandex.ru/helloworldприветмир#hello'),
      ' test',
    ]);
  });

  it('should format emotes (twitch, bttv, ffz), emoji, mention and link', () => {
    expect(
      parseMessageEntities(
        'Hey Kappa KKona KKonaW hello world google.com 🤔 @test, message',
        emotes,
        { '25': [{ start: 4, end: 8 }] },
      ),
    ).toEqual([
      'Hey ',
      findTwitchEmote('Kappa'),
      ' ',
      findBttvEmote('KKona'),
      ' ',
      findFfzEmote('KKonaW'),
      ' hello world ',
      htmlEntity.createLink('google.com'),
      ' ',
      htmlEntity.createEmoji('thinking', getEmojiUrl('1f914')),
      ' ',
      htmlEntity.createMention('@test', 'test'),
      ', message',
    ]);
  });
});
