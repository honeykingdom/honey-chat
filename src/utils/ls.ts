import type { LsTokens, LsUser } from 'features/auth';
import type { LsChannels } from 'features/chat';
import type { LsEmotesUsageStatistic as EmotesUsage } from 'features/emotes';
import type { LsOptions } from 'features/options';
import { LS } from './constants';

const RAW_KEYS = [LS.LastChannel];

export function lsWrite(key: LS.Tokens, data: LsTokens): void;
export function lsWrite(key: LS.User, data: LsUser): void;
export function lsWrite(key: LS.Channels, data: LsChannels): void;
export function lsWrite(key: LS.LastChannel, data: string): void;
export function lsWrite(key: LS.EmotesUsageStatistic, data: EmotesUsage): void;
export function lsWrite(key: LS.Options, data: LsOptions): void;
export function lsWrite(key: LS, data: any): void {
  try {
    localStorage.setItem(
      key,
      RAW_KEYS.includes(key) ? data : JSON.stringify(data),
    );
  } catch (e) {
    console.warn(e);
  }
}

export function lsRead(key: LS.Tokens): LsTokens | null;
export function lsRead(key: LS.User): LsUser | null;
export function lsRead(key: LS.Channels): LsChannels | null;
export function lsRead(key: LS.LastChannel): string | null;
export function lsRead(key: LS.EmotesUsageStatistic): EmotesUsage | null;
export function lsRead(key: LS.Options): LsOptions | null;
export function lsRead(key: LS): any {
  try {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return RAW_KEYS.includes(key) ? data : JSON.parse(data);
  } catch (e) {
    console.warn(e);
    return null;
  }
}
