import type {
  Emotes,
  FfzEmote,
  StvEmote,
  TwitchEmote,
  BttvEmote,
} from 'features/api';
import type { EmoteType } from './emotesConstants';

export type Emoji = {
  category: number;
  sort: number;
  char: string;
  name: string | string[];
  codePoints: string;
  variants: string[];
};

export type AllEmotes = {
  twitch?: Emotes<TwitchEmote>;
  twitchTemplate?: string;
  bttvGlobal?: Emotes<BttvEmote>;
  bttvChannel?: Emotes<BttvEmote>;
  ffzGlobal?: Emotes<FfzEmote>;
  ffzChannel?: Emotes<FfzEmote>;
  stvGlobal?: Emotes<StvEmote>;
  stvChannel?: Emotes<StvEmote>;
  emoji?: Emotes<Emoji>;
};

export type HtmlEmote = {
  id: string;
  title: string;
  alt: string;
  src: string;
  srcSet: string;
  sources: [mime: `image/${string}`, srcSet: string][];
  owner: {
    id?: string;
    name?: string;
    displayName?: string;
  };
};

type LsEmotesUsageItem = [uses: number, updatedAt: number];
/**
 * `{ [EmoteType]: { [emoteId]: [uses, updatedAt] } }`
 */
export type LsEmotesUsageStatistic = Record<
  EmoteType,
  Record<string, LsEmotesUsageItem>
>;

export type EmotesCategory = {
  title?: string;
  items: HtmlEmote[];
};
