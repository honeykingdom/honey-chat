import React from 'react';
import assertNever from 'utils/assertNever';
import type { Messages } from '../messagesTypes';
import MessagePrivate from './MessagePrivate';
import MessageNotice from './MessageNotice';
import MessageUserNotice from './MessageUserNotice';
import { MessageType } from '../messagesConstants';

type Props = {
  message: Messages;
  isAltBg: boolean;
  onNameClick?: (name: string) => void;
  onNameRightClick?: (name: string) => void;
};

const Message = ({
  message,
  isAltBg,
  onNameClick = () => {},
  onNameRightClick = () => {},
}: Props) => {
  if (message.type === MessageType.PRIVATE_MESSAGE) {
    return (
      <MessagePrivate
        message={message}
        isAltBg={isAltBg}
        onNameClick={onNameClick}
        onNameRightClick={onNameRightClick}
      />
    );
  }

  if (message.type === MessageType.USER_NOTICE) {
    return <MessageUserNotice message={message} />;
  }

  if (message.type === MessageType.NOTICE) {
    return <MessageNotice isAltBg={isAltBg} message={message} />;
  }

  return assertNever(message);
};

export default React.memo(Message);
