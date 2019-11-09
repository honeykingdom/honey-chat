import React from 'react';
import pt from 'prop-types';

import { MESSAGE_TYPES } from '../../utils/constants';
import { messageType, noticeType, userNoticeType } from './types';

import Message from './Message';
import Notice from './Notice';
import UserNotice from './UserNotice';

const ChatMessage = ({ message, login, isEven }) => {
  if (message.type === MESSAGE_TYPES.MESSAGE) {
    return <Message message={message} login={login} isEven={isEven} />;
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
  isEven: false,
  login: '',
};

ChatMessage.propTypes = {
  message: pt.oneOfType([messageType, noticeType, userNoticeType]).isRequired,
  login: pt.string,
  isEven: pt.bool,
};

export default ChatMessage;
