import React, { useState, useEffect, useCallback, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useOnClickOutside from 'use-onclickoutside';

import { ReactComponent as SmileyFaceIconSvg } from 'icons/smiley-face.svg';
import { ReactComponent as GearsIconSvg } from 'icons/gears.svg';
import ChatModal from 'components/ChatModal';
import IconButton from 'components/IconButton';
import EmotePicker from 'components/EmotePicker';
import Options from 'components/Options';

const ChatInputRoot = styled.form`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const ControlsWrapper = styled.div`
  position: relative;
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
const SendButton = styled.button`
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
const TextareaWrapper = styled.div`
  position: relative;
`;
const EmotesModal = styled.div`
  position: absolute;
  top: auto;
  right: 0;
  bottom: 100%;
  margin-bottom: 8px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
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
const Textarea = styled.textarea`
  display: block;
  padding: 10px;
  width: 100%;
  height: 38px;
  max-height: 91px;
  min-height: 40px;
  overflow: hidden;
  border: 2px solid transparent;
  background-color: rgba(255, 255, 255, 0.15);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 4px;
  outline: none;
  color: #fff;
  resize: none;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transition-property: box-shadow, border, background-color;

  &:focus {
    background-color: #000;
    border-color: #9147ff;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const EmotesButton = styled(IconButton)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
const SmileyFaceIcon = styled(SmileyFaceIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
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

const ChatInput = ({ text, isAuth, isDisabled, onChangeText, onSubmit }) => {
  const textareaRef = useRef(null);
  const textareaWrapperRef = useRef(null);
  const optionsModalRef = useRef(null);

  const [isEmotesModalVisible, setIsEmotesModalVisible] = useState(false);
  const [isOptionsModalVisible, setIsOptionsModalVisible] = useState(false);

  const handleCloseEmotesModal = () => setIsEmotesModalVisible(false);
  const handleCloseOptionsModal = () => setIsOptionsModalVisible(false);

  useOnClickOutside(textareaWrapperRef, handleCloseEmotesModal);
  useOnClickOutside(optionsModalRef, handleCloseOptionsModal);

  const handleChange = (e) => onChangeText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    onChangeText('');
  };

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = text.trim();
        if (message) {
          onSubmit(message);
          onChangeText('');
        }
      }
    },
    [onSubmit, onChangeText, text],
  );

  useEffect(() => {
    const textareaNode = textareaRef.current;

    textareaNode.addEventListener('keydown', handleKeyDown, false);

    return () => {
      textareaNode.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  const renderEmotesModal = useCallback(
    () => (
      <EmotesModal>
        <ChatModal onClose={handleCloseEmotesModal}>
          <EmotePicker
            onEmoteClick={(emoteName) =>
              onChangeText((t) => `${t.trim()} ${emoteName} `.trimLeft())
            }
          />
        </ChatModal>
      </EmotesModal>
    ),
    [onChangeText],
  );

  const renderOptionsModal = useCallback(
    () => (
      <OptionsModal ref={optionsModalRef}>
        <ChatModal onClose={handleCloseOptionsModal}>
          <Options />
        </ChatModal>
      </OptionsModal>
    ),
    [],
  );

  return (
    <ChatInputRoot onSubmit={handleSubmit}>
      <TextareaWrapper ref={textareaWrapperRef}>
        {isEmotesModalVisible && renderEmotesModal()}
        <Textarea
          placeholder="Send a message"
          ref={textareaRef}
          maxLength={500}
          disabled={isDisabled}
          onChange={handleChange}
          value={text}
        />
        <EmotesButton
          onClick={() => setIsEmotesModalVisible(!isEmotesModalVisible)}
        >
          <SmileyFaceIcon />
        </EmotesButton>
      </TextareaWrapper>
      <ControlsWrapper>
        <Controls>
          {!isAuth && (
            <StyledLink to="/chat/auth">Sign in with Twitch</StyledLink>
          )}
          <IconButton
            onClick={() => setIsOptionsModalVisible(!isOptionsModalVisible)}
          >
            <GearsIcon />
          </IconButton>
          <SendButton disabled={isDisabled} type="submit">
            Chat
          </SendButton>
        </Controls>
        {isOptionsModalVisible && renderOptionsModal()}
      </ControlsWrapper>
    </ChatInputRoot>
  );
};

ChatInput.defaultProps = {
  isDisabled: false,
};

ChatInput.propTypes = {
  text: pt.string.isRequired,
  isAuth: pt.bool.isRequired,
  isDisabled: pt.bool,
  onChangeText: pt.func.isRequired,
  onSubmit: pt.func.isRequired,
};

export default ChatInput;
