import { useState, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSetState } from 'react-use';

import { SUGGESTION_TYPES } from 'utils/constants';
import getUsersByBeginText from 'features/chat/utils/getUsersByBeginText';
import {
  suggestionsInitialState,
  setSuggestionsIndexUp,
  setSuggestionsIndexDown,
  replaceSuggestionText,
} from 'features/chat/utils/suggestions';
import getEmotesByText from 'features/emotes/utils/getEmotesByText';

import {
  usersSelector,
  recentUserMessagesSelector,
} from 'features/messages/messagesSelectors';
import { currentChannelSelector } from 'features/chat/chatSelectors';
import { emotesSelector } from 'features/emotes/emotesSelectors';

const useChatInput = (
  sendMessage: (channel: string, message: string) => void,
  chatInputRef: React.RefObject<HTMLTextAreaElement>,
) => {
  const [inputText, setInputText] = useState('');
  const [suggestions, setSuggestions] = useSetState(suggestionsInitialState);
  const [recentUserMessagesIndex, setRecentUserMessagesIndex] = useState(-1);

  const emotes = useSelector(emotesSelector);
  const users = useSelector(usersSelector);
  const currentChannel = useSelector(currentChannelSelector);
  const recentUserMessages = useSelector(recentUserMessagesSelector);

  const handleSendMessage = useCallback(() => {
    sendMessage(currentChannel, inputText);
    setInputText('');
    setRecentUserMessagesIndex(-1);
  }, [currentChannel, sendMessage, inputText]);

  const getDeps = () => ({
    chatInputRef,
    inputText,
    setInputText,
    suggestions,
    setSuggestions,
    recentUserMessagesIndex,
    setRecentUserMessagesIndex,
    emotes,
    users,
    recentUserMessages: [...recentUserMessages, ''],
    handleSendMessage,
  });

  const deps = useRef({} as ReturnType<typeof getDeps>);

  deps.current = getDeps();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const d = deps.current;
      const { value, selectionStart } = e.target;

      d.setInputText(value);

      const spaceIndexBefore = value.lastIndexOf(' ', selectionStart - 1);
      const spaceIndexAfter = value.indexOf(' ', selectionStart);

      const start = spaceIndexBefore === -1 ? 0 : spaceIndexBefore + 1;
      const end = spaceIndexAfter === -1 ? value.length : spaceIndexAfter;

      const word = value.substring(start, end);

      const usersMatch = SUGGESTION_TYPES.users.regex.exec(word);

      if (usersMatch) {
        const [, beginText] = usersMatch;
        const items = getUsersByBeginText(
          beginText,
          d.users,
          SUGGESTION_TYPES.users.limit,
        );

        d.setSuggestions({
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

      if (emotesMatch && d.emotes) {
        const [, text] = emotesMatch;
        const items = getEmotesByText(
          text,
          d.emotes,
          SUGGESTION_TYPES.emotes.limit,
        );

        d.setSuggestions({
          type: 'emotes',
          isActive: true,
          items,
          activeIndex: 0,
          start,
          end,
        });

        return;
      }

      if (d.suggestions.isActive) {
        d.setSuggestions(suggestionsInitialState);
      }
    },
    [deps],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {},
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const d = deps.current;

      if (d.suggestions.isActive) {
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          d.setInputText((t) => replaceSuggestionText(t, d.suggestions));
          d.setSuggestions(suggestionsInitialState);

          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          d.setSuggestions(setSuggestionsIndexUp);
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          d.setSuggestions(setSuggestionsIndexDown);
          return;
        }

        if (e.key === 'Escape') {
          d.setSuggestions({ isActive: false });
          return;
        }
      }

      if (!d.suggestions.isActive) {
        if (e.key === 'Enter') {
          e.preventDefault();
          d.handleSendMessage();
          return;
        }

        if (e.key === 'ArrowUp') {
          const isCaretAtBegin =
            (e.target as HTMLTextAreaElement).selectionStart === 0;

          if (!isCaretAtBegin) return;
          if (d.recentUserMessagesIndex >= d.recentUserMessages.length - 1)
            return;

          const newIndex = d.recentUserMessagesIndex + 1;

          d.setInputText(d.recentUserMessages[newIndex]);
          d.setRecentUserMessagesIndex(newIndex);

          return;
        }

        if (e.key === 'ArrowDown') {
          const isCaretAtEnd =
            (e.target as HTMLTextAreaElement).selectionStart ===
            (e.target as HTMLTextAreaElement).defaultValue.length;

          if (!isCaretAtEnd) return;
          if (d.recentUserMessagesIndex <= 0) return;

          const newIndex = d.recentUserMessagesIndex - 1;

          d.setInputText(d.recentUserMessages[newIndex]);
          d.setRecentUserMessagesIndex(newIndex);

          // eslint-disable-next-line no-useless-return
          return;
        }
      }
    },
    [deps],
  );

  const handleSuggestionMouseEnter = useCallback(
    (activeIndex: number) => setSuggestions({ activeIndex }),
    [setSuggestions],
  );

  const handleSuggestionClick = useCallback(
    (activeIndex: number) => {
      const d = deps.current;

      d.setInputText((t) =>
        replaceSuggestionText(t, { ...d.suggestions, activeIndex }),
      );

      if (d.chatInputRef.current) {
        d.chatInputRef.current.focus();
      }

      d.setSuggestions(suggestionsInitialState);
    },
    [deps],
  );

  const handleBlur = useCallback(() => {
    setSuggestions({ isActive: false });
  }, [setSuggestions]);

  const handleNameRightClick = useCallback(
    (name: string) => {
      const d = deps.current;
      d.setInputText((t) => `${t.trim()} @${name} `.trimLeft());

      if (d.chatInputRef.current) {
        d.chatInputRef.current.focus();
      }
    },
    [deps],
  );

  const handleEmoteClick = useCallback(
    (name: string) => {
      const d = deps.current;

      d.setInputText((t) => `${t.trim()} ${name} `.trimLeft());
    },
    [deps],
  );

  return {
    inputText,
    suggestions,
    handleSendMessage,
    handleChange,
    handleKeyUp,
    handleKeyDown,
    handleBlur,
    handleSuggestionMouseEnter,
    handleSuggestionClick,
    handleNameRightClick,
    handleEmoteClick,
  };
};

export default useChatInput;
