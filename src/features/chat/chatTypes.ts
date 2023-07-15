import type { EntityState } from '@reduxjs/toolkit';
import type {
  Badges,
  BttvBadge,
  BttvEmote,
  ChatterinoBadge,
  Emotes,
  FfzApBadge,
  FfzBadge,
  FfzEmote,
  StvBadge,
  StvEmote,
  TwitchBadge,
  TwitchEmote,
} from 'features/api';
import type { Messages } from 'features/messages/messagesTypes';
import type { Emoji, HtmlEmote } from 'features/emotes/emotesTypes';
import type { Options } from 'features/options/optionsTypes';

type UserType = '' | 'admin' | 'global_mod' | 'staff';

export type GlobalUserStateTags = {
  badgeInfo: Record<string, string>;
  badges: Record<string, string>;
  color?: string;
  displayName?: string;
  emoteSets: string[];
  userId: string;
  userType: UserType;
};

export type UserStateTags = {
  badgeInfo: Record<string, string>;
  badges: Record<string, string>;
  color?: string;
  displayName?: string;
  emoteSets: string[];
  mod: boolean;
  subscriber: boolean;
  userType: UserType;
};

export type RoomStateTags = {
  emoteOnly: boolean;
  followersOnly: false | number;
  r9k: boolean;
  roomId: string;
  slow: number;
  subsOnly: boolean;
};

export type Channel = {
  id?: string;
  name: string;
  messages: Messages[];
  recentMessages: FetchResult<string[]>;
  /** blocked users, global/channel emotes/badges are loaded */
  ready: boolean;
  /** Is first message in the array should be with alternative background. Uses for split chat feature. */
  isFirstMessageAltBg: boolean;
  roomState?: RoomStateTags;
  userState?: UserStateTags;
  /** Users in the chat. Uses for autocomplete when typing `@` */
  users: string[];
  /** Recent user inputs in this channel */
  recentInputs: string[];
  emotes: {
    bttv: FetchResult<Emotes<BttvEmote>>;
    ffz: FetchResult<Emotes<FfzEmote>>;
    stv: FetchResult<Emotes<StvEmote>>;
  };
  badges: {
    twitch: FetchResult<Record<string, TwitchBadge>>;
  };
};

type AuthStatus = 'uninitialized' | 'success' | 'error';

export type FetchResult<
  T,
  A extends Record<string, any> = Record<string, any>,
> = {
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  data?: T;
} & A;

export type ChatState = {
  isConnected: boolean;
  isRegistered: boolean;
  me: {
    authStatus: AuthStatus;
    id?: string;
    login?: string;
    displayName?: string;
    picture?: string;
    accessToken?: string;
    globalUserState?: GlobalUserStateTags;
    blockedUsers: FetchResult<string[]>;
  };
  channels: EntityState<Channel>;
  currentChannel?: string;
  /** Global emotes */
  emotes: {
    twitch: FetchResult<
      Emotes<TwitchEmote>,
      { setIds?: string[]; template?: string }
    >;
    bttv: FetchResult<Emotes<BttvEmote>>;
    ffz: FetchResult<Emotes<FfzEmote>>;
    stv: FetchResult<Emotes<StvEmote>>;
    emoji: FetchResult<Emotes<Emoji>>;
  };
  /** Global badges */
  badges: {
    twitch: FetchResult<Record<string, TwitchBadge>>;
    bttv: FetchResult<Badges<BttvBadge>>;
    ffz: FetchResult<Badges<FfzBadge>>;
    ffzAp: FetchResult<Badges<FfzApBadge>>;
    stv: FetchResult<Badges<StvBadge>>;
    chatterino: FetchResult<Badges<ChatterinoBadge>>;
  };
  options: Options;
};

export type LsChannels = [name: string, id?: string][];

type ASuggestions = {
  isActive: boolean;
  activeIndex: number;
  start: number;
  end: number;
};
type UserSuggestions = ASuggestions & {
  type: 'users';
  items: string[];
};
type EmoteSuggestions = ASuggestions & {
  type: 'emotes';
  items: HtmlEmote[];
};
export type SuggestionsState = UserSuggestions | EmoteSuggestions;

export type SendMessageFn = (channel: string, message: string) => void;
