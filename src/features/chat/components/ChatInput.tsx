import React, { useState, useRef, useCallback } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import TextareaAutosize from 'react-textarea-autosize';
import { useAppSelector } from 'app/hooks';
import { PREVENT_FORWARD_PROPS } from 'utils/constants';
import useOnClickOutside from 'hooks/useOnClickOutside';
import IconButton from 'components/IconButton';
import EmotePicker from 'features/emotes/components/EmotePicker';
import { type HtmlEmote } from 'features/emotes/emotesTypes';
import SmileyFaceIconSvg from 'icons/smiley-face.svg';
import useChatInput from '../hooks/useChatInput';
import {
  authStatusSelector,
  isChannelReadySelector,
  isRegisteredSelector,
} from '../chatSelectors';
import type { SendMessageFn, SuggestionsState } from '../chatTypes';

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
  font-size: 13px;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  /* box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0px 2px rgba(0, 0, 0, 0.1); */
`;
const SuggestionItem = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 2px;
  background-color: ${(p) =>
    p.$isActive ? 'rgba(255, 255, 255, 0.15)' : 'transparent'};
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
const TextareaWrapper = styled.div<{ $isSuggestions: boolean }>`
  ${(p) =>
    p.$isSuggestions &&
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
const Textarea = styled(TextareaAutosize, PREVENT_FORWARD_PROPS)<{
  $showScroll?: boolean;
}>`
  display: block;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 32px;
  width: 100%;
  height: 38px;
  max-height: 91px;
  min-height: 40px;
  overflow-x: hidden;
  overflow-y: ${(p) => (p.$showScroll ? 'auto' : 'hidden')};
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
    border-color: #a970ff;
    background-color: #000;

    &:hover {
      border-color: #a970ff;
      background-color: #000;
    }
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
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
  sendMessage: SendMessageFn;
};

const ChatInput = React.forwardRef<HTMLTextAreaElement, Props>(
  ({ sendMessage }, textareaRef) => {
    const authStatus = useAppSelector(authStatusSelector);
    const isRegistered = useAppSelector(isRegisteredSelector);
    const isReady = useAppSelector(isChannelReadySelector);

    const [isShowTextareaScroll, setIsShowTextareaScroll] = useState(false);
    const [isEmotesModalVisible, setIsEmotesModalVisible] = useState(false);

    const chatInputRef = useRef<HTMLDivElement>(null);
    const suggestionsRef = useRef<HTMLDivElement>(null);

    const {
      suggestions,
      handleChange,
      handleKeyUp,
      handleKeyDown,
      handleSuggestionMouseEnter,
      handleSuggestionClick,
      handleEmoteClick,
    } = useChatInput(
      sendMessage,
      textareaRef as React.RefObject<HTMLTextAreaElement>,
    );

    const handleCloseEmotesModal = useCallback(
      () => setIsEmotesModalVisible(false),
      [],
    );

    useOnClickOutside(chatInputRef, handleCloseEmotesModal);
    useOnClickOutside(suggestionsRef, () => suggestions.hide());

    const renderSuggestions = ({
      type,
      items,
      activeIndex,
    }: SuggestionsState) => {
      const renderUser = (name: string, index: number) => (
        <SuggestionItem
          key={name}
          $isActive={index === activeIndex}
          onMouseEnter={() => handleSuggestionMouseEnter(index)}
          onClick={() => handleSuggestionClick(index)}
        >
          {name}
        </SuggestionItem>
      );

      const renderEmote = (
        { id, src, srcSet, alt, title }: HtmlEmote,
        index: number,
      ) => (
        <SuggestionItem
          key={id}
          $isActive={index === activeIndex}
          onMouseEnter={() => handleSuggestionMouseEnter(index)}
          onClick={() => handleSuggestionClick(index)}
        >
          <SuggestionImage src={src} srcSet={srcSet} alt={alt} />
          {title}
        </SuggestionItem>
      );

      const renderItems = () =>
        type === 'users'
          ? (items as string[]).map(renderUser)
          : items.map(renderEmote);

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
        <EmotePicker
          onClose={handleCloseEmotesModal}
          onEmoteClick={handleEmoteClick}
        />
      </EmotesModal>
    );

    const handleHeightChange = (height: number) =>
      setIsShowTextareaScroll(height >= 96);

    return (
      <ChatInputRoot ref={chatInputRef}>
        <ChatInputInner>
          {suggestions.state.isActive && renderSuggestions(suggestions.state)}
          <TextareaWrapper $isSuggestions={suggestions.state.isActive}>
            <TextareaInput>
              <Textarea
                ref={textareaRef}
                placeholder="Send a message"
                maxLength={500}
                maxRows={4}
                disabled={!(isRegistered && authStatus === 'success')}
                $showScroll={isShowTextareaScroll}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                onKeyDown={handleKeyDown}
                onHeightChange={handleHeightChange}
              />
              {isReady && renderEmotesButton()}
            </TextareaInput>
          </TextareaWrapper>
          {isEmotesModalVisible && renderEmotesModal()}
        </ChatInputInner>
      </ChatInputRoot>
    );
  },
);

export default React.memo(ChatInput);
