import React from 'react';
import styled from '@emotion/styled';

// import { ReactComponent as CloseIconSvg } from 'icons/close.svg';
import IconButton from 'components/IconButton';

const ChatModalRoot = styled.div`
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  white-space: normal;
  color: #fff;
  border-radius: 4px;
`;
const CloseButton = styled(IconButton).attrs({ $size: 'small' })`
  position: absolute;
  top: 5px;
  right: 5px;
`;
// const CloseIcon = styled(CloseIconSvg)`
//   display: block;
//   width: 20px;
//   height: 20px;
// `;

type Props = {
  children: React.ReactNode;
  onClose: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

const ChatModal = ({ children, onClose }: Props) => (
  <ChatModalRoot>
    <CloseButton onClick={onClose}>❌{/* <CloseIcon /> */}</CloseButton>
    {children}
  </ChatModalRoot>
);

export default ChatModal;
