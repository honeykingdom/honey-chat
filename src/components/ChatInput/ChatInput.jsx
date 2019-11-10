import React, { useState, useEffect, useCallback, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import useOnClickOutside from 'use-onclickoutside';

import { ReactComponent as SmileyFaceIconSvg } from 'icons/smiley-face.svg';
import EmotePicker from './EmotePicker';

const ChatInputRoot = styled.form`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const Controls = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;

  & > :not(:last-child) {
    margin-right: 20px;
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
const EmotePickerModal = styled.div`
  position: absolute;
  top: auto;
  left: 0;
  bottom: 100%;
  margin-bottom: 8px;
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
const IconsButton = styled.button.attrs({ type: 'button' })`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 5px;
  bottom: 5px;
  width: 30px;
  height: 30px;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    box-shadow: 0 0 6px 0 #772ce8;
  }
`;
const SmileyFaceIcon = styled(SmileyFaceIconSvg)`
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

const ChatInput = ({ isAuth, isDisabled, onSubmit }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const modalRef = React.useRef(null);

  const handleCloseModal = () => setIsModalVisible(false);

  useOnClickOutside(modalRef, handleCloseModal);

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  const handleEmoteClick = (emoteName) => setText(`${text} ${emoteName}`);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        const message = text.trim();
        if (message) {
          onSubmit(message);
          setText('');
        }
      }
    },
    [onSubmit, setText, text],
  );

  useEffect(() => {
    const textareaNode = textareaRef.current;

    textareaNode.addEventListener('keydown', handleKeyDown, false);

    return () => {
      textareaNode.removeEventListener('keydown', handleKeyDown, false);
    };
  }, [handleKeyDown]);

  return (
    <ChatInputRoot onSubmit={handleSubmit}>
      <TextareaWrapper>
        {isModalVisible && (
          <EmotePickerModal ref={modalRef}>
            <EmotePicker
              onClose={handleCloseModal}
              onEmoteClick={handleEmoteClick}
            />
          </EmotePickerModal>
        )}
        <Textarea
          placeholder="Send a message"
          ref={textareaRef}
          maxLength={500}
          disabled={isDisabled}
          onChange={handleChange}
          value={text}
        />
        <IconsButton onClick={() => setIsModalVisible(!isModalVisible)}>
          <SmileyFaceIcon />
        </IconsButton>
      </TextareaWrapper>
      <Controls>
        {!isAuth && (
          <StyledLink to="/chat/auth">Sign in with Twitch</StyledLink>
        )}
        <SendButton disabled={isDisabled} type="submit">
          Chat
        </SendButton>
      </Controls>
    </ChatInputRoot>
  );
};

ChatInput.defaultProps = {
  isDisabled: false,
};

ChatInput.propTypes = {
  isAuth: pt.bool.isRequired,
  isDisabled: pt.bool,
  onSubmit: pt.func.isRequired,
};

export default ChatInput;
