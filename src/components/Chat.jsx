import React, { useState, useEffect, useRef } from 'react';
import pt from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { messagesSelector } from 'reducers/messages/selectors';
import { isEvenSelector } from 'reducers/chat/selectors';
import {
  isShowTimestampsSelector,
  isSplitChatSelector,
} from 'reducers/options/selectors';
import Scrollbar from 'components/Scrollbar';
import ChatInput from 'components/ChatInput';
import ChatMessage from 'components/ChatMessage';

const MORE_MESSAGES_OFFSET = 100;

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
const Messages = styled.div`
  position: relative;
  flex-grow: 1;
`;
const StyledScrollbar = styled(Scrollbar)`
  .ScrollbarsCustom-Content {
    padding-bottom: 10px !important;
  }
`;
const MoreMessagesButton = styled.button`
  position: absolute;
  left: 50%;
  bottom: 10px;
  display: ${(p) => (p.visible ? 'block' : 'none')};
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateX(-50%);
`;

const Chat = ({ onSendMessage }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const messages = useSelector(messagesSelector);
  // TODO: check if the user has a rights to send messages
  const isConnected = useSelector((state) => state.chat.isConnected);
  const isEven = useSelector(isEvenSelector);
  const login = useSelector((state) => state.auth.user.login);
  const isShowTimestamps = useSelector(isShowTimestampsSelector);
  const isSplitChat = useSelector(isSplitChatSelector);
  const [
    isMoreMessagesButtonVisible,
    setIsMoreMessagesButtonVisible,
  ] = useState(false);
  const scrollbarRef = useRef(null);

  const handleScrollToBottom = () => {
    if (scrollbarRef.current && scrollbarRef.current.scrollToBottom) {
      scrollbarRef.current.scrollToBottom();
    }
  };

  useEffect(() => {
    if (!isMoreMessagesButtonVisible) {
      handleScrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const handleScrollUpdate = ({
    clientHeight,
    contentScrollHeight,
    scrollTop,
  }) => {
    const maxScrollTop = contentScrollHeight - clientHeight;
    const isVisible = scrollTop + MORE_MESSAGES_OFFSET < maxScrollTop;

    setIsMoreMessagesButtonVisible(isVisible);
  };

  const getIsEven = (key) => {
    if (!isSplitChat) return false;
    return isEven ? key % 2 === 1 : key % 2 === 0;
  };

  return (
    <ChatRoot>
      <ChatWrapper>
        <Messages>
          <StyledScrollbar onUpdate={handleScrollUpdate} ref={scrollbarRef}>
            {messages.map((message, key) => (
              <ChatMessage
                key={message.tags.id}
                message={message}
                login={login}
                isEven={getIsEven(key)}
                isShowTimestamps={isShowTimestamps}
              />
            ))}
          </StyledScrollbar>
          <MoreMessagesButton
            onClick={handleScrollToBottom}
            visible={isMoreMessagesButtonVisible}
          >
            More messages below
          </MoreMessagesButton>
        </Messages>
        <ChatInput
          onSubmit={onSendMessage}
          isDisabled={!isAuth || !isConnected}
          isAuth={isAuth}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

Chat.propTypes = {
  onSendMessage: pt.func.isRequired,
};

export default Chat;
