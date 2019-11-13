import React, { useState, useEffect, useRef } from 'react';
import pt from 'prop-types';
// import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Scrollbar from 'components/Scrollbar';
import ChatMessage from 'components/ChatMessage';

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

const Messages = ({
  messages,
  userLogin,
  isEven,
  isSplitChat,
  isShowTimestamps,
  onNameRightClick,
}) => {
  const [
    isMoreMessagesButtonVisible,
    setIsMoreMessagesButtonVisible,
  ] = useState(false);

  const handleScrollUpdate = ({
    clientHeight,
    contentScrollHeight,
    scrollTop,
  }) => {
    const maxScrollTop = contentScrollHeight - clientHeight;
    const isVisible = scrollTop + MORE_MESSAGES_OFFSET < maxScrollTop;

    setIsMoreMessagesButtonVisible(isVisible);
  };

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

  const getIsEven = (key) => {
    if (!isSplitChat) return false;
    return isEven ? key % 2 === 1 : key % 2 === 0;
  };

  return (
    <MessagesRoot>
      <StyledScrollbar onUpdate={handleScrollUpdate} ref={scrollbarRef}>
        {messages.map((message, key) => (
          <ChatMessage
            key={message.tags.id}
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
        visible={isMoreMessagesButtonVisible}
      >
        More messages below
      </MoreMessagesButton>
    </MessagesRoot>
  );
};

Messages.defaultProps = {
  messages: [],
  userLogin: '',
  isEven: false,
  isSplitChat: true,
  isShowTimestamps: false,
  onNameRightClick: () => {},
};

Messages.propTypes = {
  messages: pt.arrayOf(pt.shape({})),
  userLogin: pt.string,
  isEven: pt.bool,
  isSplitChat: pt.bool,
  isShowTimestamps: pt.bool,
  onNameRightClick: pt.func,
};

export default React.memo(Messages);
