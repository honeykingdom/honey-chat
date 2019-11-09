import React from 'react';
// import pt from 'prop-types';
import styled from 'styled-components';

import { userNoticeType } from './types';

const UserNoticeRoot = styled.div`
  padding: 5px 20px 5px 16px;
  line-height: 20px;
  word-wrap: break-word;
  border-left: 4px solid #9147ff;
  color: #fff;
`;

const UserNotice = ({
  message: {
    tags: { systemMsg },
  },
}) => <UserNoticeRoot>{systemMsg}</UserNoticeRoot>;

UserNotice.propTypes = {
  message: userNoticeType.isRequired,
};

export default UserNotice;
