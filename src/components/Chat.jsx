import React, { useState, useCallback, useRef } from 'react';
import pt from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { messagesSelector, isEvenSelector } from 'reducers/messages/selectors';
import { isConnectedSelector } from 'reducers/chat/selectors';
import {
  isShowTimestampsSelector,
  isSplitChatSelector,
} from 'reducers/options/selectors';
import { userLoginSelector, isAuthSelector } from 'reducers/auth/selectors';
import { emoteCategoriesSelector } from 'reducers/emotes/selectors';
import ChatInput from 'components/ChatInput';
import ChatControls from 'components/ChatControls';
import Messages from 'components/Messages';

const ChatRoot = styled.div`
  height: 100vh;
  font-size: 12px;
`;
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: #18181b;
`;

// TODO: check if the user has a rights to send messages

const Chat = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const messages = useSelector(messagesSelector);
  const userLogin = useSelector(userLoginSelector);
  const emoteCategories = useSelector(emoteCategoriesSelector);
  const isAuth = useSelector(isAuthSelector);
  const isConnected = useSelector(isConnectedSelector);
  const isEven = useSelector(isEvenSelector);
  const isShowTimestamps = useSelector(isShowTimestampsSelector);
  const isSplitChat = useSelector(isSplitChatSelector);
  const chatInputRef = useRef(null);

  // Ref to avoid multiple renders
  const textRef = useRef(text);
  textRef.current = text;

  const handleNameRightClick = useCallback(
    (name) => {
      setText((t) => `${t.trim()} @${name} `.trimLeft());
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    },
    [setText, chatInputRef],
  );

  const handleEmoteClick = useCallback(
    (emoteName) => {
      setText((t) => `${t.trim()} ${emoteName} `.trimLeft());
    },
    [setText],
  );

  const handleSendMessage = useCallback(() => {
    if (!textRef.current) return;
    onSendMessage(textRef.current);
    setText('');
  }, [onSendMessage, textRef, setText]);

  return (
    <ChatRoot>
      <ChatWrapper>
        <Messages
          messages={messages}
          userLogin={userLogin}
          isEven={isSplitChat ? isEven : false}
          isShowTimestamps={isShowTimestamps}
          isSplitChat={isSplitChat}
          onNameRightClick={handleNameRightClick}
        />
        <ChatInput
          ref={chatInputRef}
          text={text}
          emoteCategories={emoteCategories}
          isDisabled={!isAuth || !isConnected}
          isAuth={isAuth}
          onChangeText={setText}
          onSendMessage={handleSendMessage}
          onEmoteClick={handleEmoteClick}
        />
        <ChatControls
          isDisabled={!isAuth || !isConnected}
          isAuth={isAuth}
          onSendMessage={handleSendMessage}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

Chat.propTypes = {
  onSendMessage: pt.func.isRequired,
};

export default Chat;
