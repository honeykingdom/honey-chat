import { CLIENT_ID } from 'utils/constants';
import {
  TwitchBadgesResponse,
  TwitchClipsResponse,
  TwitchEmoteSetsResponse,
  TwitchGetUsersResponse,
  TwitchUserBlockListsResponse,
  TwitchVideosResponse,
} from './twitchApiTypes';

const API_BASE = 'https://api.twitch.tv/helix';

const getOptions = (accessToken: string): RequestInit => ({
  headers: {
    'Client-ID': CLIENT_ID,
    Authorization: `Bearer ${accessToken}`,
  },
});

type GetUsersParams = ({ id: string } | { login: string })[];

const users = {
  /** @see https://dev.twitch.tv/docs/api/reference#get-users */
  getUsers: (
    params: GetUsersParams,
    accessToken: string,
  ): Promise<TwitchGetUsersResponse> => {
    const q = params
      .map((item: any) => (item.id ? `id=${item.id}` : `login=${item.login}`))
      .join('&');
    return fetch(`${API_BASE}/users?${q}`, getOptions(accessToken)).then((r) =>
      r.json(),
    );
  },

  /** @see https://dev.twitch.tv/docs/api/reference#get-user-block-list */
  getUserBlockList: (
    broadcasterId: string,
    accessToken: string,
  ): Promise<TwitchUserBlockListsResponse> =>
    fetch(
      `${API_BASE}/users/blocks?broadcaster_id=${broadcasterId}`,
      getOptions(accessToken),
    ).then((r) => r.json()),
};

const chat = {
  /** @see https://dev.twitch.tv/docs/api/reference#get-emote-sets */
  getEmoteSets: async (
    ids: string[],
    accessToken: string,
  ): Promise<TwitchEmoteSetsResponse> => {
    const IDS_LIMIT_BY_REQUEST = 25;
    const requests: Promise<TwitchEmoteSetsResponse>[] = [];

    for (let i = 0; i < ids.length; i += IDS_LIMIT_BY_REQUEST) {
      const idsSlice = ids.slice(i, i + IDS_LIMIT_BY_REQUEST);
      const q = idsSlice.map((id) => `emote_set_id=${id}`).join('&');
      requests.push(
        fetch(`${API_BASE}/chat/emotes/set?${q}`, getOptions(accessToken)).then(
          (r) => r.json(),
        ),
      );
    }

    const responses = await Promise.all(requests);

    const data = ([] as TwitchEmoteSetsResponse['data']).concat(
      ...responses.map((r) => r.data),
    );

    return {
      data,
      template: responses[0].template,
    };
  },

  getGlobalBadges: (accessToken: string): Promise<TwitchBadgesResponse> =>
    fetch(`${API_BASE}/chat/badges/global`, getOptions(accessToken)).then((r) =>
      r.json(),
    ),

  getChannelBadges: (
    broadcasterId: string,
    accessToken: string,
  ): Promise<TwitchBadgesResponse> =>
    fetch(
      `${API_BASE}/chat/badges?broadcaster_id=${broadcasterId}`,
      getOptions(accessToken),
    ).then((r) => r.json()),
};

const clips = {
  /** @see https://dev.twitch.tv/docs/api/reference#get-clips */
  getClips: (
    clipId: string,
    accessToken: string,
  ): Promise<TwitchClipsResponse> =>
    fetch(`${API_BASE}/clips?id=${clipId}`, getOptions(accessToken)).then((r) =>
      r.json(),
    ),
};

const videos = {
  /** @see https://dev.twitch.tv/docs/api/reference#get-videos */
  getVideos: (
    videoId: string,
    accessToken: string,
  ): Promise<TwitchVideosResponse> =>
    fetch(`${API_BASE}/videos?id=${videoId}`, getOptions(accessToken)).then(
      (r) => r.json(),
    ),
};

const twitch = {
  users,
  chat,
  clips,
  videos,
};

export default twitch;
