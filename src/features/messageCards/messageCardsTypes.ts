import type { MessageCardType } from './messageCardsConstants';

export type MessageCard = {
  type: MessageCardType;
  id: string;
  url: string;
};

export type MessageCardDetails = {
  id: string;
  src: string;
  srcSet: string;
  title: string;
  description: string;
};
