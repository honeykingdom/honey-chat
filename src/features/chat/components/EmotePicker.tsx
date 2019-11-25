import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Scrollbar from 'components/Scrollbar';
import { emoteCategoriesSelector } from 'features/chat/selectors';
import { EmoteCategory } from 'features/chat/utils/createEmoteCategories';

const EmotePickerRoot = styled.div`
  padding-top: 32px;
  padding-bottom: 16px;
  height: 100%;
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

interface Props {
  onEmoteClick: (name: string) => void;
}

const EmotePicker = ({ onEmoteClick }: Props) => {
  const emoteCategories = useSelector(emoteCategoriesSelector);

  const renderCategory = ({ title, items }: EmoteCategory, key: number) => (
    <Category key={key}>
      {!!title && <CategoryHeader>{title}</CategoryHeader>}
      <CategoryItems>
        {items.map(({ alt, src, srcSet }) => (
          <Emote
            key={alt}
            alt={alt}
            src={src}
            srcSet={srcSet}
            onClick={() => onEmoteClick(alt)}
          />
        ))}
      </CategoryItems>
    </Category>
  );

  return (
    <EmotePickerRoot>
      <Categories>
        <Scrollbar>{emoteCategories.map(renderCategory)}</Scrollbar>
      </Categories>
    </EmotePickerRoot>
  );
};

export default EmotePicker;
