import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { format } from 'date-fns/fp';

import {
  Message as MessageType,
  MessageEntity,
} from 'features/chat/slice/messages';
import * as htmlEntity from 'features/chat/utils/htmlEntity';

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
const Emoji = styled.img`
  display: inline-block;
  margin-top: -5px;
  margin-bottom: -4px;
  width: 20px;
  height: auto;
  vertical-align: middle;
`;
const Emote = styled.img`
  display: inline-block;
  margin: -5px 0;
  vertical-align: middle;
`;
// https://github.com/night/BetterTTV/blob/master/src/modules/emotes/style.css
// prettier-ignore
const EmoteWrapper = styled.span`
  display: inline-block;

  /* Prevent stacking of IceCold, SoSnowy */
  &[data-emote-id='5849c9a4f52be01a7ee5f79d'] + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  &[data-emote-id='567b5b520e984428652809b6'] + &[data-emote-id='567b5b520e984428652809b6'] {
    display: none;
  }

  /* IceCold */
  &        + &[data-emote-id='5849c9a4f52be01a7ee5f79d'],
  ${Emoji} + &[data-emote-id='5849c9a4f52be01a7ee5f79d'] {
    margin-left: -33px;
  }

  /* SoSnowy */
  &        + &[data-emote-id='567b5b520e984428652809b6'],
  ${Emoji} + &[data-emote-id='567b5b520e984428652809b6'] {
    margin-left: -32px;
  }

  /* SantaHat */
  &        + &[data-emote-id='58487cc6f52be01a7ee5f205'],
  ${Emoji} + &[data-emote-id='58487cc6f52be01a7ee5f205'] {
    margin-left: -34px;
    margin-top: -18px;
  }

  /* TopHat, CandyCane, ReinDeer */
  &        + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  ${Emoji} + &[data-emote-id='5849c9c8f52be01a7ee5f79e'],
  &        + &[data-emote-id='567b5c080e984428652809ba'],
  ${Emoji} + &[data-emote-id='567b5c080e984428652809ba'],
  &        + &[data-emote-id='567b5dc00e984428652809bd'],
  ${Emoji} + &[data-emote-id='567b5dc00e984428652809bd'] {
    margin-left: -31px;
    margin-top: -18px;
  }

  /* cvHazmat, cvMask */
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  ${Emoji} + &[data-emote-id='5e76d338d6581c3724c0f0b2'],
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'],
  ${Emoji} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] {
    margin-left: -34px;
  }
  &        + &[data-emote-id='5e76d338d6581c3724c0f0b2'] ${Emote},
  ${Emoji} + &[data-emote-id='5e76d338d6581c3724c0f0b2'] ${Emote},
  &        + &[data-emote-id='5e76d399d6581c3724c0f0b8'] ${Emote},
  ${Emoji} + &[data-emote-id='5e76d399d6581c3724c0f0b8'] ${Emote} {
    height: 34px;
    width: 34px;
  }
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
      <EmoteWrapper data-emote-id={item.id}>
        <Emote key={key} src={item.src} srcSet={item.srcSet} alt={item.alt} />
      </EmoteWrapper>
    );
  }

  if (item.type === 'emoji') {
    return (
      <EmoteWrapper>
        <Emoji key={key} src={item.src} alt={item.alt} />
      </EmoteWrapper>
    );
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

const renderBadges = (badges: htmlEntity.Badge[]) =>
  badges.map(({ alt, label, src, srcSet }, key: number) => (
    // eslint-disable-next-line react/no-array-index-key
    <Badge key={key} alt={alt} aria-label={label} src={src} srcSet={srcSet} />
  ));

type Props = {
  message: MessageType;
  userLogin: string | null;
  isEven: boolean;
  isShowTimestamps: boolean;
  onNameRightClick: (name: string) => void;
};

const MESSAGE_DELETED_LABEL = '<message deleted>';

const Message = ({
  message: {
    entities,
    user: { login, color, displayName, badges },
    timestamp,
    isHistory,
    isAction,
    isDeleted,
    isMention,
  },
  userLogin,
  isEven,
  isShowTimestamps,
  // onNameClick,
  onNameRightClick,
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

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

export default React.memo(Message);
