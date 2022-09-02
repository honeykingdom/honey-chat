import styled from '@emotion/styled';

const Badge = styled.img<{ $bgColor?: string | null }>`
  margin-bottom: 2px;
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
  background-color: ${(p) => p.$bgColor || 'transparent'};
`;

export default Badge;
