type ABttvEmote = {
  id: string;
  code: string;
  imageType: 'png' | 'gif';
};

export type BttvEmoteCommon = ABttvEmote & {
  userId: string;
};

export type BttvEmoteDetailed = ABttvEmote & {
  user: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
};

export type BttvEmote = BttvEmoteCommon | BttvEmoteDetailed;

export type BttvGlobalEmotesResponse = BttvEmoteCommon[];

export type BttvChannelEmotesResponse = {
  id: string;
  bots: string[];
  channelEmotes: BttvEmoteDetailed[];
  sharedEmotes: BttvEmoteDetailed[];
};

export type BttvBadge = {
  id: string;
  name: string;
  displayName: string;
  providerId: string;
  badge: {
    description: string;
    svg: string;
  };
};

export type BttvGlobalBadgesResponse = BttvBadge[];
