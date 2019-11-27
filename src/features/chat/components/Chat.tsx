import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { isAuthSelector } from 'features/auth/authSlice';
import { isFixedWidthSelector } from 'features/options/optionsSelectors';
import useInitializeAuth from 'features/auth/hooks/useInitializeAuth';
import useFetchChatData from 'features/chat/hooks/useFetchChatData';
import useCurrentChannel from 'features/chat/hooks/useCurrentChannel';
import useTwitchClient from 'features/chat/hooks/useTwitchClient';
import useChatInput from 'features/chat/hooks/useChatInput';
import {
  currentChannelSelector,
  isConnectedSelector,
} from 'features/chat/selectors';
import ChatInput from 'features/chat/components/ChatInput';
import ChatControls from 'features/chat/components/ChatControls';
import Messages from 'features/chat/components/Messages';

const ChatRoot = styled.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`;
const ChatWrapper = styled.div<{ isFixedWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(p) => (p.isFixedWidth ? '340px' : 'auto')};
  height: 100%;
  background-color: #18181b;
`;

const Chat = () => {
  const [text, setText] = useState('');

  const client = useTwitchClient();

  useInitializeAuth();
  useCurrentChannel();
  useFetchChatData();

  const currentChannel = useSelector(currentChannelSelector);

  const isAuth = useSelector(isAuthSelector);
  const isConnected = useSelector(isConnectedSelector);

  const isFixedWidth = useSelector(isFixedWidthSelector);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);

  const textRef = useRef(text);
  textRef.current = text;

  const isDisabled = !isAuth || !isConnected;

  const handleSendMessage = useCallback(() => {
    if (!client || !textRef.current) return;

    client.say(currentChannel, textRef.current);

    setText('');
  }, [client, currentChannel, textRef, setText]);

  const chatInput = useChatInput(setText, handleSendMessage, chatInputRef);

  const handleNameRightClick = useCallback(
    (name: string) => {
      setText((t) => `${t.trim()} @${name} `.trimLeft());
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    },
    [setText, chatInputRef],
  );

  const handleEmoteClick = useCallback(
    (name: string) => {
      setText((t) => `${t.trim()} ${name} `.trimLeft());
    },
    [setText],
  );

  return (
    <ChatRoot>
      <ChatWrapper isFixedWidth={isFixedWidth}>
        <Messages onNameRightClick={handleNameRightClick} />
        <ChatInput
          ref={chatInputRef}
          text={text}
          suggestions={chatInput.suggestions}
          isDisabled={isDisabled}
          onEmoteClick={handleEmoteClick}
          onChange={chatInput.handleChange}
          onKeyUp={chatInput.handleKeyUp}
          onKeyDown={chatInput.handleKeyDown}
          onBlur={chatInput.handleBlur}
          onSuggestionMouseEnter={chatInput.handleSuggestionMouseEnter}
          onSuggestionClick={chatInput.handleSuggestionClick}
        />
        <ChatControls
          isDisabled={isDisabled}
          onSendMessage={handleSendMessage}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

export default Chat;
