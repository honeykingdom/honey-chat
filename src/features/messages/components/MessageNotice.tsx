import React from 'react';
import styled from '@emotion/styled';
import { MessageTypeNotice } from '../messagesTypes';

const NoticeRoot = styled.div<{ $isAltBg: boolean }>`
  padding: 5px 20px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${(p) => (p.$isAltBg ? '#1f1925' : 'transparent')};
`;

type Props = {
  message: MessageTypeNotice;
  isAltBg: boolean;
};

const Notice = ({ message: { body }, isAltBg }: Props) => (
  <NoticeRoot $isAltBg={isAltBg}>{body}</NoticeRoot>
);

export default Notice;
