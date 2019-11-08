import React from 'react';
import pt from 'prop-types';
import styled, { css } from 'styled-components';
import { any, propEq } from 'ramda';

import {
  twitchEmoteType,
  bttvEmoteType,
  ffzEmoteType,
  emojiType,
  mentionType,
  linkType,
} from '../utils/formatMessage';

const getChatMessageBg = (p) => {
  if (p.isMention) return 'rgba(255, 0, 0, 0.3)';
  if (p.isEven) return '#1f1925';
  return 'transparent';
};

const ChatMessageRoot = styled.div`
  padding: 5px 20px;
  color: ${(p) => (p.isAction ? p.color : '#fff')};
  opacity: ${(p) => (p.isHistory ? '0.5' : '1')};
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${getChatMessageBg};
`;
const Name = styled.span`
  font-weight: bold;
  color: ${(p) => p.color};
`;
const Emote = styled.img`
  display: inline-block;
  margin: -5px 0;
  vertical-align: middle;
`;
const Emoji = styled.img`
  display: inline-block;
  margin-top: -5px;
  margin-bottom: -4px;
  width: 20px;
  height: auto;
  vertical-align: middle;
`;
const Mention = styled.span`
  ${(p) =>
    p.isActive &&
    css`
      padding: 2px 4px;
      background-color: #fafafa;
      color: #18181b;
    `}
`;
const Link = styled.a.attrs({ rel: 'noreferrer noopener', target: '_blank' })`
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
`;

const renderMessageArray = (user, login) => (item, key) => {
  if (typeof item !== 'object') return item;

  if (
    item.type === 'twitch-emote' ||
    item.type === 'bttv-emote' ||
    item.type === 'ffz-emote'
  ) {
    return (
      <Emote key={key} src={item.src} srcSet={item.srcSet} alt={item.alt} />
    );
  }

  if (item.type === 'emoji') {
    return (
      <Emoji key={key} src={item.src} srcSet={item.srcSet} alt={item.alt} />
    );
  }

  if (item.type === 'mention') {
    const isActive = item.target === login || user === login;
    return (
      <Mention key={key} isActive={isActive}>
        {item.text}
      </Mention>
    );
  }

  if (item.type === 'link') {
    return (
      <Link key={key} href={item.href}>
        {item.text}
      </Link>
    );
  }

  return null;
};

const ChatMessage = ({
  // message,
  messageArray,
  tags: { color, displayName },
  user,
  login,
  isHistory,
  isAction,
  isEven,
}) => {
  const isMention =
    any(propEq('target', login), messageArray) && user !== login;

  return (
    <ChatMessageRoot
      isHistory={isHistory}
      isAction={isAction}
      isEven={isEven}
      isMention={isMention}
      color={color}
    >
      <Name color={color}>{displayName}</Name>
      {!isAction && ':'} {messageArray.map(renderMessageArray(user, login))}
    </ChatMessageRoot>
  );
};

ChatMessage.defaultProps = {
  isHistory: false,
  isAction: false,
  isEven: false,
};

export const tagsType = pt.shape({
  badgeInfo: pt.shape({
    subscriber: pt.number,
  }),
  badges: pt.shape({}),
  color: pt.string,
  displayName: pt.string.isRequired,
  emotes: pt.shape({}),
  flags: pt.string,
  id: pt.string,
  mod: pt.bool,
  roomId: pt.string,
  tmiSentId: pt.oneOfType([pt.string, pt.number]),
  userId: pt.string,
});

ChatMessage.propTypes = {
  // message: pt.string.isRequired,
  messageArray: pt.arrayOf(
    pt.oneOfType([
      pt.string,
      pt.shape({}),
      twitchEmoteType,
      bttvEmoteType,
      ffzEmoteType,
      emojiType,
      mentionType,
      // TODO: fix warning with link type
      linkType,
    ]),
  ).isRequired,
  tags: tagsType.isRequired,
  user: pt.string.isRequired,
  login: pt.string.isRequired,
  isHistory: pt.bool,
  isAction: pt.bool,
  isEven: pt.bool,
};

export default ChatMessage;
