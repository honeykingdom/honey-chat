import * as R from 'ramda';

import { LS_EMOTES_USAGE_STATISTIC } from 'utils/constants';
import * as htmlEntity from 'features/chat/utils/htmlEntity';
import findEmote from 'features/chat/utils/findEmote';
import { StateEmotes } from 'features/chat/selectors';
import { MessageEntity } from 'features/chat/slice/messages';

type Type = 'twitch-emote' | 'bttv-emote' | 'ffz-emote';

type AUsageItem = {
  lastUpdatedAt: number;
  uses: number;
};

type UsageItemTwitchFfz = AUsageItem & {
  type: 'twitch-emote' | 'ffz-emote';
  id: number;
};

type UsageItemBttv = AUsageItem & {
  type: 'bttv-emote';
  id: string;
};

type UsageItem = UsageItemTwitchFfz | UsageItemBttv;

type EmotesUsageStatistic = Record<Type, Record<string, UsageItem>>;

export const readEmotesUsageStatistic = (): Partial<EmotesUsageStatistic> => {
  try {
    const statistic = localStorage.getItem(LS_EMOTES_USAGE_STATISTIC);

    return JSON.parse(statistic as string) || {};
  } catch (e) {
    return {};
  }
};

export const getUsageStatisticFromEntities = R.pipe<
  MessageEntity[],
  any,
  any,
  any
>(
  R.filter((v: any) =>
    R.includes(R.prop('type', v), ['twitch-emote', 'bttv-emote', 'ffz-emote']),
  ),
  R.groupBy<any>(R.prop('type')),
  R.map(
    R.pipe<any, any, any>(
      R.groupBy<any>(R.prop('id')),
      R.map((items: any) => ({
        type: items[0].type,
        id: items[0].id,
        lastUpdatedAt: Date.now(),
        uses: items.length,
      })),
    ),
  ),
);

const mergeFn = (key: string, left: any, right: any) =>
  key === 'uses' ? left + right : right;

export const writeEmotesUsageStatistic = (entries: MessageEntity[]) => {
  const statistic = getUsageStatisticFromEntities(entries) as Partial<
    EmotesUsageStatistic
  >;

  if (R.isEmpty(statistic)) return;

  const history = readEmotesUsageStatistic();

  const newHistory = R.mergeDeepWithKey(mergeFn, history, statistic);

  localStorage.setItem(LS_EMOTES_USAGE_STATISTIC, JSON.stringify(newHistory));
};

const normalizeHistory = R.pipe<any, any, any, any, UsageItem[]>(
  R.values,
  R.map(R.values),
  R.flatten,
  R.sortWith([R.descend(R.prop('uses')), R.descend(R.prop('lastUpdatedAt'))]),
);

export const getEmotesFromUsageStatistic = (
  emotes: StateEmotes,
  limit = 27,
) => {
  if (!emotes) return [];

  const result: htmlEntity.Emote[] = [];
  const history = R.pipe(readEmotesUsageStatistic, normalizeHistory)();

  // eslint-disable-next-line no-restricted-syntax
  for (const item of history) {
    if (result.length === limit) return result;

    let emoteEntity = null;

    if (item.type === 'twitch-emote') {
      emoteEntity = findEmote.twitch.byId(item.id, emotes);
    }

    if (item.type === 'bttv-emote') {
      emoteEntity = findEmote.bttv.byId(item.id, emotes);
    }

    if (item.type === 'ffz-emote') {
      emoteEntity = findEmote.ffz.byId(item.id, emotes);
    }

    if (emoteEntity) {
      result.push(emoteEntity);
    }
  }

  return result;
};
