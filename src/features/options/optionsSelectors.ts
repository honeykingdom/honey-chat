import type { RootState } from 'app/rootReducer';

type OptionItem = {
  type: 'switch' | 'input';
  id: string;
  name: string;
  title: string;
  description: string;
  value: boolean | string;
};

type OptionCategories = {
  title: string;
  items: OptionItem[];
};

export const optionsSelector = (state: RootState): OptionCategories[] => [
  {
    title: 'My preferences',
    items: [
      {
        type: 'switch',
        id: 'show-timestamps',
        name: 'showTimestamps',
        title: 'Show Timestamps',
        description: '',
        value: state.options.showTimestamps,
      },
      {
        type: 'switch',
        id: 'split-chat',
        name: 'splitChat',
        title: 'Split Chat',
        description: '',
        value: state.options.splitChat,
      },
      {
        type: 'switch',
        id: 'fixed-width',
        name: 'fixedWidth',
        title: 'Fixed Width',
        description: '',
        value: state.options.fixedWidth,
      },
      {
        type: 'switch',
        id: 'highlight-notifications',
        name: 'highlightNotifications',
        title: 'Play a sound on highlights',
        description: 'Plays a sound for messages directed at you',
        value: state.options.highlightNotifications,
      },
      {
        type: 'switch',
        id: 'show-twitch-cards',
        name: 'showTwitchCards',
        title: 'Show Twitch clips and vods in the chat',
        description: 'Show previews for Twitch clips and vods in the chat',
        value: state.options.showTwitchCards,
      },
      {
        type: 'switch',
        id: 'show-youtube-cards',
        name: 'showYoutubeCards',
        title: 'Show Youtube videos in the chat',
        description: 'Show previews for Youtube videos in the chat',
        value: state.options.showYoutubeCards,
      },
      // {
      //   type: 'input',
      //   id: 'blacklist-keywords',
      //   name: 'blacklistKeywords',
      //   title: 'Set Blacklist Keywords',
      //   description: '',
      //   value: state.options.blacklistKeywords,
      // },
      // {
      //   type: 'input',
      //   id: 'highlight-keywords',
      //   name: 'highlightKeywords',
      //   title: 'Set Highlight Keywords',
      //   description: '',
      //   value: state.options.highlightKeywords,
      // },
    ],
  },
];

export const isShowTimestampsSelector = (state: RootState) =>
  state.options.showTimestamps;

export const isSplitChatSelector = (state: RootState) =>
  state.options.splitChat;

export const isFixedWidthSelector = (state: RootState) =>
  state.options.fixedWidth;

export const isHighlightNotificationsSelector = (state: RootState) =>
  state.options.highlightNotifications;

export const isShowTwitchCardsSelector = (state: RootState) =>
  state.options.showTwitchCards;

export const isShowYoutubeCardsSelector = (state: RootState) =>
  state.options.showYoutubeCards;
