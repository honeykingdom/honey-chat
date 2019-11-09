import React, { useState, useEffect, useRef } from 'react';
import pt from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { pathOr } from 'ramda';
import Scrollbar from 'react-scrollbars-custom';

import { currentChannelSelector } from '../reducers/chat';
import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

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
const MessagesWrapper = styled.div`
  position: relative;
  flex-grow: 1;
`;
const Messages = styled(Scrollbar).attrs({
  disableTracksWidthCompensation: true,
})`
  overflow-y: auto;

  .ScrollbarsCustom-TrackY {
    background: none !important;
  }

  .ScrollbarsCustom-ThumbY {
    margin-left: auto;
    margin-right: auto;
    width: 6px !important;
  }

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

const messagesSelector = (state) =>
  pathOr([], ['messages', currentChannelSelector(state), 'items'], state);

const isEvenSelector = (state) =>
  pathOr(false, ['messages', currentChannelSelector(state), 'isEven'], state);

const Chat = ({ onSendMessage }) => {
  const isAuth = useSelector((state) => state.auth.isAuth);
  const messages = useSelector(messagesSelector);
  // TODO: check if the user has a rights to send messages
  const isConnected = useSelector((state) => state.chat.isConnected);
  const isEven = useSelector(isEvenSelector);
  const login = useSelector((state) => state.auth.user.login);
  const [
    isMoreMessagesButtonVisible,
    setIsMoreMessagesButtonVisible,
  ] = useState(false);
  const messagesRef = useRef(null);

  const handleScrollToBottom = () => {
    if (messagesRef.current && messagesRef.current.scrollToBottom) {
      messagesRef.current.scrollToBottom();
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

  return (
    <ChatRoot>
      <ChatWrapper>
        <MessagesWrapper>
          <Messages onUpdate={handleScrollUpdate} ref={messagesRef}>
            {messages.map(
              (
                {
                  message,
                  messageArray,
                  tags,
                  badges,
                  user,
                  isAction,
                  isHistory,
                  isDeleted,
                },
                key,
              ) => (
                <ChatMessage
                  key={tags.id}
                  message={message}
                  messageArray={messageArray}
                  tags={tags}
                  badges={badges}
                  user={user}
                  login={login}
                  isAction={isAction}
                  isHistory={isHistory}
                  isDeleted={isDeleted}
                  isEven={isEven ? key % 2 === 1 : key % 2 === 0}
                />
              ),
            )}
          </Messages>
          <MoreMessagesButton
            onClick={handleScrollToBottom}
            visible={isMoreMessagesButtonVisible}
          >
            More messages below
          </MoreMessagesButton>
        </MessagesWrapper>
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
