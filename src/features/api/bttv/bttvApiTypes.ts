export type BttvEmote = {
  id: string;
  code: string;
  imageType: 'png' | 'gif';
};

export type BttvGlobalEmote = BttvEmote & {
  userId: string;
};

export type BttvChannelEmote = BttvEmote & {
  user: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
};

export type BttvGlobalEmotesResponse = BttvGlobalEmote[];

export type BttvChannelEmotesResponse = {
  id: string;
  bots: string[];
  channelEmotes: BttvChannelEmote[];
  sharedEmotes: BttvChannelEmote[];
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
