import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import type { RootState } from 'app/rootReducer';
import Scrollbar from 'components/Scrollbar';
import { emoteCategoriesSelector } from 'features/chat/selectors';
import type { EmoteCategory } from 'features/chat/utils/createEmoteCategories';
import { ReactComponent as SearchIconSvg } from 'icons/search.svg';

const EmotePickerRoot = styled.div`
  padding-top: 30px;
  padding-bottom: 16px;
  height: 100%;
`;
const Categories = styled.div`
  height: calc(100% - 30px);
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
const SearchBlock = styled.div`
  position: relative;
  padding: 0 16px;
  color: #adadb8;
`;
const SearchInput = styled.input`
  padding-left: 30px;
  padding-right: 10px;
  width: 100%;
  height: 30px;
  color: #efeff1;
  font-family: inherit;
  line-height: 1.5;
  background-clip: padding-box;
  background-color: rgba(255, 255, 255, 0.15);
  border: 2px solid rgba(255, 255, 255, 0.15);
  outline: 0;
  border-radius: 4px;
  appearance: none;
  transition: box-shadow 0.1s ease-in, border 0.1s ease-in,
    background-color 0.1s ease-in;

  &:focus {
    background-color: #000;
    border-color: #9147ff;
  }
`;
const SearchIcon = styled(SearchIconSvg)`
  position: absolute;
  top: 50%;
  left: 21px;
  display: block;
  width: 20px;
  height: 20px;
  transform: translateY(-50%);
`;

type Props = {
  onEmoteClick: (name: string) => void;
};

const EmotePicker = ({ onEmoteClick }: Props) => {
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const emoteCategories = useSelector((state: RootState) =>
    emoteCategoriesSelector(state, search),
  );

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }

    return () => setSearch('');
  }, []);

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
      <SearchBlock>
        <SearchIcon />
        <SearchInput
          ref={searchInputRef}
          placeholder="Search for Emotes"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </SearchBlock>
      <Categories>
        <Scrollbar>{emoteCategories.map(renderCategory)}</Scrollbar>
      </Categories>
    </EmotePickerRoot>
  );
};

export default EmotePicker;
