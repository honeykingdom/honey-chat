import fetchRequest from 'utils/fetchRequest';

export interface BttvEmote {
  id: string;
  code: string;
  imageType: 'png' | 'gif';
}

export interface BttvGlobalEmote extends BttvEmote {
  userId: string;
}

export interface BttvChannelEmote extends BttvEmote {
  user: {
    id: string;
    name: string;
    displayName: string;
    providerId: string;
  };
}

export interface BttvChannelEmotesResponse {
  id: string;
  bots: string[];
  channelEmotes: BttvChannelEmote[];
  sharedEmotes: BttvChannelEmote[];
}

export const fetchBttvGlobalEmotes = (): Promise<BttvGlobalEmote[]> =>
  fetchRequest('https://api.betterttv.net/3/cached/emotes/global');

export const fetchBttvChannelEmotes = (
  channelId: string,
): Promise<BttvChannelEmotesResponse> =>
  fetchRequest(`https://api.betterttv.net/3/cached/users/twitch/${channelId}`);
