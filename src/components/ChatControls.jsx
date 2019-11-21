import React, { useState, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useOnClickOutside from 'use-onclickoutside';

import { ReactComponent as GearsIconSvg } from 'icons/gears.svg';
import { ReactComponent as TwitchIconSvg } from 'icons/twitch.svg';
import IconButton from 'components/IconButton';
import ChatModal from 'components/ChatModal';
import Options from 'components/Options';

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
  right: 0;
  bottom: 100%;
  margin-bottom: 10px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`;
const Button = styled.button.attrs({ type: 'button' })`
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

const ChatControls = ({
  userDisplayName,
  userColor,
  userBadgesImages,
  isAuth,
  isDisabled,
  onSendMessage,
}) => {
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const optionsModalRef = useRef(null);

  const handleCloseOptionsModal = () => setIsOptionsModalVisible(false);

  useOnClickOutside(optionsModalRef, handleCloseOptionsModal);

  const renderSignInButton = () => (
    <Button as={Link} to="/chat/auth">
      <TwitchIcon />
      Sign in with Twitch
    </Button>
  );

  const renderOptionsModal = () => (
    <OptionsModal ref={optionsModalRef}>
      <ChatModal onClose={handleCloseOptionsModal}>
        <Options
          isAuth={isAuth}
          userDisplayName={userDisplayName}
          userColor={userColor}
          userBadgesImages={userBadgesImages}
        />
      </ChatModal>
    </OptionsModal>
  );

  return (
    <ChatControlsRoot>
      <Controls>
        {!isAuth && renderSignInButton()}
        <OptionsButton
          onClick={() => setIsOptionsModalVisible(!isOptionsModalVisible)}
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

ChatControls.defaultProps = {
  userDisplayName: '',
  userColor: '',
  userBadgesImages: [],
  isDisabled: false,
};

ChatControls.propTypes = {
  userDisplayName: pt.string,
  userColor: pt.string,
  userBadgesImages: pt.arrayOf(pt.shape({})),
  isAuth: pt.bool.isRequired,
  isDisabled: pt.bool,
  onSendMessage: pt.func.isRequired,
};

export default React.memo(ChatControls);
