import fetchRequest from 'utils/fetchRequest';

export interface ChatHistoryResponse {
  messages: string[];
  error: null;
}

export const fetchChatHistory = (
  channel: string,
): Promise<ChatHistoryResponse> =>
  fetchRequest(
    `https://recent-messages.robotty.de/api/v2/recent-messages/${channel}?clearchatToNotice=true`,
  );
