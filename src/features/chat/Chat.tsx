import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { isAuthSelector } from 'features/auth/authSelectors';
import {
  currentChannelSelector,
  isConnectedSelector,
} from 'features/chat/chatSelectors';
import { isFixedWidthSelector } from 'features/options/optionsSelectors';
import useInitializeAuth from 'features/auth/useInitializeAuth';
import useFetchChatData from 'features/chat/hooks/useFetchChatData';
import useCurrentChannel from 'features/chat/hooks/useCurrentChannel';
import useTwitchClient from 'features/chat/hooks/useTwitchClient';
import useChatInput from 'features/chat/hooks/useChatInput';

import ChatInput from 'features/chat/ChatInput';
import ChatControls from 'features/chat/ChatControls';
import Messages from 'features/messages/Messages';
import JoinChannel from 'features/chat/JoinChannel';

const ChatRoot = styled.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`;
const ChatWrapper = styled.div<{ $isFixedWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(p) => (p.$isFixedWidth ? '340px' : 'auto')};
  height: 100%;
  background-color: #18181b;
`;

const Chat = () => {
  const { sendMessage } = useTwitchClient();

  useInitializeAuth();
  useCurrentChannel();
  useFetchChatData();

  const currentChannel = useSelector(currentChannelSelector);
  const isAuth = useSelector(isAuthSelector);
  const isConnected = useSelector(isConnectedSelector);
  const isFixedWidth = useSelector(isFixedWidthSelector);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const chatInput = useChatInput(sendMessage, chatInputRef);

  const isDisabled = !isAuth || !isConnected;

  return (
    <ChatRoot>
      <ChatWrapper $isFixedWidth={isFixedWidth}>
        {currentChannel ? (
          <Messages onNameRightClick={chatInput.handleNameRightClick} />
        ) : (
          <JoinChannel />
        )}
        <ChatInput
          ref={chatInputRef}
          text={chatInput.inputText}
          suggestions={chatInput.suggestions}
          isDisabled={isDisabled}
          onEmoteClick={chatInput.handleEmoteClick}
          onChange={chatInput.handleChange}
          onKeyUp={chatInput.handleKeyUp}
          onKeyDown={chatInput.handleKeyDown}
          onBlur={chatInput.handleBlur}
          onSuggestionMouseEnter={chatInput.handleSuggestionMouseEnter}
          onSuggestionClick={chatInput.handleSuggestionClick}
        />
        <ChatControls
          isDisabled={isDisabled}
          onSendMessage={chatInput.handleSendMessage}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

export default Chat;
