import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppSelector } from 'app/hooks';
import {
  currentChannelNameSelector,
  currentChannelRecentInputsSelector,
  currentChannelUsersSelector,
  meLoginSelector,
} from 'features/chat';
import { emotesSelector, getEmotesByText } from 'features/emotes';
import { SUGGESTION_TYPES } from '../chatConstants';
import type { SendMessageFn, SuggestionsState } from '../chatTypes';
import useSuggestions from './useSuggestions';
import getUsersByBeginText from '../utils/getUsersByBeginText';

const replaceSuggestionText = (
  text: string,
  { type, items, activeIndex, start, end }: SuggestionsState,
) => {
  if (items.length === 0) return text;

  const currentItem = items[activeIndex];
  const insertedText =
    type === 'users' ? `@${currentItem}` : (currentItem as any).alt;

  const textBefore = text.substring(0, start);
  const testAfter = text.substring(end) || ' ';

  return `${textBefore}${insertedText}${testAfter}`;
};

type UseChatInputReturnType = {
  suggestions: ReturnType<typeof useSuggestions>;
  handleEmoteClick: (name: string) => void;
  handleChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  handleKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleBlur: () => void;
  handleSuggestionMouseEnter: (index: number) => void;
  handleSuggestionClick: (index: number) => void;
};

const useChatInput = (
  sendMessage: SendMessageFn,
  textareaRef: React.RefObject<HTMLTextAreaElement>,
): UseChatInputReturnType => {
  const [recentInputsIndex, setRecentInputsIndex] = useState(-1);

  const meLogin = useAppSelector(meLoginSelector);
  const channel = useAppSelector(currentChannelNameSelector);
  const emotes = useAppSelector(emotesSelector);
  const users = useAppSelector(currentChannelUsersSelector);
  const recentInputs = useAppSelector(currentChannelRecentInputsSelector);

  useEffect(() => {
    setRecentInputsIndex(0);
  }, [recentInputs]);

  const suggestions = useSuggestions();

  const getDeps = () => ({
    textarea: textareaRef.current!,
    meLogin,
    channel,
    emotes,
    users,
    recentInputs,
    recentInputsIndex,
    suggestions,
  });

  const deps = useRef({} as ReturnType<typeof getDeps>);

  deps.current = getDeps();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const d = deps.current;
      const { value, selectionStart } = e.target;

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
          d.meLogin!,
          SUGGESTION_TYPES.users.limit,
        );

        d.suggestions.set({
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

        d.suggestions.set({
          type: 'emotes',
          isActive: true,
          items,
          activeIndex: 0,
          start,
          end,
        });

        return;
      }

      if (d.suggestions.state.isActive) d.suggestions.reset();
    },
    [],
  );

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {},
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      const d = deps.current;

      if (d.suggestions.state.isActive) {
        if (e.key === 'Enter' || e.key === 'Tab') {
          e.preventDefault();
          d.textarea.value = replaceSuggestionText(
            d.textarea.value,
            d.suggestions.state,
          );
          d.suggestions.reset();
          return;
        }

        if (e.key === 'ArrowUp') {
          e.preventDefault();
          d.suggestions.up();
          return;
        }

        if (e.key === 'ArrowDown') {
          e.preventDefault();
          d.suggestions.down();
          return;
        }

        if (e.key === 'Escape') {
          d.suggestions.set({ isActive: false });
          return;
        }
      }

      if (!d.suggestions.state.isActive) {
        if (e.key === 'Enter') {
          e.preventDefault();
          sendMessage(d.channel!, d.textarea.value);
          return;
        }

        if (e.key === 'ArrowUp') {
          const isCaretAtBegin = e.currentTarget.selectionStart === 0;

          if (!isCaretAtBegin) return;
          if (d.recentInputsIndex >= d.recentInputs.length - 1) return;

          const newIndex = d.recentInputsIndex + 1;

          d.textarea.value = d.recentInputs[newIndex];
          setRecentInputsIndex(newIndex);

          return;
        }

        if (e.key === 'ArrowDown') {
          const isCaretAtEnd =
            e.currentTarget.selectionStart ===
            e.currentTarget.defaultValue.length;

          if (!isCaretAtEnd) return;
          if (d.recentInputsIndex <= 0) return;

          const newIndex = d.recentInputsIndex - 1;

          d.textarea.value = d.recentInputs[newIndex];
          setRecentInputsIndex(newIndex);
        }
      }
    },
    [deps],
  );

  const handleSuggestionMouseEnter = useCallback(
    (activeIndex: number) => suggestions.set({ activeIndex }),
    [],
  );

  const handleSuggestionClick = useCallback(
    (activeIndex: number) => {
      const d = deps.current;
      const newState = { ...d.suggestions.state, activeIndex };
      d.textarea.value = replaceSuggestionText(d.textarea.value, newState);
      d.textarea.focus();
      d.suggestions.reset();
    },
    [deps],
  );

  const handleBlur = useCallback(() => {
    const d = deps.current;
    d.suggestions.set({ isActive: false });
  }, [deps]);

  const handleEmoteClick = useCallback(
    (name: string) => {
      const d = deps.current;
      d.textarea.value = `${d.textarea.value.trim()} ${name} `;
    },
    [deps],
  );

  return {
    suggestions,
    handleChange,
    handleKeyUp,
    handleKeyDown,
    handleBlur,
    handleSuggestionMouseEnter,
    handleSuggestionClick,
    handleEmoteClick,
  };
};

export default useChatInput;
