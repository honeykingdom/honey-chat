import React, { useState, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useOnClickOutside from 'use-onclickoutside';

import { ReactComponent as GearsIconSvg } from 'icons/gears.svg';
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
  flex-direction: row;
  justify-content: flex-end;
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
const SendButton = styled.button.attrs({ type: 'button' })`
  padding: 0 10px;
  height: 30px;
  border: none;
  color: #fff;
  background-color: #9147ff;
  outline: none;
  font-size: 12px;
  border-radius: 4px;
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
const GearsIcon = styled(GearsIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;
const StyledLink = styled(Link)`
  color: #bf94ff;
  text-decoration: none;

  &:focus,
  &:hover {
    color: #a970ff;
    text-decoration: underline;
  }

  &:visited {
    color: #a970ff;
  }
`;

const ChatControls = ({ isAuth, isDisabled, onSendMessage }) => {
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);
  const optionsModalRef = useRef(null);

  const handleCloseOptionsModal = () => setIsOptionsModalVisible(false);

  useOnClickOutside(optionsModalRef, handleCloseOptionsModal);

  return (
    <ChatControlsRoot>
      <Controls>
        {!isAuth && (
          <StyledLink to="/chat/auth">Sign in with Twitch</StyledLink>
        )}
        <IconButton
          onClick={() => setIsOptionsModalVisible(!isOptionsModalVisible)}
        >
          <GearsIcon />
        </IconButton>
        <SendButton disabled={isDisabled} onClick={onSendMessage}>
          Chat
        </SendButton>
      </Controls>
      {isOptionsModalVisible && (
        <OptionsModal ref={optionsModalRef}>
          <ChatModal onClose={handleCloseOptionsModal}>
            <Options />
          </ChatModal>
        </OptionsModal>
      )}
    </ChatControlsRoot>
  );
};

ChatControls.defaultProps = {
  isAuth: false,
  isDisabled: false,
};

ChatControls.propTypes = {
  isAuth: pt.bool,
  isDisabled: pt.bool,
  onSendMessage: pt.func.isRequired,
};

export default React.memo(ChatControls);
