import { StvCosmeticsResponse, StvEmote } from './stvApiTypes';

const API_BASE = 'https://api.7tv.app/v2';

const stv = {
  globalEmotes: (): Promise<StvEmote[]> =>
    fetch(`${API_BASE}/emotes/global`).then((r) => r.json()),

  channelEmotes: (channelId: string): Promise<StvEmote[]> =>
    fetch(`${API_BASE}/users/${channelId}/emotes`).then((r) => r.json()),

  cosmetics: (): Promise<StvCosmeticsResponse> =>
    fetch(`${API_BASE}/cosmetics?user_identifier=twitch_id`).then((r) =>
      r.json(),
    ),
};

export default stv;
