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
