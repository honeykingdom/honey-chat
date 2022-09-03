import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { format } from 'date-fns/fp';
import { calculateColor } from 'utils/colors';
import { useAppSelector } from 'app/hooks';
import { meLoginSelector } from 'features/chat';
import { Emote } from 'features/emotes';
import { Badges } from 'features/badges';
import { showCardsSelector, timestampFormatSelector } from 'features/options';
import { MessageCardComponent } from 'features/messageCards';
import { MessagePartType } from '../messagesConstants';
import type {
  MessagePart,
  MessagePartEmote,
  MessageTypePrivate,
} from '../messagesTypes';

type MessageRootProps = {
  $isAction: boolean;
  $isHistory: boolean;
  $isDeleted: boolean;
  $isHighlighted: boolean;
  $isAltBg: boolean;
  $color: string;
};

const getChatMessageBg = (p: MessageRootProps) => {
  if (p.$isHighlighted) return 'rgba(255, 0, 0, 0.3)';
  if (p.$isAltBg) return '#1f1925';
  return 'transparent';
};

const MessageRoot = styled.div<MessageRootProps>`
  padding: 5px 20px;
  color: ${(p) => (p.$isAction ? p.$color : '#fff')};
  opacity: ${(p) => (p.$isHistory || p.$isDeleted ? '0.5' : '1')};
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${getChatMessageBg};
`;
const Name = styled.span<{ $color: string }>`
  font-weight: bold;
  color: ${(p) => p.$color};
  cursor: pointer;
`;
const Mention = styled.span<{ $isActive: boolean; $isSelf: boolean }>`
  ${(p) =>
    (p.$isActive || p.$isSelf) &&
    css`
      padding: 2px 4px;
    `};
  ${(p) =>
    p.$isSelf &&
    css`
      background-color: #40404a;
      color: #fff;
    `};
  ${(p) =>
    p.$isActive &&
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

const renderMessageParts = (
  parts: MessagePart[],
  login: string,
  meLogin?: string,
) => {
  const result: JSX.Element[] = [];

  for (let i = 0; i < parts.length; i += 1) {
    const { type, content } = parts[i];

    if (type === MessagePartType.TEXT) {
      result.push(<React.Fragment key={i}>{content}</React.Fragment>);
    }

    if (
      type === MessagePartType.TWITCH_EMOTE ||
      type === MessagePartType.BTTV_EMOTE ||
      type === MessagePartType.FFZ_EMOTE ||
      type === MessagePartType.STV_EMOTE ||
      type === MessagePartType.EMOJI
    ) {
      result.push(<Emote key={i} emote={parts[i] as MessagePartEmote} />);
    }

    // TODO: something wrong with self mentions
    if (type === MessagePartType.MENTION) {
      result.push(
        <Mention
          key={i}
          $isActive={content.recipient === meLogin}
          $isSelf={login === meLogin}
        >
          {content.displayText}
        </Mention>,
      );
    }

    if (type === MessagePartType.LINK) {
      result.push(
        <Link
          key={i}
          href={content.url}
          rel="noreferrer noopener"
          target="_blank"
        >
          {content.displayText}
        </Link>,
      );
    }
  }

  return result;
};

type Props = {
  message: MessageTypePrivate;
  isAltBg: boolean;
  onNameClick?: (name: string) => void;
  onNameRightClick?: (name: string) => void;
};

const MESSAGE_DELETED_LABEL = '<message deleted>';

const Message = ({
  message: {
    timestamp,
    user: { login, displayName, color },
    parts,
    badges,
    card,
    isAction,
    isHistory,
    isDeleted,
    isHighlighted,
  },
  isAltBg,
  onNameClick = () => {},
  onNameRightClick = () => {},
}: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  const meLogin = useAppSelector(meLoginSelector);
  const timestampFormat = useAppSelector(timestampFormatSelector);
  const showCards = useAppSelector(showCardsSelector);

  const handleNameRightClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    onNameRightClick(displayName!);
    e.preventDefault();
  };

  const handleNameClick = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
  ) => {
    onNameClick(displayName!);
    e.preventDefault();
  };

  const newColor = color ? calculateColor(color) : '';

  const renderBody = () => {
    if (isDeleted && isVisible) {
      return (
        <Link as="button" onClick={() => setIsVisible(true)}>
          {MESSAGE_DELETED_LABEL}
        </Link>
      );
    }
    return renderMessageParts(parts, login, meLogin);
  };

  return (
    <MessageRoot
      $isHistory={isHistory}
      $isAction={isAction}
      $isAltBg={isAltBg}
      $isHighlighted={isHighlighted}
      $isDeleted={isDeleted}
      $color={newColor}
    >
      {timestampFormat !== 'Disable' && (
        <Timestamp>{format(timestampFormat, new Date(timestamp))}</Timestamp>
      )}
      <Badges badges={badges} />
      <Name
        $color={newColor}
        onClick={handleNameClick}
        onContextMenu={handleNameRightClick}
      >
        {displayName}
      </Name>
      {isAction ? ' ' : ': '}
      {renderBody()}
      {(showCards.youtube || showCards.twitch) && card && (
        <MessageCardComponent type={card.type} id={card.id} url={card.url} />
      )}
    </MessageRoot>
  );
};

export default React.memo(Message);
