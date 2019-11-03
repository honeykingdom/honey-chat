import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Client } from 'tmi.js';
import tmiParser from 'tmi.js/lib/parser';
import Scrollbar from 'react-scrollbars-custom';

import { MAIN_CHANNEL_NAME, TWITCH_API_CLIENT_ID } from '../utils/constants';
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

const defaultOptions = {
  options: {
    clientId: TWITCH_API_CLIENT_ID,
  },
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: [MAIN_CHANNEL_NAME],
};

const parseEmotes = (emotes) => {
  if (typeof emotes !== 'string') return emotes;

  return emotes.split('/').reduce((acc, emote) => {
    const [emoteId, emoteIndexes] = emote.split(':');

    return {
      ...acc,
      [emoteId]: emoteIndexes.split(','),
    };
  }, {});
};

let client = null;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.user.login);
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

  useEffect(() => {
    const fetchData = async () => {
      const recentMessagesResponse = await fetch(
        `https://recent-messages.robotty.de/api/v2/recent-messages/${MAIN_CHANNEL_NAME}?clearchatToNotice=true`,
      );
      const recentMessages = await recentMessagesResponse.json();
      const normalizedRecentMessages = recentMessages.messages
        .map((rawMessage) => tmiParser.msg(rawMessage))
        .filter(({ command }) => command === 'PRIVMSG')
        .map(
          ({
            params: [, text],
            tags: { 'display-name': name, color, emotes },
          }) => ({
            name,
            color,
            text,
            emotes: parseEmotes(emotes),
            isHistory: true,
          }),
        );

      setMessages(normalizedRecentMessages);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const getOptions = () => {
      const authOptions = isAuth
        ? {
            identity: {
              username,
              password: `oauth:${localStorage.accessToken}`,
            },
          }
        : {};

      return {
        ...defaultOptions,
        ...authOptions,
      };
    };

    if (client) {
      client.disconnect();
    }

    if (isAuth) {
      const options = getOptions();
      client = new Client(options);

      client.connect();

      client.on('connected', () => setIsConnected(true));
      client.on('disconnected', () => setIsConnected(false));

      client.on(
        'message',
        (channel, { color, 'display-name': name, emotes }, text) => {
          const message = {
            name,
            color,
            emotes: parseEmotes(emotes),
            text,
          };
          setMessages((m) => [...m, message]);
        },
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [username]);

  const handleSubmit = (data) => {
    client.say(MAIN_CHANNEL_NAME, data);
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
