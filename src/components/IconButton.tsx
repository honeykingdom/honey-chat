import styled, { css } from 'styled-components';

const sizes = {
  small: css`
    width: 24px;
    height: 24px;
  `,
  medium: css`
    width: 30px;
    height: 30px;
  `,
  // large: css``,
};

const IconButton = styled.button.attrs({
  type: 'button',
})<{ size?: 'small' | 'medium' }>`
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

  ${(p) => sizes[p.size || 'medium']};

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.15);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.2);
  }

  &:focus {
    box-shadow: 0 0 6px 0 #772ce8;
  }
`;

export default IconButton;
