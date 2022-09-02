import React from 'react';
import styled from '@emotion/styled';

const SwitchRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 20px;
`;
const Label = styled.label`
  display: inline-block;
  position: relative;
  order: 0;
  width: 35px;
  height: 20px;
  content: '';
  cursor: pointer;
  vertical-align: bottom;
  border-width: 2px;
  border-style: solid;
  border-radius: 10px;
  transition-property: background-color;
  transition-timing-function: ease;
  transition-duration: 0.1s;
  border-color: rgba(255, 255, 255, 0.7);
  background-color: transparent;

  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    bottom: 2px;
    left: 2px;
    width: 12px;
    height: 12px;
    transition-property: left;
    transition-timing-function: ease;
    transition-duration: 0.1s;
    border-radius: 9000px;
    background-color: #fff;
  }

  &:hover {
    border-color: #fff;
  }
`;
const Input = styled.input`
  position: absolute;
  opacity: 0;

  &:checked + ${Label} {
    border-color: #a970ff;
    background-color: #000;

    &:after {
      content: '';
      left: calc((100% - 12px) - 2px);
      background-color: #a970ff;
    }

    &:before {
      box-sizing: content-box;
      border-width: 0px 0px 2px 2px;
      border-style: solid;
      border-color: #a970ff;
      display: block;
      position: absolute;
      top: 7px;
      left: 8px;
      width: 7px;
      height: 3px;
      transform: translate3d(-50%, -50%, 0px) rotate(-45deg);
      content: '';
    }
  }
`;

type Props = {
  id: string;
  label: string;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Switch = ({
  id,
  label,
  checked = false,
  readOnly = false,
  onChange = () => {},
}: Props) => (
  <SwitchRoot>
    <Input
      id={id}
      type="checkbox"
      aria-label={label}
      checked={checked}
      readOnly={readOnly}
      onChange={onChange}
    />
    <Label htmlFor={id} />
  </SwitchRoot>
);

export default Switch;
