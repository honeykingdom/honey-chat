import React, { useState, useEffect, useCallback, useRef } from 'react';
import pt from 'prop-types';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';

import { ReactComponent as SmileyFaceIconSvg } from 'icons/smiley-face.svg';
import ChatModal from 'components/ChatModal';
import IconButton from 'components/IconButton';
import EmotePicker from 'components/EmotePicker';

const ChatInputRoot = styled.div`
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
  background-color: #18181b;

  & > :not(:last-child) {
    margin-bottom: 10px;
  }
`;
const TextareaWrapper = styled.div`
  position: relative;
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
      isDisabled,
      onChangeText,
      onSendMessage,
      onEmoteClick,
    },
    textareaRef,
  ) => {
    const textareaWrapperRef = useRef(null);
    const [isEmotesModalVisible, setIsEmotesModalVisible] = useState(false);

    const handleCloseEmotesModal = () => setIsEmotesModalVisible(false);

    useOnClickOutside(textareaWrapperRef, handleCloseEmotesModal);

    const handleChange = (e) => onChangeText(e.target.value);

    const handleKeyDown = useCallback(
      (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          onSendMessage();
        }
      },
      [onSendMessage],
    );

    useEffect(() => {
      const textareaNode = textareaRef.current;

      textareaNode.addEventListener('keydown', handleKeyDown, false);

      return () => {
        textareaNode.removeEventListener('keydown', handleKeyDown, false);
      };
    }, [handleKeyDown, textareaRef]);

    return (
      <ChatInputRoot>
        <TextareaWrapper ref={textareaWrapperRef}>
          <Textarea
            placeholder="Send a message"
            ref={textareaRef}
            maxLength={500}
            disabled={isDisabled}
            onChange={handleChange}
            value={text}
          />
          {!!emoteCategories.length && (
            <EmotesButton
              onClick={() => setIsEmotesModalVisible(!isEmotesModalVisible)}
            >
              <SmileyFaceIcon />
            </EmotesButton>
          )}
          {isEmotesModalVisible && (
            <EmotesModal>
              <ChatModal onClose={handleCloseEmotesModal}>
                <EmotePicker
                  emoteCategories={emoteCategories}
                  onEmoteClick={onEmoteClick}
                />
              </ChatModal>
            </EmotesModal>
          )}
        </TextareaWrapper>
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
  isDisabled: pt.bool,
  onChangeText: pt.func.isRequired,
  onSendMessage: pt.func.isRequired,
  onEmoteClick: pt.func.isRequired,
};

export default React.memo(ChatInput);
