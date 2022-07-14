import {
  BttvChannelEmote,
  BttvGlobalEmote,
  Emotes,
  FfzEmote,
  StvEmote,
  TwitchEmote,
} from 'features/api';

export type Emoji = {
  category: number;
  sort: number;
  char: string;
  name: string | string[];
  codePoints: string;
  variants: string[];
};

export type AllEmotes = {
  twitch?: Emotes<TwitchEmote>;
  bttvGlobal?: Emotes<BttvGlobalEmote>;
  bttvChannel?: Emotes<BttvChannelEmote>;
  ffzGlobal?: Emotes<FfzEmote>;
  ffzChannel?: Emotes<FfzEmote>;
  stvGlobal?: Emotes<StvEmote>;
  stvChannel?: Emotes<StvEmote>;
  // https://github.com/FrankerFaceZ/FrankerFaceZ/blob/master/src/modules/chat/emoji.js
  emoji?: Emotes<Emoji>;
};
