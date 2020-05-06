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

declare module 'twemoji-parser' {
  export type EmojiEntity = {
    type: string;
    text: string;
    url: string;
    indices: number[];
  };

  export type ParsingOptions = {
    buildUrl?: (codepoints: string, assetType: string) => string;
    assetType?: 'png' | 'svg';
  };

  export const TypeName = 'emoji';

  export function parse(
    text: string,
    options?: ParsingOptions,
  ): Array<EmojiEntity>;

  export function toCodePoints(unicodeSurrogates: string): Array<string>;
}
