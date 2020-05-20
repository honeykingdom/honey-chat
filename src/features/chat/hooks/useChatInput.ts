import { useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useSetState } from 'react-use';

import { SUGGESTION_TYPES } from 'utils/constants';
import getUsersByBeginText from 'features/chat/utils/getUsersByBeginText';
import getEmotesByText from 'features/emotes/utils/getEmotesByText';
import * as htmlEntity from 'features/messages/utils/htmlEntity';
import { usersSelector } from 'features/messages/messagesSelectors';
import { emotesSelector } from 'features/emotes/emotesSelectors';

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
  items: htmlEntity.Emote[];
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
    type === 'users'
      ? `@${currentItem}`
      : (currentItem as htmlEntity.Emote).alt;

  const textBefore = text.substring(0, start);
  const testAfter = text.substring(end) || ' ';

  return `${textBefore}${insertedText}${testAfter}`;
};

const useChatInput = (
  setText: (value: React.SetStateAction<string>) => void,
  onSendMessage: () => void,
  chatInputRef: React.RefObject<HTMLElement>,
) => {
  const [suggestions, setSuggestions] = useSetState<SuggestionsState>(
    suggestionsInitialState,
  );

  const emotes = useSelector(emotesSelector);
  const users = useSelector(usersSelector);

  const usersRef = useRef(users);
  usersRef.current = users;
  const emotesRef = useRef(emotes);
  emotesRef.current = emotes;
  const suggestionsRef = useRef(suggestions);
  suggestionsRef.current = suggestions;

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
        const items = getUsersByBeginText(
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
        const [, text] = emotesMatch;
        const items = getEmotesByText(
          text,
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

  const handleKeyUp = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {},
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
          onSendMessage();
        }
      }
    },
    [onSendMessage, setText, setSuggestions, suggestionsRef],
  );

  const handleSuggestionMouseEnter = useCallback(
    (activeIndex: number) => setSuggestions({ activeIndex }),
    [setSuggestions],
  );

  const handleSuggestionClick = useCallback(
    (activeIndex: number) => {
      setText((t) =>
        replaceSuggestionText(t, { ...suggestionsRef.current, activeIndex }),
      );

      if (chatInputRef.current) {
        chatInputRef.current.focus();
      }

      setSuggestions(suggestionsInitialState);
    },
    [setText, setSuggestions, chatInputRef],
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
