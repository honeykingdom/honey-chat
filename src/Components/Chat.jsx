import React, { useState, useEffect, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

import ChatInput from './ChatInput';
import ChatMessage from './ChatMessage';

const MORE_MESSAGES_OFFSET = 100;

const ChatRoot = styled.div`
  height: 100vh;
  background-color: #222;
  font-size: 12px;
`;
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  height: 100%;
  background-color: #000;
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
  right: 0;
  bottom: 10px;
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateX(-50%);
`;

const Chat = ({ messages }) => {
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

  useEffect(handleScrollToBottom, [messages]);

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
            {messages.map(({ name, color, text, emotes, isHistory }, key) => (
              <ChatMessage
                // eslint-disable-next-line react/no-array-index-key
                key={key}
                name={name}
                color={color}
                text={text}
                emotes={emotes}
                isHistory={isHistory}
              />
            ))}
          </Messages>
          {isMoreMessagesButtonVisible && (
            <MoreMessagesButton onClick={handleScrollToBottom}>
              More messages below
            </MoreMessagesButton>
          )}
        </MessagesWrapper>
        <ChatInput />
      </ChatWrapper>
    </ChatRoot>
  );
};

Chat.defaultProps = {
  messages: [],
};

Chat.propTypes = {
  messages: pt.arrayOf(pt.shape({})),
};

export default Chat;
