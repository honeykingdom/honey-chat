import {
  FfzApGlobalBadgesResponse,
  FfzChannelEmotesResponse,
  FfzEmojiResponse,
  FfzGlobalBadgesResponse,
  FfzGlobalEmotesResponse,
} from './ffzApiTypes';

const API_BASE = 'https://api.frankerfacez.com/v1';

const ffz = {
  globalEmotes: (): Promise<FfzGlobalEmotesResponse> =>
    fetch(`${API_BASE}/set/global`).then((r) => r.json()),

  channelEmotes: (channelId: string): Promise<FfzChannelEmotesResponse> =>
    fetch(`${API_BASE}/room/id/${channelId}`).then((r) => r.json()),

  emoji: (): Promise<FfzEmojiResponse> =>
    fetch('https://cdn.frankerfacez.com/static/emoji/v3.2.json').then((r) =>
      r.json(),
    ),

  globalBadges: (): Promise<FfzGlobalBadgesResponse> =>
    fetch(`${API_BASE}/badges/ids`).then((r) => r.json()),

  apGlobalBadges: (): Promise<FfzApGlobalBadgesResponse> =>
    fetch('https://api.ffzap.com/v1/supporters').then((r) => r.json()),
};

export default ffz;
