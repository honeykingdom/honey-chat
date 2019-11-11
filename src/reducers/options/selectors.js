export const optionsSelector = (state) => [
  {
    title: 'My preferences',
    items: [
      {
        type: 'SWITCH',
        id: 'show-timestamps',
        name: 'showTimestamps',
        title: 'Show Timestamps',
        description: '',
        value: state.options.showTimestamps,
      },
      {
        type: 'SWITCH',
        id: 'split-chat',
        name: 'splitChat',
        title: 'Split Chat',
        description: '',
        value: state.options.splitChat,
      },
      // {
      //   type: 'INPUT',
      //   id: 'blacklist-keywords',
      //   name: 'blacklistKeywords',
      //   title: 'Set Blacklist Keywords',
      //   description: '',
      //   value: state.options.blacklistKeywords,
      // },
      // {
      //   type: 'INPUT',
      //   id: 'highlight-keywords',
      //   name: 'highlightKeywords',
      //   title: 'Set Highlight Keywords',
      //   description: '',
      //   value: state.options.highlightKeywords,
      // },
    ],
  },
];

export const isShowTimestampsSelector = (state) => state.options.showTimestamps;
export const isSplitChatSelector = (state) => state.options.splitChat;
