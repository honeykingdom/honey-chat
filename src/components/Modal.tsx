// https://nainacodes.com/blog/create-an-accessible-and-reusable-react-modal
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import CloseIconSvg from 'icons/close.svg';
import IconButton from './IconButton';

const Wrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 700;
  width: inherit;
  outline: 0;
`;
const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`;
const StyledModal = styled.div`
  z-index: 100;
  position: relative;
  margin: auto;
  padding: 8px 0;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  white-space: normal;
  color: #fff;
  border-radius: 4px;
`;
const Header = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  min-height: 30px;
`;
const HeaderText = styled.h2`
  margin: 0;
  font-size: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;
const CloseButton = styled(IconButton)`
  position: absolute;
  top: 0;
  right: 16px;
`;
const CloseIcon = styled(CloseIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;
const Content = styled.div`
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size: 13px;

  & > * {
    margin-right: -8px;
  }
`;

type Props = {
  title: string;
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose, children, title }: Props) => {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) onClose();
    };
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    document.addEventListener('keydown', onKeyDown, false);
    return () => document.removeEventListener('keydown', onKeyDown, false);
  }, [isOpen, onClose]);

  const renderModal = () => (
    <div>
      <Backdrop onClick={onClose} />
      <Wrapper aria-modal aria-labelledby={title} tabIndex={-1} role="dialog">
        <StyledModal>
          <Header>
            <HeaderText>{title}</HeaderText>
            <CloseButton onClick={onClose}>
              <CloseIcon />
            </CloseButton>
          </Header>
          <Content>{children}</Content>
        </StyledModal>
      </Wrapper>
    </div>
  );

  return isOpen ? ReactDOM.createPortal(renderModal(), document.body) : null;
};

export default Modal;
