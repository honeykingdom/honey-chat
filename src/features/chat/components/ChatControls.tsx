import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

import useOnClickOutside from 'hooks/useOnClickOutside';
import { ReactComponent as GearsIconSvg } from 'icons/gears.svg';
import { ReactComponent as TwitchIconSvg } from 'icons/twitch.svg';
import IconButton from 'components/IconButton';
import ChatModal from 'components/ChatModal';
import Options from 'features/options/Options';
import { isAuthSelector, isAuthReadySelector } from 'features/auth/authSlice';

const ChatControlsRoot = styled.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;
const Controls = styled.div`
  display: flex;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 8px;
  }
`;
const OptionsModal = styled.div`
  position: absolute;
  top: auto;
  right: 10px;
  bottom: 100%;
  margin-bottom: 10px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`;
const buttonStyles = css`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 30px;
  border: none;
  color: #fff;
  background-color: #9147ff;
  outline: none;
  font-size: 12px;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    background-color: #772ce8;
  }

  &:active {
    background-color: #5c16c5;
  }

  &:focus {
    box-shadow: 0 0 6px 0 #772ce8;
  }

  &[disabled] {
    background-color: rgba(255, 255, 255, 0.26);
    color: rgba(255, 255, 255, 0.8);
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
const Button = styled.button.attrs({ type: 'button' })`
  ${buttonStyles};
`;
const SignInButton = styled(Link)`
  ${buttonStyles};
`;
const OptionsButton = styled(IconButton)`
  margin-left: auto;
`;
const GearsIcon = styled(GearsIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;
const TwitchIcon = styled(TwitchIconSvg)`
  display: block;
  margin-right: 4px;
  width: 20px;
  height: 20px;
`;

type Props = {
  isDisabled: boolean;
  onSendMessage: () => void;
};

const ChatControls = ({ isDisabled, onSendMessage }: Props) => {
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const optionsModalRef = useRef(null);
  const optionsButtonRef = useRef(null);
  const optionsNodesRef = useRef([optionsModalRef, optionsButtonRef]);

  const isAuthReady = useSelector(isAuthReadySelector);
  const isAuth = useSelector(isAuthSelector);

  const handleCloseOptionsModal = () => setIsOptionsModalVisible(false);
  useOnClickOutside(optionsNodesRef, handleCloseOptionsModal);

  const renderSignInButton = () => (
    <SignInButton to="/chat/auth">
      <TwitchIcon />
      Sign in with Twitch
    </SignInButton>
  );

  const renderOptionsModal = () => (
    <OptionsModal ref={optionsModalRef}>
      <ChatModal onClose={handleCloseOptionsModal}>
        <Options />
      </ChatModal>
    </OptionsModal>
  );

  return (
    <ChatControlsRoot>
      <Controls>
        {isAuthReady && !isAuth && renderSignInButton()}
        <OptionsButton
          ref={optionsButtonRef}
          onClick={() => setIsOptionsModalVisible((prev) => !prev)}
        >
          <GearsIcon />
        </OptionsButton>
        <Button disabled={isDisabled} onClick={onSendMessage}>
          Chat
        </Button>
      </Controls>
      {isOptionsModalVisible && renderOptionsModal()}
    </ChatControlsRoot>
  );
};

export default React.memo(ChatControls);
