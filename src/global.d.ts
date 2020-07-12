declare module '*.ogg' {
  const url: string;
  export default url;
}

declare module 'features/emotes/emojisMap.json' {
  type Emoji = {
    short: string;
    keywords: string[];
    char: string;
    unified: string;
  };

  const data: Record<string, Emoji>;

  export default data;
}

declare module 'emojilib' {
  interface Emoji {
    keywords: string[];
    char: string;
    fitzpatrick_scale: boolean;
    category: string;
  }

  export const lib: Record<string, Emoji>;

  export const ordered: string[];

  // eslint-disable-next-line @typescript-eslint/camelcase
  export const fitzpatrick_scale_modifiers: string[];
}
