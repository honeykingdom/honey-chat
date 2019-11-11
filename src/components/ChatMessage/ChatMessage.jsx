import React from 'react';
import pt from 'prop-types';

import { MESSAGE_TYPES } from 'utils/constants';
import { messageType, noticeType, userNoticeType } from './types';
import Message from './Message';
import Notice from './Notice';
import UserNotice from './UserNotice';

const ChatMessage = ({ message, login, isEven, isShowTimestamps }) => {
  if (message.type === MESSAGE_TYPES.MESSAGE) {
    return (
      <Message
        message={message}
        login={login}
        isEven={isEven}
        isShowTimestamps={isShowTimestamps}
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
  login: '',
  isEven: false,
  isShowTimestamps: false,
};

ChatMessage.propTypes = {
  message: pt.oneOfType([messageType, noticeType, userNoticeType]).isRequired,
  login: pt.string,
  isEven: pt.bool,
  isShowTimestamps: pt.bool,
};

export default ChatMessage;
