import React, { useState, useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'components/Button';

const JoinChannelRoot = styled.div`
  padding: 10px;
  flex-grow: 1;
  width: 320px;
`;
const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  padding: 0;
  color: #fff;
`;
const Controls = styled.div`
  display: flex;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`;
const Input = styled.input`
  display: block;
  padding: 4px 10px;
  width: 100%;
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
const JoinButton = styled(Button)`
  flex-shrink: none;
`;

const JoinChannel = () => {
  const history = useHistory();
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleChangeChannel = () => {
    history.push({
      pathname: '/chat/',
      hash: value,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleChangeChannel();
    }
  };

  return (
    <JoinChannelRoot>
      <Title>Channel to join: </Title>
      <Controls>
        <Input
          ref={inputRef}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <JoinButton onClick={handleChangeChannel} disabled={!value}>
          Join
        </JoinButton>
      </Controls>
    </JoinChannelRoot>
  );
};

export default JoinChannel;
