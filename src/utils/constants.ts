export const CLIENT_ID = process.env.NEXT_PUBLIC_TWITCH_CLIENT_ID!;

export enum LS {
  Tokens = 'tokens',
  User = 'user',
  Channels = 'channels',
  LastChannel = 'lastChannel',
  EmotesUsageStatistic = 'emotesUsageStatistic',
  Options = 'options',
}

export const PREVENT_FORWARD_PROPS = {
  shouldForwardProp: (p: string) => !p.startsWith('$'),
};
