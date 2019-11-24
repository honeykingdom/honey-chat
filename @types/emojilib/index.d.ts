declare module 'emojilib' {
  interface Emoji {
    keywords: string[];
    char: string;
    fitzpatrick_scale: boolean;
    category: string;
  }

  export const lib: { [name: string]: Emoji };

  export const ordered: string[];

  export const fitzpatrick_scale_modifiers: string[];
}
