import { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSetState } from 'react-use';

import { SUGGESTION_TYPES } from 'utils/constants';
import getUsersByBeginText from 'features/chat/utils/getUsersByBeginText';
import getEmotesByText from 'features/emotes/utils/getEmotesByText';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import {
  usersSelector,
  recentUserMessagesSelector,
} from 'features/messages/messagesSelectors';
import { emotesSelector } from 'features/emotes/emotesSelectors';

const useChatInput = (
  setText: (value: React.SetStateAction<string>) => void,
  onSendMessage: () => void,
  chatInputRef: React.RefObject<HTMLElement>,
  recentUserMessageIndexRef: React.RefObject<{
    recentUserMessageIndex: number;
    setRecentUserMessageIndex: React.Dispatch<React.SetStateAction<number>>;
  }>,
) => {
  const [suggestions, setSuggestions] = useSetState<SuggestionsState>(
    suggestionsInitialState,
  );

  const emotes = useSelector(emotesSelector);
  const users = useSelector(usersSelector);
  const recentUserMessages = useSelector(recentUserMessagesSelector);

  const getDeps = () => ({
    setText,
    onSendMessage,
    chatInputRef,
    suggestions,
    setSuggestions,
    emotes,
    users,
    recentUserMessages: [...recentUserMessages, ''],
    recentUserMessageIndex: recentUserMessageIndexRef.current
      ?.recentUserMessageIndex as number,
    setRecentUserMessageIndex: recentUserMessageIndexRef.current
      ?.setRecentUserMessageIndex as React.Dispatch<
      React.SetStateAction<number>
    >,
  });

  const deps = useRef({} as ReturnType<typeof getDeps>);

  deps.current = getDeps();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const d = deps.current;
      const { value, selectionStart } = e.target;

      d.setText(value);

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
          d.setText((t) => replaceSuggestionText(t, d.suggestions));
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
          d.onSendMessage();
          return;
        }

        if (e.key === 'ArrowUp') {
          const isCaretAtBegin =
            (e.target as HTMLTextAreaElement).selectionStart === 0;

          if (!isCaretAtBegin) return;
          if (d.recentUserMessageIndex >= d.recentUserMessages.length - 1)
            return;

          const newIndex = d.recentUserMessageIndex + 1;

          d.setText(d.recentUserMessages[newIndex]);
          d.setRecentUserMessageIndex(newIndex);

          return;
        }

        if (e.key === 'ArrowDown') {
          const isCaretAtEnd =
            (e.target as HTMLTextAreaElement).selectionStart ===
            (e.target as HTMLTextAreaElement).defaultValue.length;

          if (!isCaretAtEnd) return;
          if (d.recentUserMessageIndex <= 0) return;

          const newIndex = d.recentUserMessageIndex - 1;

          d.setText(d.recentUserMessages[newIndex]);
          d.setRecentUserMessageIndex(newIndex);

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

      d.setText((t) =>
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

  return {
    suggestions,
    handleChange,
    handleKeyUp,
    handleKeyDown,
    handleBlur,
    handleSuggestionMouseEnter,
    handleSuggestionClick,
  };
};

export default useChatInput;
