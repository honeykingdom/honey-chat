import {
  BttvChannelEmotesResponse,
  BttvGlobalBadgesResponse,
  BttvGlobalEmotesResponse,
} from './bttvApiTypes';

const API_BASE = 'https://api.betterttv.net/3';

const bttv = {
  globalEmotes: (): Promise<BttvGlobalEmotesResponse> =>
    fetch(`${API_BASE}/cached/emotes/global`).then((r) => r.json()),

  channelEmotes: (channelId: string): Promise<BttvChannelEmotesResponse> =>
    fetch(`${API_BASE}/cached/users/twitch/${channelId}`).then((r) => r.json()),

  globalBadges: (): Promise<BttvGlobalBadgesResponse> =>
    fetch(`${API_BASE}/cached/badges`).then((r) => r.json()),
};

export default bttv;
