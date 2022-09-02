import { nanoid } from '@reduxjs/toolkit';
import { MessageType } from '../messagesConstants';
import type { MessageTypeNotice } from '../messagesTypes';

const createCustomNotice = (
  channelName: string,
  body: string,
): MessageTypeNotice => ({
  type: MessageType.NOTICE,
  id: nanoid(),
  channelName,
  body,
  noticeType: '',
});

export default createCustomNotice;
