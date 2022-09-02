import type { TIMESTAMP_FORMAT } from './optionsConstants';

export type Options = {
  ui: {
    timestampFormat: typeof TIMESTAMP_FORMAT[number];
    splitChat: boolean;
    messagesLimit: number;
    // fixedWidth: boolean;
  };
  notifications: {
    mentions: boolean;
    highlightKeywords: string;
  };
  recentMessages: {
    load: boolean;
  };
  twitch: {
    cards: boolean;
    animatedEmotes: boolean;
  };
  bttv: {
    emotes: boolean;
    badges: boolean;
  };
  ffz: {
    emotes: boolean;
    badges: boolean;
    emoji: boolean;
    // emojiSkinTone: null | number;
  };
  stv: {
    emotes: boolean;
    badges: boolean;
    // paints: boolean;
  };
  chatterino: {
    badges: boolean;
  };
  youtube: {
    cards: boolean;
  };
};

export type LsOptions = Options;

type OptionsComponentInput = {
  type: 'input';
  value: string;
};
type OptionsComponentSwitch = {
  type: 'switch';
  value: boolean;
};
type OptionsComponentSelect = {
  type: 'select';
  value: string | number;
  options: string[] | readonly string[];
};
export type OptionsComponent =
  | OptionsComponentInput
  | OptionsComponentSwitch
  | OptionsComponentSelect;
export type OptionsItem<S extends keyof Options> = {
  name: keyof Options[S];
  title: string;
  description: string;
  component: OptionsComponent;
};
export type OptionsCategory<
  S extends keyof Options = keyof Options,
  N extends keyof Options[S] = keyof Options[S],
> = {
  id: S;
  title: string;
  items: OptionsItem<S>[];
};
