import React from 'react';

import assertNever from 'utils/assertNever';
import type { ChatMessage as ChatMessageType } from 'features/messages/messagesSlice';
import Message from 'features/messages/Message';
import Notice from 'features/messages/Notice';
import UserNotice from 'features/messages/UserNotice';

type Props = {
  message: ChatMessageType;
  isEven: boolean;
  // onNameClick: (name: string) => void;
  onNameRightClick: (name: string) => void;
};

const ChatMessage = ({
  message,
  isEven,
  // onNameClick,
  onNameRightClick,
}: Props) => {
  if (message.type === 'message') {
    return (
      <Message
        message={message}
        isEven={isEven}
        // onNameClick={onNameClick}
        onNameRightClick={onNameRightClick}
      />
    );
  }

  if (message.type === 'notice') {
    return <Notice message={message} isEven={isEven} />;
  }

  if (message.type === 'user-notice') {
    return <UserNotice message={message} />;
  }

  return assertNever(message);
};

export default React.memo(ChatMessage);
