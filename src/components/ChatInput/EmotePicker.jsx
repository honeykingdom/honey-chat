import React from 'react';
import pt from 'prop-types';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import { emoteCategoriesSelector } from 'reducers/emotes/selectors';
import Scrollbar from 'components/Scrollbar';
import { ReactComponent as CloseIconSvg } from 'icons/close.svg';

const EmotePickerRoot = styled.div`
  position: relative;
  padding-top: 32px;
  padding-bottom: 16px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  white-space: normal;
  color: #fff;
  border-radius: 4px;
`;
const CloseButton = styled.button.attrs({ type: 'button' })`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  outline: none;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;

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
const CloseIcon = styled(CloseIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;
const Categories = styled.div`
  height: 100%;
`;
const Category = styled.div`
  padding-top: 10px;
  padding-right: 16px;
  padding-left: 16px;

  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`;
const CategoryHeader = styled.div`
  padding-bottom: 10px;
  font-size: 12px;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.8);
`;
const CategoryItems = styled.div``;
const Emote = styled.img`
  padding: 2px;
  width: 32px;
  height: 32px;
  object-fit: contain;

  &:hover {
    background-color: rgba(119, 44, 232, 0.2);
    cursor: pointer;
  }
`;

/* eslint-disable react/prop-types */
const renderCategory = (handleClick) => ({ title, items }, key) => (
  <Category key={key}>
    {!!title && <CategoryHeader>{title}</CategoryHeader>}
    <CategoryItems>
      {items.map(({ alt, src, srcSet }) => (
        <Emote
          key={alt}
          alt={alt}
          src={src}
          srcSet={srcSet}
          onClick={() => handleClick(alt)}
        />
      ))}
    </CategoryItems>
  </Category>
);
/* eslint-enable react/prop-types */

const EmotePicker = ({ onEmoteClick, onClose }) => {
  const emoteCategories = useSelector(emoteCategoriesSelector);

  return (
    <EmotePickerRoot>
      <CloseButton onClick={onClose}>
        <CloseIcon />
      </CloseButton>
      <Categories>
        <Scrollbar>
          {emoteCategories.map(renderCategory(onEmoteClick))}
        </Scrollbar>
      </Categories>
    </EmotePickerRoot>
  );
};

EmotePicker.defaultProps = {};

EmotePicker.propTypes = {
  onEmoteClick: pt.func.isRequired,
  onClose: pt.func.isRequired,
};

export default EmotePicker;
