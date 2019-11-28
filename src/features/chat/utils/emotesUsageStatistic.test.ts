import * as R from 'ramda';

import { emotes, findTwitchEmote, findBttvEmote, findFfzEmote } from 'mocks';
import { LS_EMOTES_USAGE_STATISTIC } from 'utils/constants';
import parseMessageEntities from 'features/chat/utils/parseMessageEntities';
import {
  readEmotesUsageStatistic,
  writeEmotesUsageStatistic,
  getUsageStatisticFromEntities,
  getEmotesFromUsageStatistic,
} from 'features/chat/utils/emotesUsageStatistic';

type ItemType = 'twitch-emote' | 'bttv-emote' | 'ffz-emote';

const mapFindEmote: Record<ItemType, Function> = {
  'twitch-emote': findTwitchEmote,
  'bttv-emote': findBttvEmote,
  'ffz-emote': findFfzEmote,
};

type UsageParams = [ItemType, string, number, number];

const createUsage = ([type, name, uses, lastUpdatedAt]: UsageParams) => {
  const emote = mapFindEmote[type](name);

  return {
    [emote.id]: {
      type,
      id: emote.id,
      lastUpdatedAt: lastUpdatedAt || Date.now(),
      uses,
    },
  };
};

const createStatistic = R.pipe<any, any, any>(
  R.groupBy(R.head),
  R.map(R.pipe(R.map(createUsage), R.mergeAll)),
);

describe('emotes usage statistic', () => {
  jest.spyOn(global.Date, 'now').mockImplementation(() => 1500000000000);

  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  it('should read empty statistic', () => {
    expect(readEmotesUsageStatistic()).toEqual({});
  });

  it('should read statistic', () => {
    const result1 = createStatistic([
      ['twitch-emote', 'Kappa', 4],
      ['bttv-emote', 'sumSmash', 2],
      ['ffz-emote', 'KKonaW', 1],
    ]);

    localStorage.setItem(LS_EMOTES_USAGE_STATISTIC, JSON.stringify(result1));

    expect(readEmotesUsageStatistic()).toEqual(result1);
  });

  it('should not write empty statistic', () => {
    writeEmotesUsageStatistic(['hello world']);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should write statistic', () => {
    const message = '4Head EZ 4Head KKonaW KKonaW test message KKonaW KKonaW';
    const entities = parseMessageEntities(message, emotes, null, true);

    const result = createStatistic([
      ['twitch-emote', '4Head', 2],
      ['bttv-emote', 'EZ', 1],
      ['ffz-emote', 'KKonaW', 4],
    ]);

    writeEmotesUsageStatistic(entities);

    expect(
      JSON.parse(localStorage.getItem(LS_EMOTES_USAGE_STATISTIC) as string),
    ).toEqual(result);
  });

  it('should merge statistic', () => {
    const initialData = createStatistic([
      ['twitch-emote', '4Head', 2],
      ['bttv-emote', 'EZ', 1],
      ['ffz-emote', 'KKonaW', 4],
    ]);

    localStorage.setItem(
      LS_EMOTES_USAGE_STATISTIC,
      JSON.stringify(initialData),
    );

    const message = '4Head KKona EZ KKonaW @twitch';
    const entities = parseMessageEntities(message, emotes, null, true);

    const result = createStatistic([
      ['twitch-emote', '4Head', 3],
      ['bttv-emote', 'KKona', 1],
      ['bttv-emote', 'EZ', 2],
      ['ffz-emote', 'KKonaW', 5],
    ]);

    writeEmotesUsageStatistic(entities);
    expect(
      JSON.parse(localStorage.getItem(LS_EMOTES_USAGE_STATISTIC) as string),
    ).toEqual(result);
  });

  it('should return statistic from entities', () => {
    const message =
      'Kappa Keepo Kappa 4Head hello @twitch :) KKona KKonaW Zappa EZ sumSmash';
    const entities = parseMessageEntities(message, emotes, null, true);

    const result = createStatistic([
      ['twitch-emote', 'Kappa', 2],
      ['twitch-emote', 'Keepo', 1],
      ['twitch-emote', '4Head', 1],
      ['twitch-emote', ':)', 1],
      ['bttv-emote', 'KKona', 1],
      ['bttv-emote', 'EZ', 1],
      ['bttv-emote', 'Zappa', 1],
      ['bttv-emote', 'sumSmash', 1],
      ['ffz-emote', 'KKonaW', 1],
    ]);

    localStorage.setItem(LS_EMOTES_USAGE_STATISTIC, JSON.stringify(result));

    expect(getUsageStatisticFromEntities(entities)).toEqual(result);
  });

  it('should return empty emotes list from statistic', () => {
    expect(getEmotesFromUsageStatistic(emotes)).toEqual([]);
  });

  it('should return emotes list from statistic', () => {
    // prettier-ignore
    const storageStatistic = createStatistic([
      ['twitch-emote', 'Keepo',    1, 1500000000011],
      ['twitch-emote', '4Head',    2, 1500000000001],
      ['twitch-emote', 'Kappa',    5, 1500000000000],
      ['bttv-emote',   'KKona',    1, 1500000000010],
      ['bttv-emote',   'sumSmash', 3, 1500000000001],
      ['ffz-emote',    'KKonaW',   2, 1500000000002],
    ]);

    localStorage.setItem(
      LS_EMOTES_USAGE_STATISTIC,
      JSON.stringify(storageStatistic),
    );

    const result = [
      findTwitchEmote('Kappa'),
      findBttvEmote('sumSmash'),
      findFfzEmote('KKonaW'),
      findTwitchEmote('4Head'),
      findTwitchEmote('Keepo'),
      findBttvEmote('KKona'),
    ];

    expect(getEmotesFromUsageStatistic(emotes)).toEqual(result);
  });

  it('should return emotes list from statistic with limit', () => {
    const storageStatistic = createStatistic([
      ['twitch-emote', 'Keepo', 1],
      ['twitch-emote', '4Head', 2],
      ['twitch-emote', 'Kappa', 5],
      ['bttv-emote', 'KKona', 1],
      ['bttv-emote', 'sumSmash', 3],
      ['ffz-emote', 'KKonaW', 1],
    ]);

    localStorage.setItem(
      LS_EMOTES_USAGE_STATISTIC,
      JSON.stringify(storageStatistic),
    );

    const result = [
      findTwitchEmote('Kappa'),
      findBttvEmote('sumSmash'),
      findTwitchEmote('4Head'),
    ];

    expect(getEmotesFromUsageStatistic(emotes, 3)).toEqual(result);
  });
});
