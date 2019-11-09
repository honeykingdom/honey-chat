import React from 'react';
import pt from 'prop-types';

import { messageTypes } from '../../reducers/messages';
import { messageType, noticeType, userNoticeType } from './types';

import Message from './Message';
import Notice from './Notice';
import UserNotice from './UserNotice';

const ChatMessage = ({ message, login, isEven }) => {
  if (message.type === messageTypes.MESSAGE) {
    return <Message message={message} login={login} isEven={isEven} />;
  }

  if (message.type === messageTypes.NOTICE_MESSAGE) {
    return <Notice message={message} isEven={isEven} />;
  }

  if (message.type === messageTypes.USER_NOTICE_MESSAGE) {
    return <UserNotice message={message} />;
  }

  return null;
};

ChatMessage.defaultProps = {
  isEven: false,
};

ChatMessage.propTypes = {
  message: pt.oneOfType([messageType, noticeType, userNoticeType]).isRequired,
  login: pt.string.isRequired,
  isEven: pt.bool,
};

export default ChatMessage;
