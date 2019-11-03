import React, { useState, useEffect, useCallback, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const ChatInputRoot = styled.form`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #000;

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

  a {
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
const Textarea = styled.textarea`
  display: block;
  padding: 10px;
  width: 100%;
  height: 38px;
  max-height: 91px;
  min-height: 40px;
  overflow: hidden;
  border: 2px solid transparent;
  background-color: #262626;
  font-family: inherit;
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

const ChatInput = ({ isAuth, isDisabled, onSubmit }) => {
  const textareaRef = useRef(null);
  const [text, setText] = useState('');

  const handleChange = (e) => setText(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(text);
    setText('');
  };

  const handleKeyUp = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSubmit(text);
        setText('');
      }
    },
    [onSubmit, setText, text],
  );

  useEffect(() => {
    const textareaNode = textareaRef.current;

    textareaNode.addEventListener('keyup', handleKeyUp, false);

    return () => textareaNode.removeEventListener('keyup', handleKeyUp, false);
  }, [handleKeyUp]);

  return (
    <ChatInputRoot onSubmit={handleSubmit}>
      <Textarea
        name="message"
        placeholder="Send a message"
        ref={textareaRef}
        maxLength={500}
        disabled={isDisabled}
        onChange={handleChange}
        value={text}
      />
      <Controls>
        {!isAuth && <Link to="/auth">Login via Twitch</Link>}
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
