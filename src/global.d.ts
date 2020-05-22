declare module '*.ogg' {
  const url: string;
  export default url;
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
