import React, { useState, useRef } from 'react';
import pt from 'prop-types';
import styled, { css } from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';

import {
  twitchEmoteType,
  bttvEmoteType,
  ffzEmoteType,
} from 'utils/formatMessage';
import ChatModal from 'components/ChatModal';
import IconButton from 'components/IconButton';
import EmotePicker from 'components/EmotePicker';
import { ReactComponent as SmileyFaceIconSvg } from 'icons/smiley-face.svg';

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
const SuggestionItem = styled.div`
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
const TextareaWrapper = styled.div`
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

const ChatInput = React.forwardRef(
  (
    {
      text,
      emoteCategories,
      suggestions,
      isDisabled,
      onEmoteClick,
      onChange,
      onKeyUp,
      onKeyDown,
      onBlur,
    },
    textareaRef,
  ) => {
    const chatInputRef = useRef(null);
    const [isEmotesModalVisible, setIsEmotesModalVisible] = useState(false);

    const handleCloseEmotesModal = () => setIsEmotesModalVisible(false);

    useOnClickOutside(chatInputRef, handleCloseEmotesModal);

    /* eslint-disable react/prop-types */
    const renderSuggestions = ({ type, items, activeIndex }) => {
      const renderUser = (name, index) => (
        <SuggestionItem key={name} isActive={index === activeIndex}>
          {name}
        </SuggestionItem>
      );

      const renderEmote = ({ src, srcSet, alt }, index) => (
        <SuggestionItem key={alt} isActive={index === activeIndex}>
          <SuggestionImage src={src} srcSet={srcSet} alt={alt} />
          {alt}
        </SuggestionItem>
      );

      return (
        <Suggestions>
          {items.length
            ? items.map(type === 'users' ? renderUser : renderEmote)
            : 'No matches'}
        </Suggestions>
      );
    };
    /* eslint-enable react/prop-types */

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
          <EmotePicker
            emoteCategories={emoteCategories}
            onEmoteClick={onEmoteClick}
          />
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
                onBlur={onBlur}
              />
              {!!emoteCategories.length && renderEmotesButton()}
            </TextareaInput>
          </TextareaWrapper>
          {isEmotesModalVisible && renderEmotesModal()}
        </ChatInputInner>
      </ChatInputRoot>
    );
  },
);

ChatInput.defaultProps = {
  emoteCategories: [],
  isDisabled: false,
};

ChatInput.propTypes = {
  text: pt.string.isRequired,
  emoteCategories: pt.arrayOf(pt.shape({})),
  suggestions: pt.shape({
    isActive: pt.bool,
    items: pt.oneOfType([
      pt.arrayOf(pt.string),
      pt.arrayOf(pt.oneOfType([twitchEmoteType, bttvEmoteType, ffzEmoteType])),
    ]),
    activeIndex: pt.number,
    cursorPosition: pt.number,
    prefix: pt.string,
  }).isRequired,
  isDisabled: pt.bool,
  onEmoteClick: pt.func.isRequired,
  onChange: pt.func.isRequired,
  onKeyUp: pt.func.isRequired,
  onKeyDown: pt.func.isRequired,
  onBlur: pt.func.isRequired,
};

export default React.memo(ChatInput);
