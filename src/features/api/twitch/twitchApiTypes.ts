export type TwitchUser = {
  id: string;
  login: string;
  display_name: string;
  type: string;
  broadcaster_type: string;
  description: string;
  profile_image_url: string;
  offline_image_url: string;
  view_count: number;
};

export type TwitchUsersResponse = {
  data: TwitchUser[];
};

export type TwitchEmote = {
  id: string;
  name: string;
  images: {
    url_1x: string;
    url_2x: string;
    url_4x: string;
  };
  emote_type:
    | 'globals'
    | 'smilies'
    | 'limitedtime'
    | 'subscriptions'
    | 'twofactor';
  emote_set_id: string;
  owner_id: string;
  format: ('static' | 'animated')[];
  scale: ('1.0' | '2.0' | '3.0')[];
  theme_mode: ('light' | 'dark')[];
};

export type TwitchEmotesResponse = {
  data: TwitchEmote[];
  template: string;
};

export type TwitchBadgeVersion = {
  image_url_1x: string;
  image_url_2x: string;
  image_url_4x: string;
  description: string;
  title: string;
  click_action: string;
  click_url: string;
  last_updated: null;
};

export type TwitchBadge = {
  versions: Record<string, TwitchBadgeVersion>;
};

export type TwitchBadgesResponse = {
  badge_sets: Record<string, TwitchBadge>;
};

export type TwitchBlockedUser = {
  display_name: string;
  _id: string;
  name: string;
  type: string;
  bio: string | null;
  created_at: string;
  updated_at: string;
  logo: string;
};

export type TwitchBlockedUsersResponse = {
  data: {
    user_id: string;
    user_login: string;
    display_name: string;
  }[];
};

type TwitchClipData = {
  id: string;
  url: string;
  embed_url: string;
  broadcaster_id: string;
  broadcaster_name: string;
  creator_id: string;
  creator_name: string;
  video_id: string;
  game_id: string;
  language: string;
  title: string;
  view_count: number;
  created_at: string;
  thumbnail_url: string;
};

export type TwitchClipResponse = {
  data: TwitchClipData[];
  pagination: Record<string, unknown>;
};

type TwitchVideoData = {
  id: string;
  user_id: string;
  user_name: string;
  title: string;
  description: string;
  created_at: string;
  published_at: string;
  url: string;
  thumbnail_url: string;
  viewable: 'public' | 'private';
  view_count: number;
  language: string;
  type: 'upload' | 'archive' | 'highlight';
  duration: string;
};

export type TwitchVideoResponse = {
  data: TwitchVideoData[];
  pagination: Record<string, unknown>;
};

export type JwtPayload = {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  at_hash: string;
  email_verified: boolean;
  picture: string;
  preferred_username: string;
};

// TODO: move to different place
export type MessageCard = {
  id: string;
  src: string;
  srcSet: string;
  title: string;
  description: string;
};
