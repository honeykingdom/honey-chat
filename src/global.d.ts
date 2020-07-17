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
