import React from 'react';
import styled from 'styled-components';

import { UserNotice as UserNoticeType } from 'features/chat/slice/messages';

const UserNoticeRoot = styled.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;

interface Props {
  message: UserNoticeType;
}

const UserNotice = ({ message: { systemMessage } }: Props) => (
  <UserNoticeRoot>{systemMessage}</UserNoticeRoot>
);

export default React.memo(UserNotice);
