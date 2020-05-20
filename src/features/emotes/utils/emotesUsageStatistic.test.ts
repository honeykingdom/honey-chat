import * as R from 'ramda';

import { emotes, findTwitchEmote, findBttvEmote, findFfzEmote } from 'mocks';
import { LS_EMOTES_USAGE_STATISTIC } from 'utils/constants';
import parseMessageEntities from 'features/messages/utils/parseMessageEntities';
import {
  readEmotesUsageStatistic,
  writeEmotesUsageStatistic,
  getUsageStatisticFromEntities,
  getEmotesFromUsageStatistic,
} from 'features/emotes/utils/emotesUsageStatistic';

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
    const result = createStatistic([
      ['twitch-emote', 'Kappa', 4],
      ['bttv-emote', 'sumSmash', 2],
      ['ffz-emote', 'KKonaW', 1],
    ]);

    localStorage.setItem(LS_EMOTES_USAGE_STATISTIC, JSON.stringify(result));

    expect(readEmotesUsageStatistic()).toEqual(result);
  });

  it('should not write empty statistic', () => {
    writeEmotesUsageStatistic(['hello world']);

    expect(localStorage.setItem).not.toHaveBeenCalled();
  });

  it('should write statistic', () => {
    writeEmotesUsageStatistic(
      parseMessageEntities(
        '4Head EZ 4Head KKonaW KKonaW test message KKonaW KKonaW',
        emotes,
        null,
        true,
      ),
    );

    expect(
      JSON.parse(localStorage.getItem(LS_EMOTES_USAGE_STATISTIC) as string),
    ).toEqual(
      createStatistic([
        ['twitch-emote', '4Head', 2],
        ['bttv-emote', 'EZ', 1],
        ['ffz-emote', 'KKonaW', 4],
      ]),
    );
  });

  it('should merge statistic', () => {
    localStorage.setItem(
      LS_EMOTES_USAGE_STATISTIC,
      JSON.stringify(
        createStatistic([
          ['twitch-emote', '4Head', 2],
          ['bttv-emote', 'EZ', 1],
          ['ffz-emote', 'KKonaW', 4],
        ]),
      ),
    );

    writeEmotesUsageStatistic(
      parseMessageEntities('4Head KKona EZ KKonaW @twitch', emotes, null, true),
    );

    expect(
      JSON.parse(localStorage.getItem(LS_EMOTES_USAGE_STATISTIC) as string),
    ).toEqual(
      createStatistic([
        ['twitch-emote', '4Head', 3],
        ['bttv-emote', 'KKona', 1],
        ['bttv-emote', 'EZ', 2],
        ['ffz-emote', 'KKonaW', 5],
      ]),
    );
  });

  it('should return statistic from entities', () => {
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

    expect(
      getUsageStatisticFromEntities(
        parseMessageEntities(
          'Kappa Keepo Kappa 4Head hello @twitch :) KKona KKonaW Zappa EZ sumSmash',
          emotes,
          null,
          true,
        ),
      ),
    ).toEqual(result);
  });

  it('should return empty emotes list from statistic', () => {
    expect(getEmotesFromUsageStatistic(emotes)).toEqual([]);
  });

  it('should return emotes list from statistic', () => {
    localStorage.setItem(
      LS_EMOTES_USAGE_STATISTIC,
      JSON.stringify(
        // prettier-ignore
        createStatistic([
          ['twitch-emote', 'Keepo',    1, 1500000000011],
          ['twitch-emote', '4Head',    2, 1500000000001],
          ['twitch-emote', 'Kappa',    5, 1500000000000],
          ['bttv-emote',   'KKona',    1, 1500000000010],
          ['bttv-emote',   'sumSmash', 3, 1500000000001],
          ['ffz-emote',    'KKonaW',   2, 1500000000002],
        ]),
      ),
    );

    expect(getEmotesFromUsageStatistic(emotes)).toEqual([
      findTwitchEmote('Kappa'),
      findBttvEmote('sumSmash'),
      findFfzEmote('KKonaW'),
      findTwitchEmote('4Head'),
      findTwitchEmote('Keepo'),
      findBttvEmote('KKona'),
    ]);
  });

  it('should return emotes list from statistic with limit', () => {
    localStorage.setItem(
      LS_EMOTES_USAGE_STATISTIC,
      JSON.stringify(
        createStatistic([
          ['twitch-emote', 'Keepo', 1],
          ['twitch-emote', '4Head', 2],
          ['twitch-emote', 'Kappa', 5],
          ['bttv-emote', 'KKona', 1],
          ['bttv-emote', 'sumSmash', 3],
          ['ffz-emote', 'KKonaW', 1],
        ]),
      ),
    );

    expect(getEmotesFromUsageStatistic(emotes, 3)).toEqual([
      findTwitchEmote('Kappa'),
      findBttvEmote('sumSmash'),
      findTwitchEmote('4Head'),
    ]);
  });
});
