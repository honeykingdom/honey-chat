import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns/fp';

import {
  Message as MessageType,
  MessageEntity,
} from 'features/chat/slice/messages';
import { HtmlEntityBadge } from 'features/chat/utils/htmlEntity';

type MessageRootProps = {
  isAction: boolean;
  isHistory: boolean;
  isDeleted: boolean;
  isMention: boolean;
  isEven: boolean;
};

const getChatMessageBg = (p: MessageRootProps) => {
  if (p.isMention) return 'rgba(255, 0, 0, 0.3)';
  if (p.isEven) return '#1f1925';
  return 'transparent';
};

const MessageRoot = styled.div<MessageRootProps>`
  padding: 5px 20px;
  color: ${(p) => (p.isAction ? p.color : '#fff')};
  opacity: ${(p) => (p.isHistory || p.isDeleted ? '0.5' : '1')};
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${getChatMessageBg};
`;
const Name = styled.span`
  font-weight: bold;
  color: ${(p) => p.color};
  cursor: pointer;
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
const Mention = styled.span<{ isActive: boolean; isOwnMessage: boolean }>`
  ${(p) =>
    (p.isActive || p.isOwnMessage) &&
    css`
      padding: 2px 4px;
    `};
  ${(p) =>
    p.isOwnMessage &&
    css`
      background-color: #40404a;
      color: #fff;
    `};
  ${(p) =>
    p.isActive &&
    css`
      background-color: #fafafa;
      color: #18181b;
    `};
`;
const Link = styled.a`
  color: #bf94ff;
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:hover {
    color: #a970ff;
    text-decoration: underline;
  }

  &:visited {
    color: #a970ff;
  }
`;
const Timestamp = styled.span`
  margin-right: 5px;
  color: rgba(255, 255, 255, 0.6);
`;
const Badge = styled.img`
  margin-bottom: 2px;
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;

const renderMessageArray = (login: string, userLogin: string | null) => (
  item: MessageEntity,
  key: number,
) => {
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
    return <Emoji key={key} src={item.src} alt={item.alt} />;
  }

  if (item.type === 'mention') {
    return (
      <Mention
        key={key}
        isActive={item.target === userLogin}
        isOwnMessage={login === userLogin}
      >
        {item.text}
      </Mention>
    );
  }

  if (item.type === 'link') {
    return (
      <Link
        key={key}
        href={item.href}
        rel="noreferrer noopener"
        target="_blank"
      >
        {item.text}
      </Link>
    );
  }

  return null;
};

const renderBadges = (badges: HtmlEntityBadge[]) =>
  badges.map(({ alt, label, src, srcSet }, key: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <Badge key={key} alt={alt} aria-label={label} src={src} srcSet={srcSet} />
  ));

interface Props {
  message: MessageType;
  userLogin: string | null;
  isEven: boolean;
  isShowTimestamps: boolean;
  onNameRightClick: (name: string) => void;
}

const MESSAGE_DELETED_LABEL = '<message deleted>';

const Message = ({
  message: {
    message,
    entities,
    user: { login, color, displayName, badges },
    timestamp,
    isHistory,
    isAction,
    isDeleted,
  },
  userLogin,
  isEven,
  isShowTimestamps,
  // onNameClick,
  onNameRightClick,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);
  const isMention =
    login !== userLogin && RegExp(userLogin as string, 'gi').test(message);

  const handleNameRightClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    onNameRightClick(displayName);
    e.preventDefault();
  };

  return (
    <MessageRoot
      isHistory={isHistory}
      isAction={isAction}
      isEven={isEven}
      isMention={isMention}
      isDeleted={isDeleted}
      color={color}
    >
      {isShowTimestamps && (
        <Timestamp>{format('h:mm', new Date(timestamp))}</Timestamp>
      )}
      {badges.length > 0 && renderBadges(badges)}
      <Name color={color} onContextMenu={handleNameRightClick}>
        {displayName}
      </Name>
      {isAction ? ' ' : ': '}
      {isDeleted && !isVisible ? (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <Link onClick={() => setIsVisible(true)}>{MESSAGE_DELETED_LABEL}</Link>
      ) : (
        entities.map(renderMessageArray(login, userLogin))
      )}
    </MessageRoot>
  );
};

Message.defaultProps = {
  userLogin: '',
  isEven: false,
  isShowTimestamps: false,
  // onNameClick: () => {},
  onNameRightClick: () => {},
};

export default React.memo(Message);