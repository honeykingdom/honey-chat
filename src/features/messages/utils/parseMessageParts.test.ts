import {
  emotes,
  messagePartTwitchEmote,
  messagePartBttvEmote,
  messagePartFfzEmote,
  messagePartEmoji,
  messagePartLink,
  messagePartMention,
  messagePartText,
} from 'mocks';
import { MessagePartType } from '../messagesConstants';
import parseMessageEntities from './createMessageParts';

describe('parse message entities', () => {
  it('should parse emotes', () => {
    expect(
      parseMessageEntities(
        'Kappa Keepo hey Kappa 4Head hello world :) KKona KKonaW GabeN EZ hey FeelsRainMan',
        emotes,
        '25:0-4,16-20/1902:6-10/354:22-26/1:40-41',
      ),
    ).toEqual([
      messagePartTwitchEmote('Kappa'),
      messagePartText(' '),
      messagePartTwitchEmote('Keepo'),
      messagePartText(' hey '),
      messagePartTwitchEmote('Kappa'),
      messagePartText(' '),
      messagePartTwitchEmote('4Head'),
      messagePartText(' hello world '),
      messagePartTwitchEmote(':)'),
      messagePartText(' '),
      messagePartBttvEmote('KKona'),
      messagePartText(' '),
      messagePartFfzEmote('KKonaW'),
      messagePartText(' '),
      messagePartBttvEmote('GabeN'),
      messagePartText(' '),
      messagePartBttvEmote('EZ'),
      messagePartText(' hey '),
      messagePartBttvEmote('FeelsRainMan'),
    ]);
    expect(
      parseMessageEntities('cakeMugi1_SG', emotes, '153301_SG:0-11'),
    ).toEqual([{ type: MessagePartType.TWITCH_EMOTE, content: '153301_SG' }]);
  });

  it('should parse emotes inside onw messages', () => {
    expect(
      parseMessageEntities(
        'Kappa Keepo hey KKona this is a test KKonaW',
        emotes,
        '',
        true,
      ),
    ).toEqual([
      messagePartTwitchEmote('Kappa'),
      messagePartText(' '),
      messagePartTwitchEmote('Keepo'),
      messagePartText(' hey '),
      messagePartBttvEmote('KKona'),
      messagePartText(' this is a test '),
      messagePartFfzEmote('KKonaW'),
    ]);

    expect(
      parseMessageEntities(':) :-) :( :-( B) B-)', emotes, '', true),
    ).toEqual([
      messagePartTwitchEmote(':)'),
      messagePartText(' '),
      messagePartTwitchEmote(':-)'),
      messagePartText(' '),
      messagePartTwitchEmote(':('),
      messagePartText(' '),
      messagePartTwitchEmote(':-('),
      messagePartText(' '),
      messagePartTwitchEmote('B)'),
      messagePartText(' '),
      messagePartTwitchEmote('B-)'),
    ]);
  });

  it('should parse emoji', () => {
    expect(parseMessageEntities('🤔 test', emotes)).toEqual([
      messagePartEmoji('🤔'),
      messagePartText(' test'),
    ]);

    expect(parseMessageEntities('test 😂 👌', emotes)).toEqual([
      messagePartText('test '),
      messagePartEmoji('😂'),
      messagePartText(' '),
      messagePartEmoji('👌'),
    ]);

    expect(parseMessageEntities('this is a 😡 test', emotes)).toEqual([
      messagePartText('this is a '),
      messagePartEmoji('😡'),
      messagePartText(' test'),
    ]);

    expect(parseMessageEntities('😂👌', emotes)).toEqual([
      messagePartText('😂👌'),
    ]);
  });

  it('should parse mentions', () => {
    expect(parseMessageEntities('@twitch hey', emotes)).toEqual([
      messagePartMention('@twitch', 'twitch'),
      messagePartText(' hey'),
    ]);

    expect(parseMessageEntities('hey @twitch,', emotes)).toEqual([
      messagePartText('hey '),
      messagePartMention('@twitch', 'twitch'),
      messagePartText(','),
    ]);

    expect(parseMessageEntities('hello @twitch, hey', emotes)).toEqual([
      messagePartText('hello '),
      messagePartMention('@twitch', 'twitch'),
      messagePartText(', hey'),
    ]);

    expect(
      parseMessageEntities(
        '@Twitch_TV @lirik hey @shroud, @summit1g, guys',
        emotes,
      ),
    ).toEqual([
      messagePartMention('@Twitch_TV', 'twitch_tv'),
      messagePartText(' '),
      messagePartMention('@lirik', 'lirik'),
      messagePartText(' hey '),
      messagePartMention('@shroud', 'shroud'),
      messagePartText(', '),
      messagePartMention('@summit1g', 'summit1g'),
      messagePartText(', guys'),
    ]);
  });

  it('should parse links', () => {
    expect(parseMessageEntities('google.com link', emotes)).toEqual([
      messagePartLink('google.com'),
      messagePartText(' link'),
    ]);

    expect(parseMessageEntities('http://google.com link', emotes)).toEqual([
      messagePartLink('http://google.com'),
      messagePartText(' link'),
    ]);

    expect(
      parseMessageEntities('test https://google.com/ link', emotes),
    ).toEqual([
      messagePartText('test '),
      messagePartLink('https://google.com/'),
      messagePartText(' link'),
    ]);

    expect(
      parseMessageEntities(
        'google.com/qwerty many yandex.ru/#qwerty links',
        emotes,
      ),
    ).toEqual([
      messagePartLink('google.com/qwerty'),
      messagePartText(' many '),
      messagePartLink('yandex.ru/#qwerty'),
      messagePartText(' links'),
    ]);

    expect(
      parseMessageEntities('yandex.ru/helloworldприветмир#hello test', emotes),
    ).toEqual([
      messagePartLink('yandex.ru/helloworldприветмир#hello'),
      messagePartText(' test'),
    ]);
  });

  it('should parse emoji length correctly', () => {
    expect(parseMessageEntities('🧑🦲text Kappa', emotes, '25:7-11')).toEqual([
      messagePartText('🧑🦲text '),
      messagePartTwitchEmote('Kappa'),
    ]);

    expect(parseMessageEntities('🧑🦱 Kappa', emotes, '25:3-7')).toEqual([
      messagePartText('🧑🦱 '),
      messagePartTwitchEmote('Kappa'),
    ]);

    expect(parseMessageEntities('🤔 Kappa', emotes, '25:2-6')).toEqual([
      messagePartEmoji('🤔'),
      messagePartText(' '),
      messagePartTwitchEmote('Kappa'),
    ]);

    expect(parseMessageEntities('👵🏻 Kappa', emotes, '25:3-7')).toEqual([
      messagePartEmoji('👵🏻'),
      messagePartText(' '),
      messagePartTwitchEmote('Kappa'),
    ]);

    expect(parseMessageEntities('👩❤️💋👩 Kappa', emotes, '25:6-10')).toEqual([
      messagePartText('👩❤️💋👩 '),
      messagePartTwitchEmote('Kappa'),
    ]);
  });

  it('should parse emotes (twitch, bttv, ffz), emoji, mention and link', () => {
    expect(
      parseMessageEntities(
        'Hey 🤔 Kappa KKona KKonaW hello world google.com @test, message',
        emotes,
        '25:6-10',
      ),
    ).toEqual([
      messagePartText('Hey '),
      messagePartEmoji('🤔'),
      messagePartText(' '),
      messagePartTwitchEmote('Kappa'),
      messagePartText(' '),
      messagePartBttvEmote('KKona'),
      messagePartText(' '),
      messagePartFfzEmote('KKonaW'),
      messagePartText(' hello world '),
      messagePartLink('google.com'),
      messagePartText(' '),
      messagePartMention('@test', 'test'),
      messagePartText(', message'),
    ]);
  });
});
