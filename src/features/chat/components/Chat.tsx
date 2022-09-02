import { useCallback, useRef } from 'react';
import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { type AllEmotes, emotesSelector } from 'features/emotes';
import { useAuth } from 'features/auth';
import { replaceEmojis } from 'features/messages';
import { messageSended } from '../chatThunks';
import { currentChannelNameSelector } from '../chatSelectors';
import useTwitchClient from '../hooks/useTwitchClient';
import useFetchChatData from '../hooks/useFetchChatData';
import useInitializeTabs from '../hooks/useInitializeTabs';
import ChatTabs from './ChatTabs';
import ChatInput from './ChatInput';
import ChatControls from './ChatControls';
import ChatMessages from './ChatMessages';

const ChatRoot = styled.main`
  display: flex;
  flex-direction: column;
  height: 100vh;
  max-height: 100vh;
  background-color: #18181b;
`;

const Chat = () => {
  // TODO: fix dispatch types
  const dispatch = useAppDispatch() as any;

  const channel = useAppSelector(currentChannelNameSelector);
  const emotes = useAppSelector(emotesSelector);

  useAuth();
  const chatRef = useTwitchClient();
  useFetchChatData();
  useInitializeTabs();

  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const channelRef = useRef<string>();
  const emotesRef = useRef<AllEmotes>();

  channelRef.current = channel;
  emotesRef.current = emotes;

  const sendMessage = useCallback(
    (channelName: string, message: string) => {
      if (!textareaRef.current || !chatRef.current || !message.trim()) return;
      textareaRef.current.value = '';
      const normalizedMessage = replaceEmojis(
        emotesRef.current?.emoji,
        message.trim(),
      );
      chatRef.current.say(channelName, normalizedMessage);
      dispatch(messageSended({ channelName, message: normalizedMessage }));
    },
    [chatRef, textareaRef, emotesRef],
  );

  const handleSendMessage = useCallback(() => {
    const channel = channelRef.current;
    const text = textareaRef.current?.value;
    if (!channel || !text) return;
    sendMessage(channel, text);
  }, [textareaRef, channelRef, sendMessage]);

  const handleNameRightClick = useCallback(
    (name: string) => {
      if (!textareaRef.current) return;
      textareaRef.current.value = `${textareaRef.current.value.trim()} @${name} `;
      textareaRef.current.focus();
    },
    [textareaRef],
  );

  return (
    <ChatRoot>
      <ChatTabs chat={chatRef} />
      <ChatMessages onNameRightClick={handleNameRightClick} />
      <ChatInput ref={textareaRef} sendMessage={sendMessage} />
      <ChatControls onChatClick={handleSendMessage} />
    </ChatRoot>
  );
};

export default Chat;
