import { MessageCardType } from './messageCardsConstants';

export type MessageCard = {
  type: MessageCardType;
  id: string;
  url: string;
};
