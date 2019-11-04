import React from 'react';
import pt from 'prop-types';
import styled from 'styled-components';

const ChatMessageRoot = styled.div`
  padding: 5px 20px;
  color: ${(p) => (p.isAction ? p.color : '#fff')};
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

const tagsType = pt.shape({
  badgeInfo: pt.shape({
    subscriber: pt.number,
  }),
  badges: pt.shape({}),
  color: pt.string.isRequired,
  displayName: pt.string.isRequired,
  emotes: pt.shape({}),
  flags: pt.string,
  id: pt.string,
  mod: pt.bool,
  roomId: pt.string,
  tmiSentId: pt.string,
  userId: pt.string,
});

const ChatMessage = ({
  message,
  tags: { color, displayName },
  isHistory,
  isAction,
}) => (
  <ChatMessageRoot isHistory={isHistory} isAction={isAction} color={color}>
    <Name color={color}>{displayName}</Name>
    {!isAction && ':'} <Text dangerouslySetInnerHTML={{ __html: message }} />
  </ChatMessageRoot>
);

ChatMessage.defaultProps = {
  isHistory: false,
  isAction: false,
};

ChatMessage.propTypes = {
  tags: tagsType.isRequired,
  message: pt.string.isRequired,
  isHistory: pt.bool,
  isAction: pt.bool,
};

export default ChatMessage;
