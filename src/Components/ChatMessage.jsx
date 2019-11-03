import React from 'react';
import pt from 'prop-types';
import styled from 'styled-components';

import formatMessage from '../utils/formatMessage';

const ChatMessageRoot = styled.div`
  padding: 5px 20px;
  color: #fff;
  opacity: ${(p) => (p.isHistory ? '0.5' : '1')};
  line-height: 20px;
  word-wrap: break-word;

  &:nth-child(even) {
    background-color: #1f1925;
  }

  .chat-image {
    display: inline-block;
    margin: -5px 0;
    vertical-align: middle;
  }

  a {
    color: #bf94ff;
    text-decoration: none;

    &:focus,
    &:hover {
      color: #a970ff;
      text-decoration: underline;
    }

    &:visited {
      color: #a970ff;
    }
  }
`;
const Name = styled.span`
  font-weight: bold;
  color: ${(p) => p.color};
`;
const Text = styled.span``;

const ChatMessage = ({ name, color, text, emotes, isHistory }) => (
  <ChatMessageRoot isHistory={isHistory}>
    <Name color={color}>{name}</Name>:{' '}
    <Text dangerouslySetInnerHTML={{ __html: formatMessage(text, emotes) }} />
  </ChatMessageRoot>
);

ChatMessage.defaultProps = {
  emotes: {},
  isHistory: false,
};

ChatMessage.propTypes = {
  name: pt.string.isRequired,
  color: pt.string.isRequired,
  text: pt.string.isRequired,
  emotes: pt.oneOfType([pt.bool, pt.shape({})]),
  isHistory: pt.bool,
};

export default ChatMessage;
