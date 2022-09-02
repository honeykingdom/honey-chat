import styled from '@emotion/styled';

const Select = styled.select`
  padding: 2px 4px;
  border: 2px solid transparent;
  font-family: inherit;
  font-size: 12px;
  line-height: 1.5;
  border-radius: 4px;
  outline: none;
  color: #fff;
  background-color: rgba(255, 255, 255, 0.15);
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
  transition-property: box-shadow, border, background-color;

  &:focus {
    border-color: #a970ff;
    background-color: #000;

    &:hover {
      border-color: #a970ff;
      background-color: #000;
    }
  }

  &:hover {
    border-color: rgba(255, 255, 255, 0.1);
  }

  &[disabled] {
    opacity: 0.5;
    pointer-events: none;
  }

  option {
    background-color: #000;
  }
`;

export default Select;
