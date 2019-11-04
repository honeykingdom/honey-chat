import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { pick } from 'ramda';
import styled from 'styled-components';
import Scrollbar from 'react-scrollbars-custom';

import { MAIN_CHANNEL_NAME } from '../utils/constants';
import Client from '../utils/twitchChat';
import { fetchRecentMessages, addMessage } from '../reducers/messages';
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

let client = null;

const Chat = () => {
  const dispatch = useDispatch();
  const [isConnected, setIsConnected] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.user.login);
  const messages = useSelector((state) => state.messages.items);
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

  useEffect(() => {
    fetchRecentMessages(dispatch)(MAIN_CHANNEL_NAME);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (client) {
      client.disconnect();
    }

    if (isAuth) {
      const options = {
        identity: {
          name: username,
          auth: localStorage.accessToken,
        },
      };
      client = new Client(options);

      client.connect();

      client.join(MAIN_CHANNEL_NAME);

      client.on('connected', () => setIsConnected(true));
      client.on('disconnected', () => setIsConnected(false));

      const handleMessage = (data) => {
        const normalizedData = pick(['tags', 'message', 'isAction'], data);
        dispatch(addMessage(normalizedData));
      };

      client.on('message', handleMessage);
      client.on('own-message', handleMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSubmit = (message) => {
    client.say(MAIN_CHANNEL_NAME, message);
  };

  return (
    <ChatRoot>
      <ChatWrapper>
        <MessagesWrapper>
          <Messages onUpdate={handleScrollUpdate} ref={messagesRef}>
            {messages.map(({ message, tags, isAction, isHistory }) => (
              <ChatMessage
                key={tags.id}
                message={message}
                tags={tags}
                isAction={isAction}
                isHistory={isHistory}
              />
            ))}
          </Messages>
          <MoreMessagesButton
            onClick={handleScrollToBottom}
            visible={isMoreMessagesButtonVisible}
          >
            More messages below
          </MoreMessagesButton>
        </MessagesWrapper>
        <ChatInput
          onSubmit={handleSubmit}
          isDisabled={!isAuth || !isConnected}
          isAuth={isAuth}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

export default Chat;
