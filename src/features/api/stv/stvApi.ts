import {
  StvChannelEmotesResponse,
  StvCosmeticsResponse,
  StvGlobalEmotesResponse,
} from './stvApiTypes';

const API_BASE_V2 = 'https://api.7tv.app/v2';
const API_BASE_V3 = 'https://7tv.io/v3';

const stv = {
  globalEmotes: (): Promise<StvGlobalEmotesResponse> =>
    fetch(`${API_BASE_V3}/emote-sets/global`).then((r) => r.json()),

  channelEmotes: (channelId: string): Promise<StvChannelEmotesResponse> =>
    fetch(`${API_BASE_V3}/users/twitch/${channelId}`).then((r) => r.json()),

  cosmetics: (): Promise<StvCosmeticsResponse> =>
    fetch(`${API_BASE_V2}/cosmetics?user_identifier=twitch_id`).then((r) =>
      r.json(),
    ),
};

export default stv;
