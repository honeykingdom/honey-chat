/* eslint-disable react/prop-types */
import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled, { css } from 'styled-components';
import useOnClickOutside from 'hooks/useOnClickOutside';

import ChatModal from 'components/ChatModal';
import IconButton from 'components/IconButton';
import { ReactComponent as SmileyFaceIconSvg } from 'icons/smiley-face.svg';
import EmotePicker from 'features/chat/components/EmotePicker';
import { SuggestionsState } from 'features/chat/components/Chat';
import { isEmotesLoadedSelector } from 'features/chat/selectors';
import { HtmlEntityEmote } from 'features/chat/utils/htmlEntity';

const ChatInputRoot = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const ChatInputInner = styled.div`
  position: relative;
`;
const Suggestions = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 100%;
  margin-left: -5px;
  margin-bottom: -5px;
  margin-right: -5px;
  margin-bottom: 0;
  padding-top: 10px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-bottom: none;
  background-color: #18181b;
  color: #fff;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0px 2px rgba(0, 0, 0, 0.1); */
`;
const SuggestionItem = styled.div<{ isActive: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 2px;
  background-color: ${(p) =>
    p.isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
  cursor: pointer;
`;
const SuggestionImage = styled.img`
  margin-right: 8px;
  width: 28px;
  height: 28px;
  object-fit: contain;
`;
const TextareaInput = styled.div`
  position: relative;
`;
const TextareaWrapper = styled.div<{ isSuggestions: boolean }>`
  ${(p) =>
    p.isSuggestions &&
    css`
      margin-left: -5px;
      margin-bottom: -5px;
      margin-right: -5px;
      padding: 5px;
      border: 1px solid rgba(255, 255, 255, 0.15);
      border-top: none;
      border-bottom-left-radius: 6px;
      border-bottom-right-radius: 6px;
      /* box-shadow: 0 2px 3px -1px rgba(0, 0, 0, 0.1),
        0 2px 2px -2px rgba(0, 0, 0, 0.02); */

      & > ${TextareaInput} {
        margin-left: -1px;
        margin-bottom: -1px;
        margin-right: -1px;
      }
    `};
`;
const EmotesModal = styled.div`
  position: absolute;
  top: auto;
  right: 0;
  bottom: 100%;
  margin-bottom: 8px;
  width: 320px;
  height: 405px;
  min-width: 0;
  white-space: nowrap;
`;
const Textarea = styled.textarea`
  display: block;
  padding: 10px;
  width: 100%;
  height: 38px;
  max-height: 91px;
  min-height: 40px;
  overflow: hidden;
  border: 2px solid transparent;
  background-color: rgba(255, 255, 255, 0.15);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 4px;
  outline: none;
  color: #fff;
  resize: none;
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transition-property: box-shadow, border, background-color;

  &:focus {
    background-color: #000;
    border-color: #9147ff;
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const EmotesButton = styled(IconButton)`
  position: absolute;
  right: 5px;
  bottom: 5px;
`;
const SmileyFaceIcon = styled(SmileyFaceIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;

type Props = {
  text: string;
  suggestions: SuggestionsState;
  isDisabled: boolean;
  onEmoteClick: (name: string) => void;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyUp: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
  onSuggestionMouseEnter: (index: number) => void;
  onSuggestionClick: (index: number) => void;
};

const ChatInput = React.forwardRef<HTMLTextAreaElement, Props>(
  (
    {
      text,
      suggestions,
      isDisabled,
      onEmoteClick,
      onChange,
      onKeyUp,
      onKeyDown,
      onBlur,
      onSuggestionMouseEnter,
      onSuggestionClick,
    },
    textareaRef,
  ) => {
    const chatInputRef = useRef(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);
    const suggestionNodesRef = useRef<React.RefObject<HTMLElement>[]>([
      textareaRef,
      suggestionsRef,
    ] as React.RefObject<HTMLElement>[]);

    useOnClickOutside(suggestionNodesRef, () => onBlur());

    const [isEmotesModalVisible, setIsEmotesModalVisible] = useState(false);
    const isEmotesLoaded = useSelector(isEmotesLoadedSelector);
    const handleCloseEmotesModal = () => setIsEmotesModalVisible(false);

    useOnClickOutside(chatInputRef, handleCloseEmotesModal);

    const renderSuggestions = ({
      type,
      items,
      activeIndex,
    }: SuggestionsState) => {
      const renderUser = (name: string, index: number) => (
        <SuggestionItem
          key={name}
          isActive={index === activeIndex}
          onMouseEnter={() => onSuggestionMouseEnter(index)}
          onClick={() => onSuggestionClick(index)}
        >
          {name}
        </SuggestionItem>
      );

      const renderEmote = (
        { src, srcSet, alt }: HtmlEntityEmote,
        index: number,
      ) => (
        <SuggestionItem
          key={alt}
          isActive={index === activeIndex}
          onMouseEnter={() => onSuggestionMouseEnter(index)}
          onClick={() => onSuggestionClick(index)}
        >
          <SuggestionImage src={src} srcSet={srcSet} alt={alt} />
          {alt}
        </SuggestionItem>
      );

      const renderItems = () =>
        type === 'users'
          ? (items as string[]).map(renderUser)
          : (items as HtmlEntityEmote[]).map(renderEmote);

      return (
        <Suggestions ref={suggestionsRef}>
          {items.length ? renderItems() : 'No matches'}
        </Suggestions>
      );
    };

    const renderEmotesButton = () => (
      <EmotesButton
        onClick={() => setIsEmotesModalVisible(!isEmotesModalVisible)}
      >
        <SmileyFaceIcon />
      </EmotesButton>
    );

    const renderEmotesModal = () => (
      <EmotesModal>
        <ChatModal onClose={handleCloseEmotesModal}>
          <EmotePicker onEmoteClick={onEmoteClick} />
        </ChatModal>
      </EmotesModal>
    );

    return (
      <ChatInputRoot ref={chatInputRef}>
        <ChatInputInner>
          {suggestions.isActive && renderSuggestions(suggestions)}
          <TextareaWrapper isSuggestions={suggestions.isActive}>
            <TextareaInput>
              <Textarea
                ref={textareaRef}
                value={text}
                placeholder="Send a message"
                maxLength={500}
                disabled={isDisabled}
                onChange={onChange}
                onKeyUp={onKeyUp}
                onKeyDown={onKeyDown}
              />
              {isEmotesLoaded && renderEmotesButton()}
            </TextareaInput>
          </TextareaWrapper>
          {isEmotesModalVisible && renderEmotesModal()}
        </ChatInputInner>
      </ChatInputRoot>
    );
  },
);

ChatInput.defaultProps = {
  isDisabled: false,
};

export default React.memo(ChatInput);
