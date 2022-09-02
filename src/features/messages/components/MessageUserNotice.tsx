import React from 'react';
import styled from '@emotion/styled';
import { MessageTypeUserNotice } from '../messagesTypes';

const UserNoticeRoot = styled.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;

type Props = {
  message: MessageTypeUserNotice;
};

const UserNotice = ({ message: { systemMessage } }: Props) => (
  <UserNoticeRoot>{systemMessage}</UserNoticeRoot>
);

export default UserNotice;
