import React from 'react';
import styled from 'styled-components';

const SwitchRoot = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  line-height: 20px;
`;
const Label = styled.label`
  content: '';
  position: relative;
  display: inline-block;
  order: 0;
  width: 35px;
  height: 20px;
  vertical-align: bottom;
  border-radius: 10px/50%;
  background-color: rgba(0, 0, 0, 0.3);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 0 2px rgba(0, 0, 0, 0.1);
  transition: background-color 0.1s ease;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    top: 2px;
    left: 2px;
    bottom: 2px;
    display: block;
    width: 16px;
    border-radius: 50%;
    background-color: #fff;
    transition: left 0.1s ease;
  }
`;
const Input = styled.input.attrs({ type: 'checkbox' })`
  position: absolute;
  opacity: 0;

  &:checked + ${Label} {
    background-color: #9147ff;

    &:after {
      content: '';
      top: 2px;
      left: calc(100% - 18px);
    }

    &:before {
      content: '';
      position: absolute;
      top: 9px;
      left: 10px;
      display: block;
      height: 3px;
      width: 7px;
      border-bottom: 2px solid #fff;
      border-left: 2px solid #fff;
      transform: translate3d(-50%, -50%, 0) rotate(-45deg);
    }
  }
`;

interface Props {
  id: string;
  label: string;
  checked?: boolean;
  readOnly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Switch = ({ id, label, checked, readOnly, onChange }: Props) => (
  <SwitchRoot>
    <Input
      id={id}
      aria-label={label}
      checked={checked}
      readOnly={readOnly}
      onChange={onChange}
    />
    <Label htmlFor={id} />
  </SwitchRoot>
);

Switch.defaultProps = {
  checked: false,
  readOnly: false,
  onChange: () => {},
};

export default Switch;
