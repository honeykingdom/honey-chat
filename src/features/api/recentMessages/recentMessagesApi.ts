export type RecentMessagesResponse = {
  messages: string[];
  error: null;
};

const ALTERNATIVE_HISTORY_CHANNELS = (
  process.env.NEXT_PUBLIC_ALTERNATIVE_HISTORY_CHANNELS || ''
).split(';');

const recentMessages = {
  get: (channelName: string): Promise<RecentMessagesResponse> => {
    const url = ALTERNATIVE_HISTORY_CHANNELS.includes(channelName)
      ? `https://diverse-marillin-honeykingdom.koyeb.app/api/twitch/recent-messages?channel=${channelName}`
      : `https://recent-messages.robotty.de/api/v2/recent-messages/${channelName}?clearchatToNotice=true`;
    return fetch(url).then((r) => r.json());
  },
};

export default recentMessages;
