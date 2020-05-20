import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import type ScrollbarType from 'react-scrollbars-custom';
import type { ScrollState } from 'react-scrollbars-custom/dist/types/types';

import Scrollbar from 'components/Scrollbar';
import ChatMessage from 'features/messages/ChatMessage';
import {
  messagesSelector,
  isEvenSelector,
} from 'features/messages/messagesSelectors';
import {
  isShowTimestampsSelector,
  isSplitChatSelector,
} from 'features/options/optionsSelectors';
import { userLoginSelector } from 'features/auth/authSelectors';

const MORE_MESSAGES_OFFSET = 100;

const MessagesRoot = styled.div`
  position: relative;
  flex-grow: 1;
`;
const StyledScrollbar = styled(Scrollbar)`
  .ScrollbarsCustom-Content {
    padding-bottom: 10px !important;
  }
`;
const MoreMessagesButton = styled.button<{ isVisible: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 10px;
  display: ${(p) => (p.isVisible ? 'block' : 'none')};
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateX(-50%);
`;

type Props = {
  onNameRightClick: (name: string) => void;
};

const Messages = ({ onNameRightClick }: Props) => {
  const [
    isMoreMessagesButtonVisible,
    setIsMoreMessagesButtonVisible,
  ] = useState(false);

  const messages = useSelector(messagesSelector);
  const userLogin = useSelector(userLoginSelector);

  const isEven = useSelector(isEvenSelector);
  const isShowTimestamps = useSelector(isShowTimestampsSelector);
  const isSplitChat = useSelector(isSplitChatSelector);

  const handleScrollUpdate = ({
    clientHeight,
    contentScrollHeight,
    scrollTop,
  }: ScrollState) => {
    const maxScrollTop = contentScrollHeight - clientHeight;
    const isVisible = scrollTop + MORE_MESSAGES_OFFSET < maxScrollTop;

    setIsMoreMessagesButtonVisible(isVisible);
  };

  const scrollbarRef = useRef<ScrollbarType>(null);

  const handleScrollToBottom = () => {
    if (scrollbarRef.current) {
      scrollbarRef.current.scrollToBottom();
    }
  };

  useEffect(() => {
    if (!isMoreMessagesButtonVisible) {
      handleScrollToBottom();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const getIsEven = (key: number) => {
    if (!isSplitChat) return false;
    return isEven ? key % 2 === 1 : key % 2 === 0;
  };

  return (
    <MessagesRoot>
      <StyledScrollbar onUpdate={handleScrollUpdate} ref={scrollbarRef}>
        {messages.map((message, key) => (
          <ChatMessage
            key={message.id}
            message={message}
            userLogin={userLogin}
            isEven={getIsEven(key)}
            isShowTimestamps={isShowTimestamps}
            onNameRightClick={onNameRightClick}
          />
        ))}
      </StyledScrollbar>
      <MoreMessagesButton
        onClick={handleScrollToBottom}
        isVisible={isMoreMessagesButtonVisible}
      >
        More messages below
      </MoreMessagesButton>
    </MessagesRoot>
  );
};

export default Messages;
