import { Options } from './optionsTypes';

export const OPTIONS_INITIAL_STATE: Options = {
  ui: {
    timestampFormat: 'Disable',
    splitChat: true,
    messagesLimit: 200,
  },
  notifications: {
    mentions: false,
    highlightKeywords: '',
  },
  recentMessages: {
    load: true,
  },
  twitch: {
    cards: true,
    animatedEmotes: true,
  },
  bttv: {
    emotes: true,
    badges: true,
  },
  ffz: {
    emotes: true,
    badges: true,
    emoji: true,
    // emojiSkinTone: null,
  },
  stv: {
    emotes: true,
    badges: true,
    // paints: true,
  },
  chatterino: {
    badges: true,
  },
  youtube: {
    cards: true,
  },
};

// https://github.com/Chatterino/chatterino2/blob/master/src/widgets/settingspages/GeneralPage.cpp#L240
export const TIMESTAMP_FORMAT = [
  'Disable',
  'h:mm',
  'hh:mm',
  'h:mm a',
  'hh:mm a',
  'h:mm:ss',
  'hh:mm:ss',
  'h:mm:ss a',
  'hh:mm:ss a',
] as const;

export const MESSAGES_LIMIT = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
] as const;

export const ENTER_HIGHLIGHT_KEYWORDS_TEXT =
  'Enter Highlight Keywords\n\nHighlight certain words or phrases in your chat.\nCan be separated by a comma ","';
