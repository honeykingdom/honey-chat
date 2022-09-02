import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'app/hooks';
import { splitChatSelector } from 'features/options';
import Message from 'features/messages/components/Message';
import {
  currentChannelMessagesSelector,
  isFirstMessageAltBgSelector,
} from '../chatSelectors';

const MORE_MESSAGES_OFFSET = 128;

const ChatMessagesRoot = styled.div`
  position: relative;
  flex-grow: 1;
  font-size: 13px;
  overflow: hidden;
`;
const ChatMessagesContainer = styled.div`
  padding-bottom: 10px;
  overflow-y: scroll;
  height: 100%;
`;
const MoreMessagesButton = styled.button<{ $isVisible: boolean }>`
  position: absolute;
  left: 50%;
  bottom: 10px;
  display: ${(p) => (p.$isVisible ? 'block' : 'none')};
  padding: 5px 20px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 4px;
  border: none;
  outline: none;
  cursor: pointer;
  transform: translateX(-50%);
`;

const getIsAltBg = (isFirstAltBg: boolean | undefined, i: number) =>
  i % 2 === 0 ? !isFirstAltBg : !!isFirstAltBg;

type Props = {
  onNameClick?: (name: string) => void;
  onNameRightClick?: (name: string) => void;
};

const ChatMessages = ({ onNameClick, onNameRightClick }: Props) => {
  const [isButtonVisible, setIsButtonVisible] = useState(false);

  const messages = useAppSelector(currentChannelMessagesSelector);
  const isFirstAltBg = useAppSelector(isFirstMessageAltBgSelector);
  const splitChat = useAppSelector(splitChatSelector);

  const chatMessagesRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const el = e.currentTarget;
    const maxScrollTop = el.scrollHeight - el.offsetHeight;
    const isVisible = maxScrollTop - el.scrollTop > MORE_MESSAGES_OFFSET;
    setIsButtonVisible(isVisible);
  };

  const handleScrollToBottom = () => {
    chatMessagesRef.current?.scroll({
      top: chatMessagesRef.current?.scrollHeight,
    });
  };

  useEffect(() => {
    if (!isButtonVisible) handleScrollToBottom();
  }, [messages]);

  return (
    <ChatMessagesRoot>
      <ChatMessagesContainer ref={chatMessagesRef} onScroll={handleScroll}>
        {messages.map((message, i) => (
          <Message
            key={message.id}
            message={message}
            isAltBg={splitChat ? getIsAltBg(isFirstAltBg, i) : false}
            onNameClick={onNameClick}
            onNameRightClick={onNameRightClick}
          />
        ))}
      </ChatMessagesContainer>
      <MoreMessagesButton
        onClick={handleScrollToBottom}
        $isVisible={isButtonVisible}
      >
        More messages below
      </MoreMessagesButton>
    </ChatMessagesRoot>
  );
};

export default React.memo(ChatMessages);
