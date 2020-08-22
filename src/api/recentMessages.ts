import fetchRequest from 'utils/fetchRequest';

export interface RecentMessagesResponse {
  messages: string[];
  error: null;
}

// eslint-disable-next-line import/prefer-default-export
export const fetchRecentMessages = (
  channel: string,
): Promise<RecentMessagesResponse> => {
  if (channel === 'nasvay_s') {
    return fetchRequest(
      `https://honeykingdom.herokuapp.com/api/v1/recent-messages/${channel}`,
    );
  }

  return fetchRequest(
    `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}?clearchatToNotice=true`,
  );
};
