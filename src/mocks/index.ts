import type { AllEmotes } from 'features/emotes/emotesTypes';
import { parseTwitchEmotes } from 'features/api/twitch/twitchApiParseResponses';
import {
  parseBttvChannelEmotes,
  parseBttvGlobalEmotes,
} from 'features/api/bttv/bttvApiParseResponses';
import {
  parseFfzChannelEmotes,
  parseFfzEmoji,
  parseFfzGlobalEmotes,
} from 'features/api/ffz/ffzApiParseResponses';
import { parseStvGlobalEmotes } from 'features/api/stv/stvApiParseResponses';
import type {
  MessagePartBttvEmote,
  MessagePartEmoji,
  MessagePartFfzEmote,
  MessagePartLink,
  MessagePartMention,
  MessagePartStvEmote,
  MessagePartText,
  MessagePartTwitchEmote,
} from 'features/messages/messagesTypes';
import { MessagePartType } from 'features/messages/messagesConstants';

import twitchEmotes from './twitchEmotes.json';
import twitchBadgesGlobal from './twitchBadgesGlobal.json';
import twitchBadgesChannel from './twitchBadgesChannel.json';
import twitchBlockedUsers from './twitchBlockedUsers.json';
import twitchClip from './twitchClip.json';
import twitchVideo from './twitchVideo.json';
import twitchUser from './twitchUser.json';
import bttvGlobalEmotes from './bttvGlobalEmotes.json';
import bttvChannelEmotes from './bttvChannelEmotes.json';
import bttvGlobalBadges from './bttvGlobalBadges.json';
import ffzGlobalEmotes from './ffzGlobalEmotes.json';
import ffzChannelEmotes from './ffzChannelEmotes.json';
import ffzEmoji from './ffzEmoji.json';
import ffzGlobalBadges from './ffzGlobalBadges.json';
import ffzApGlobalBadges from './ffzApGlobalBadges.json';
import stvGlobalEmotes from './stvGlobalEmotes.json';
import stvChannelEmotes from './stvChannelEmotes.json';
import stvCosmetics from './stvCosmetics.json';

export const emotes: AllEmotes = {
  twitch: parseTwitchEmotes(twitchEmotes as any),
  bttvGlobal: parseBttvGlobalEmotes(bttvGlobalEmotes as any),
  bttvChannel: parseBttvChannelEmotes(bttvChannelEmotes as any),
  ffzGlobal: parseFfzGlobalEmotes(ffzGlobalEmotes as any),
  ffzChannel: parseFfzChannelEmotes(ffzChannelEmotes as any),
  stvGlobal: parseStvGlobalEmotes(stvGlobalEmotes as any),
  stvChannel: parseStvGlobalEmotes(stvChannelEmotes as any),
  emoji: parseFfzEmoji(ffzEmoji as any),
};

export const messagePartText = (content: string): MessagePartText => ({
  type: MessagePartType.TEXT,
  content,
});

export const messagePartMention = (
  displayText: string,
  recipient: string,
): MessagePartMention => ({
  type: MessagePartType.MENTION,
  content: { displayText, recipient },
});

export const messagePartLink = (link: string): MessagePartLink => ({
  type: MessagePartType.LINK,
  content: { displayText: link, url: link },
});

export const messagePartTwitchEmote = (
  name: string,
): MessagePartTwitchEmote => {
  const id = emotes.twitch?.names[name];

  if (!id) throw new Error(`No twitch emote with name ${name}`);

  return { type: MessagePartType.TWITCH_EMOTE, content: { id, modifiers: [] } };
};

export const messagePartBttvEmote = (name: string): MessagePartBttvEmote => {
  const id = emotes.bttvGlobal?.names[name] || emotes.bttvChannel?.names[name];

  if (!id) throw new Error(`No BTTV emote with name ${name}`);

  return { type: MessagePartType.BTTV_EMOTE, content: { id, modifiers: [] } };
};

export const messagePartFfzEmote = (name: string): MessagePartFfzEmote => {
  const id = emotes.ffzGlobal?.names[name] || emotes.ffzChannel?.names[name];

  if (!id) throw new Error(`No FFZ emote with name ${name}`);

  return { type: MessagePartType.FFZ_EMOTE, content: { id, modifiers: [] } };
};

export const messagePartStvEmote = (name: string): MessagePartStvEmote => {
  const id = emotes.stvGlobal?.names[name] || emotes.stvChannel?.names[name];

  if (!id) throw new Error(`No 7TV emote with name ${name}`);

  return { type: MessagePartType.STV_EMOTE, content: { id, modifiers: [] } };
};

// https://twemoji.maxcdn.com/v/latest/72x72/1f47f.png
export const messagePartEmoji = (emoji: string): MessagePartEmoji => {
  const id = emotes.emoji?.names[emoji];

  if (!id) throw new Error(`No emoji with id ${id}`);

  return { type: MessagePartType.EMOJI, content: { id, modifiers: [] } };
};
