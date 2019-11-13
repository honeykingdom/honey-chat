import React from 'react';
import pt from 'prop-types';

import { MESSAGE_TYPES } from 'utils/constants';
import { messageType, noticeType, userNoticeType } from './types';
import Message from './Message';
import Notice from './Notice';
import UserNotice from './UserNotice';

const ChatMessage = ({
  message,
  userLogin,
  isEven,
  isShowTimestamps,
  onNameClick,
  onNameRightClick,
}) => {
  if (message.type === MESSAGE_TYPES.MESSAGE) {
    return (
      <Message
        message={message}
        userLogin={userLogin}
        isEven={isEven}
        isShowTimestamps={isShowTimestamps}
        onNameClick={onNameClick}
        onNameRightClick={onNameRightClick}
      />
    );
  }

  if (message.type === MESSAGE_TYPES.NOTICE_MESSAGE) {
    return <Notice message={message} isEven={isEven} />;
  }

  if (message.type === MESSAGE_TYPES.USER_NOTICE_MESSAGE) {
    return <UserNotice message={message} />;
  }

  return null;
};

ChatMessage.defaultProps = {
  userLogin: '',
  isEven: false,
  isShowTimestamps: false,
  onNameClick: () => {},
  onNameRightClick: () => {},
};

ChatMessage.propTypes = {
  message: pt.oneOfType([messageType, noticeType, userNoticeType]).isRequired,
  userLogin: pt.string,
  isEven: pt.bool,
  isShowTimestamps: pt.bool,
  onNameClick: pt.func,
  onNameRightClick: pt.func,
};

export default React.memo(ChatMessage);
