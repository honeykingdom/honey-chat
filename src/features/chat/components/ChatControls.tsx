import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import useOnClickOutside from 'react-cool-onclickoutside';
import { ReactComponent as GearsIconSvg } from 'icons/gears.svg';
import { ReactComponent as TwitchIconSvg } from 'icons/twitch.svg';
import Button from 'components/Button';
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

  const isAuthReady = useSelector(isAuthReadySelector);
  const isAuth = useSelector(isAuthSelector);

  const handleCloseOptionsModal = () => setIsOptionsModalVisible(false);
  useOnClickOutside(
    [optionsModalRef, optionsButtonRef],
    handleCloseOptionsModal,
  );

  const renderSignInButton = () => (
    <Button as={Link} to="/chat/auth">
      <TwitchIcon />
      Sign in with Twitch
    </Button>
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
