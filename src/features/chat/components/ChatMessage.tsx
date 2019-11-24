import React from 'react';

import { ChatMessage as ChatMessageType } from 'features/chat/slice/messages';
import Message from 'features/chat/components/Message';
import Notice from 'features/chat/components/Notice';
import UserNotice from 'features/chat/components/UserNotice';

interface Props {
  message: ChatMessageType;
  userLogin: string | null;
  isEven: boolean;
  isShowTimestamps: boolean;
  // onNameClick: (name: string) => void;
  onNameRightClick: (name: string) => void;
}

const ChatMessage = ({
  message,
  userLogin,
  isEven,
  isShowTimestamps,
  // onNameClick,
  onNameRightClick,
}: Props) => {
  if (message.type === 'message') {
    return (
      <Message
        message={message}
        userLogin={userLogin}
        isEven={isEven}
        isShowTimestamps={isShowTimestamps}
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

  return null as never;
};

ChatMessage.defaultProps = {
  userLogin: '',
  isEven: false,
  isShowTimestamps: false,
  // onNameClick: () => {},
  onNameRightClick: () => {},
};

export default React.memo(ChatMessage);
