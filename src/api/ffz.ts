import fetchRequest from 'utils/fetchRequest';

export interface FfzEmote {
  css: null;
  height: number;
  hidden: boolean;
  id: number;
  margins: null;
  modifier: boolean;
  name: string;
  offset: null;
  owner: {
    _id: number;
    display_name: string;
    name: string;
  };
  public: boolean;
  urls: {
    '1': string;
    '2'?: string;
    '4'?: string;
  };
  width: number;
}

interface FfzEmoteSet {
  _type: number;
  css: null;
  description: null;
  emoticons: FfzEmote[];
  icon: null;
  id: number;
  title: string;
}

export interface FfzGlobalEmotesResponse {
  default_sets: number[];
  sets: Record<string, FfzEmoteSet>;
  users: Record<string, string[]>;
}

export interface FfzChannelEmotesResponse {
  room: {
    _id: number;
    css: null;
    display_name: string;
    id: string;
    is_group: boolean;
    mod_urls: null;
    moderator_badge: null;
    set: number;
    twitch_id: number;
    user_badges: {};
  };
  sets: Record<string, FfzEmoteSet>;
}

export const fetchFfzGlobalEmotes = (): Promise<FfzGlobalEmotesResponse> =>
  fetchRequest('https://api.frankerfacez.com/v1/set/global');

export const fetchFfzChannelEmotes = (
  channelId: string,
): Promise<FfzChannelEmotesResponse> =>
  fetchRequest(`https://api.frankerfacez.com/v1/room/id/${channelId}`);
