import React, { useState, useCallback, useRef } from 'react';
import pt from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import useSetState from 'hooks/useSetState';
import {
  messagesSelector,
  isEvenSelector,
  usersSelector,
} from 'reducers/messages/selectors';
import {
  isConnectedSelector,
  userColorSelector,
  userBadgesImagesSelector,
} from 'reducers/chat/selectors';
import {
  isShowTimestampsSelector,
  isSplitChatSelector,
  isFixedWidthSelector,
} from 'reducers/options/selectors';
import {
  userLoginSelector,
  userDisplayNameSelector,
  isAuthSelector,
} from 'reducers/auth/selectors';
import {
  emotesSelector,
  emoteCategoriesSelector,
} from 'reducers/emotes/selectors';
import { SUGGESTION_TYPES } from 'utils/constants';
import getUserSuggestions from 'utils/getUserSuggestions';
import getEmoteSuggestions from 'utils/getEmoteSuggestions';
import ChatInput from 'components/ChatInput';
import ChatControls from 'components/ChatControls';
import Messages from 'components/Messages';

const ChatRoot = styled.div`
  height: 100vh;
  font-size: 12px;
  background-color: #0e0e10;
`;
const ChatWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(p) => (p.isFixedWidth ? '340px' : 'auto')};
  height: 100%;
  background-color: #18181b;
`;

// TODO: check if the user has a rights to send messages

const suggestionsInitialState = {
  type: null,
  isActive: false,
  items: [],
  activeIndex: 0,
  start: 0,
  end: 0,
};

const setSuggestionsIndexUp = ({ activeIndex, items, ...rest }) => ({
  activeIndex: activeIndex === 0 ? items.length - 1 : activeIndex - 1,
  items,
  ...rest,
});

const setSuggestionsIndexDown = ({ activeIndex, items, ...rest }) => ({
  activeIndex: activeIndex === items.length - 1 ? 0 : activeIndex + 1,
  items,
  ...rest,
});

const replaceSuggestionText = (
  text,
  { type, items, activeIndex, start, end },
) => {
  if (items.length === 0) return text;

  const currentItem = items[activeIndex];
  const insertedText = type === 'users' ? `@${currentItem}` : currentItem.alt;

  const textBefore = text.substring(0, start);
  const testAfter = text.substring(end) || ' ';

  return `${textBefore}${insertedText}${testAfter}`;
};

const Chat = ({ onSendMessage }) => {
  const [text, setText] = useState('');
  const messages = useSelector(messagesSelector);
  const userLogin = useSelector(userLoginSelector);
  const userDisplayName = useSelector(userDisplayNameSelector);
  const userColor = useSelector(userColorSelector);
  const userBadgesImages = useSelector(userBadgesImagesSelector);
  const emoteCategories = useSelector(emoteCategoriesSelector);
  const emotes = useSelector(emotesSelector);
  const users = useSelector(usersSelector);
  const isAuth = useSelector(isAuthSelector);
  const isConnected = useSelector(isConnectedSelector);
  const isEven = useSelector(isEvenSelector);
  const isShowTimestamps = useSelector(isShowTimestampsSelector);
  const isSplitChat = useSelector(isSplitChatSelector);
  const isFixedWidth = useSelector(isFixedWidthSelector);
  const chatInputRef = useRef(null);
  const [suggestions, setSuggestions] = useSetState(suggestionsInitialState);

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

  const handleNameRightClick = useCallback(
    (name) => {
      setText((t) => `${t.trim()} @${name} `.trimLeft());
      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }
    },
    [setText, chatInputRef],
  );

  const handleEmoteClick = useCallback(
    (emoteName) => {
      setText((t) => `${t.trim()} ${emoteName} `.trimLeft());
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
          userDisplayName,
          SUGGESTION_TYPES.users.limit,
        );

        setSuggestions({
          type: SUGGESTION_TYPES.users.name,
          isActive: true,
          items,
          activeIndex: 0,
          start,
          end,
        });

        return;
      }

      const emotesMatch = SUGGESTION_TYPES.emotes.regex.exec(word);

      if (emotesMatch) {
        const [, beginText] = emotesMatch;
        const items = getEmoteSuggestions(
          beginText,
          emotesRef.current,
          SUGGESTION_TYPES.emotes.limit,
        );

        setSuggestions({
          type: SUGGESTION_TYPES.emotes.name,
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
    [setText, setSuggestions, suggestionsRef, userDisplayName],
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
        <Messages
          messages={messages}
          userLogin={userLogin}
          isEven={isSplitChat ? isEven : false}
          isShowTimestamps={isShowTimestamps}
          isSplitChat={isSplitChat}
          onNameRightClick={handleNameRightClick}
        />
        <ChatInput
          ref={chatInputRef}
          text={text}
          emoteCategories={emoteCategories}
          suggestions={suggestions}
          isDisabled={isDisabled}
          isAuth={isAuth}
          onEmoteClick={handleEmoteClick}
          onChange={handleChange}
          onKeyUp={handleKeyUp}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
        />
        <ChatControls
          userDisplayName={userDisplayName}
          userColor={userColor}
          userBadgesImages={userBadgesImages}
          isDisabled={isDisabled}
          isAuth={isAuth}
          onSendMessage={handleSendMessage}
        />
      </ChatWrapper>
    </ChatRoot>
  );
};

Chat.propTypes = {
  onSendMessage: pt.func.isRequired,
};

export default Chat;
