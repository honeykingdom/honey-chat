import React from 'react';
import pt from 'prop-types';
import styled from 'styled-components';

import { noticeType } from './types';

const NoticeRoot = styled.div`
  padding: 5px 20px;
  color: rgba(255, 255, 255, 0.6);
  line-height: 20px;
  word-wrap: break-word;
  background-color: ${(p) => (p.isEven ? '#1f1925' : 'transparent')};
`;

const Notice = ({ message: { message }, isEven }) => (
  <NoticeRoot isEven={isEven}>{message}</NoticeRoot>
);

Notice.defaultProps = {
  isEven: false,
};

Notice.propTypes = {
  message: noticeType.isRequired,
  isEven: pt.bool,
};

export default React.memo(Notice);
