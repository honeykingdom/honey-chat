import type { components } from './twitchApiTypes.generated';

export type TwitchUser = components['schemas']['User'];
export type TwitchGetUsersResponse = components['schemas']['GetUsersResponse'];

// emote_type: 'globals' | 'smilies' | 'limitedtime' | 'subscriptions' | 'follower' | 'twofactor';
export type TwitchEmote = components['schemas']['Emote'];
export type TwitchEmoteSetsResponse =
  components['schemas']['GetEmoteSetsResponse'];

export type TwitchUserBlockListsResponse =
  components['schemas']['GetUserBlockListResponse'];
export type TwitchClipsResponse = components['schemas']['GetClipsResponse'];
export type TwitchVideosResponse = components['schemas']['GetVideosResponse'];

export type TwitchBadgesResponse =
  components['schemas']['GetGlobalChatBadgesResponse'];
export type TwitchBadgeVersion =
  components['schemas']['ChatBadge']['versions'][number];

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
