import {
  emotes,
  findTwitchEmote,
  findBttvEmote,
  findFfzEmote,
  getEmojiUrl,
} from 'mocks';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import parseMessageEntities from 'features/chat/utils/parseMessageEntities';

describe('parse message entities', () => {
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
    ];

    expect(parseMessageEntities(message1, emotes, message1Emotes)).toEqual(
      result1,
    );
  });

  it('should format emotes inside onw messages', () => {
    const message1 = 'Kappa Keepo hey KKona this is a test KKonaW';
    const message2 = 'R-) R) <3 >( o_O O.o';

    const result1 = [
      findTwitchEmote('Kappa'),
      ' ',
      findTwitchEmote('Keepo'),
      ' hey ',
      findBttvEmote('KKona'),
      ' this is a test ',
      findFfzEmote('KKonaW'),
    ];
    const result2 = [
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
    ];

    expect(parseMessageEntities(message1, emotes, null, true)).toEqual(result1);
    expect(parseMessageEntities(message2, emotes, null, true)).toEqual(result2);
  });

  it('should format emoji', () => {
    const message1 = '🤔 test';
    const message2 = 'test 😂 👌';
    const message3 = 'this is a 😡 test';
    const message4 = '😂👌';

    const result1 = [
      htmlEntity.createEmoji('thinking', getEmojiUrl('1f914')),
      ' test',
    ];
    const result2 = [
      'test ',
      htmlEntity.createEmoji('joy', getEmojiUrl('1f602')),
      ' ',
      htmlEntity.createEmoji('ok_hand', getEmojiUrl('1f44c')),
    ];
    const result3 = [
      'this is a ',
      htmlEntity.createEmoji('rage', getEmojiUrl('1f621')),
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

    const result1 = [htmlEntity.createMention('@twitch', 'twitch'), ' hey'];
    const result2 = [
      'hello ',
      htmlEntity.createMention('@twitch', 'twitch'),
      ', hey',
    ];
    const result3 = [
      htmlEntity.createMention('@Twitch_TV', 'twitch_tv'),
      ' ',
      htmlEntity.createMention('@lirik', 'lirik'),
      ' hey ',
      htmlEntity.createMention('@shroud', 'shroud'),
      ', ',
      htmlEntity.createMention('@summit1g', 'summit1g'),
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

    const result1 = [htmlEntity.createLink('google.com'), ' link'];
    const result2 = [htmlEntity.createLink('http://google.com'), ' link'];
    const result3 = [
      'test ',
      htmlEntity.createLink('https://google.com/'),
      ' link',
    ];
    const result4 = [
      htmlEntity.createLink('google.com/qwerty'),
      ' many ',
      htmlEntity.createLink('yandex.ru/#qwerty'),
      ' links',
    ];
    const result5 = [
      htmlEntity.createLink('yandex.ru/helloworldприветмир#hello'),
      ' test',
    ];

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
    ];

    expect(parseMessageEntities(message1, emotes, message1Emotes)).toEqual(
      result1,
    );
  });
});
