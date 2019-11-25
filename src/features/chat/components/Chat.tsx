import React, { useState, useCallback, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useSetState from 'hooks/useSetState';
import { SUGGESTION_TYPES } from 'utils/constants';
import { isAuthSelector } from 'features/auth/authSlice';
import { isFixedWidthSelector } from 'features/options/optionsSelectors';
import useInitializeAuth from 'features/auth/hooks/useInitializeAuth';
import useFetchChatData from 'features/chat/hooks/useFetchChatData';
import useCurrentChannel from 'features/chat/hooks/useCurrentChannel';
import useTwitchClient from 'features/chat/hooks/useTwitchClient';
import {
  currentChannelSelector,
  usersSelector,
  emotesSelector,
  isConnectedSelector,
} from 'features/chat/selectors';
import getUserSuggestions from 'features/chat/utils/getUserSuggestions';
import getEmoteSuggestions from 'features/chat/utils/getEmoteSuggestions';
import { HtmlEntityEmote } from 'features/chat/utils/htmlEntity';
import replaceEmojis from 'features/chat/utils/replaceEmojis';
import ChatInput from 'features/chat/components/ChatInput';
import ChatControls from 'features/chat/components/ChatControls';
import Messages from 'features/chat/components/Messages';

const ChatRoot = styled.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`;
const ChatWrapper = styled.div<{ isFixedWidth: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${(p) => (p.isFixedWidth ? '340px' : 'auto')};
  height: 100%;
  background-color: #18181b;
`;

interface ASuggestions {
  isActive: boolean;
  activeIndex: number;
  start: number;
  end: number;
}

interface UserSuggestions extends ASuggestions {
  type: 'users';
  items: string[];
}
interface EmoteSuggestions extends ASuggestions {
  type: 'emotes';
  items: HtmlEntityEmote[];
}
export type SuggestionsState = UserSuggestions | EmoteSuggestions;

const suggestionsInitialState: SuggestionsState = {
  type: 'users',
  isActive: false,
  items: [],
  activeIndex: 0,
  start: 0,
  end: 0,
};

const setSuggestionsIndexUp = ({
  activeIndex,
  items,
  ...rest
}: SuggestionsState) =>
  ({
    activeIndex: activeIndex === 0 ? items.length - 1 : activeIndex - 1,
    items,
    ...rest,
  } as SuggestionsState);

const setSuggestionsIndexDown = ({
  activeIndex,
  items,
  ...rest
}: SuggestionsState) =>
  ({
    activeIndex: activeIndex === items.length - 1 ? 0 : activeIndex + 1,
    items,
    ...rest,
  } as SuggestionsState);

const replaceSuggestionText = (
  text: string,
  { type, items, activeIndex, start, end }: SuggestionsState,
) => {
  if (items.length === 0) return text;

  const currentItem = items[activeIndex];
  const insertedText =
    type === 'users' ? `@${currentItem}` : (currentItem as HtmlEntityEmote).alt;

  const textBefore = text.substring(0, start);
  const testAfter = text.substring(end) || ' ';

  return `${textBefore}${insertedText}${testAfter}`;
};

const Chat = () => {
  const [text, setText] = useState('');

  const client = useTwitchClient();

  useInitializeAuth();
  useCurrentChannel();
  useFetchChatData();

  const currentChannel = useSelector(currentChannelSelector);
  const emotes = useSelector(emotesSelector);
  const users = useSelector(usersSelector);
  const isAuth = useSelector(isAuthSelector);
  const isConnected = useSelector(isConnectedSelector);

  const isFixedWidth = useSelector(isFixedWidthSelector);
  const chatInputRef = useRef<HTMLTextAreaElement>(null);
  const [suggestions, setSuggestions] = useSetState<SuggestionsState>(
    suggestionsInitialState,
  );

  // Refs to avoid multiple renders
  const textRef = useRef(text);
  textRef.current = text;
  const usersRef = useRef(users);
  usersRef.current = users;
  const emotesRef = useRef(emotes);
  emotesRef.current = emotes;
  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;

  const isDisabled = !isAuth || !isConnected;

  const onSendMessage = useCallback(
    (message) => {
      if (!client) return;
      const normalizedMessage = replaceEmojis(message.trim());
      client.say(currentChannel, normalizedMessage);
    },
    [client, currentChannel],
  );

  const handleNameRightClick = useCallback(
    (name: string) => {
      setText((t) => `${t.trim()} @${name} `.trimLeft());
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    },
    [setText, chatInputRef],
  );

  const handleEmoteClick = useCallback(
    (name: string) => {
      setText((t) => `${t.trim()} ${name} `.trimLeft());
    },
    [setText],
  );

  const handleSendMessage = useCallback(() => {
    if (!textRef.current) return;
    onSendMessage(textRef.current);
    setText('');
  }, [onSendMessage, textRef, setText]);

  const handleBlur = useCallback(() => {
    setSuggestions({ isActive: false });
  }, [setSuggestions]);

  const handleChange = useCallback(
    (e) => {
      const { value, selectionStart } = e.target;

      setText(value);

      const spaceIndexBefore = value.lastIndexOf(' ', selectionStart - 1);
      const spaceIndexAfter = value.indexOf(' ', selectionStart);

      const start = spaceIndexBefore === -1 ? 0 : spaceIndexBefore + 1;
      const end = spaceIndexAfter === -1 ? value.length : spaceIndexAfter;

      const word = value.substring(start, end);

      const usersMatch = SUGGESTION_TYPES.users.regex.exec(word);

      if (usersMatch) {
        const [, beginText] = usersMatch;
        const items = getUserSuggestions(
          beginText,
          usersRef.current,
          SUGGESTION_TYPES.users.limit,
        );

        setSuggestions({
          type: 'users',
          isActive: true,
          items,
          activeIndex: 0,
          start,
          end,
        });

        return;
      }

      const emotesMatch = SUGGESTION_TYPES.emotes.regex.exec(word);

      if (emotesMatch && emotesRef.current) {
        const [, beginText] = emotesMatch;
        const items = getEmoteSuggestions(
          beginText,
          emotesRef.current,
          SUGGESTION_TYPES.emotes.limit,
        );

        setSuggestions({
          type: 'emotes',
          isActive: true,
          items,
          activeIndex: 0,
          start,
          end,
        });

        return;
      }

      if (suggestionsRef.current.isActive) {
        setSuggestions(suggestionsInitialState);
      }
    },
    [setText, setSuggestions, suggestionsRef],
  );

  const handleKeyUp = useCallback(() => {}, []);

  const handleKeyDown = useCallback(
    (e) => {
      if (suggestionsRef.current.isActive) {
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          setText((t) => replaceSuggestionText(t, suggestionsRef.current));
          setSuggestions(suggestionsInitialState);

          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSuggestions(setSuggestionsIndexUp);
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSuggestions(setSuggestionsIndexDown);
          return;
        }

        if (e.key === 'Escape') {
          setSuggestions({ isActive: false });
          return;
        }
      }

      if (!suggestionsRef.current.isActive) {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSendMessage();
        }
      }
    },
    [handleSendMessage, setSuggestions, suggestionsRef],
  );

  return (
    <ChatRoot>
      <ChatWrapper isFixedWidth={isFixedWidth}>
        <Messages onNameRightClick={handleNameRightClick} />
        <ChatInput
          ref={chatInputRef}
          text={text}
          suggestions={suggestions}
          isDisabled={isDisabled}
          onEmoteClick={handleEmoteClick}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <ChatControls
          isDisabled={isDisabled}
          onSendMessage={handleSendMessage}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

export default Chat;
