export type RecentMessagesResponse = {
  messages: string[];
  error: null;
};

const alternativeHistoryChannels = (
  process.env.NEXT_PUBLIC_ALTERNATIVE_HISTORY_CHANNELS || ''
).split(';');

const recentMessages = {
  get: (channelName: string): Promise<RecentMessagesResponse> => {
    const url = alternativeHistoryChannels.includes(channelName)
      ? `https://honeykingdom.herokuapp.com/api/v1/recent-messages/${channelName}`
      : `https://recent-messages.robotty.de/api/v2/recent-messages/${channelName}?clearchatToNotice=true`;
    return fetch(url).then((r) => r.json());
  },
};

export default recentMessages;
