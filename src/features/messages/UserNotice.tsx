import React from 'react';
import styled from 'styled-components';

import type { UserNotice as UserNoticeType } from 'features/messages/messagesSlice';

const UserNoticeRoot = styled.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;

type Props = {
  message: UserNoticeType;
};

const UserNotice = ({ message: { systemMessage } }: Props) => (
  <UserNoticeRoot>{systemMessage}</UserNoticeRoot>
);

export default UserNotice;
