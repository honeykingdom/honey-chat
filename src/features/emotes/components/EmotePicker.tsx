import React, { useState, useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'app/hooks';
import IconButton from 'components/IconButton';
import SearchIconSvg from 'icons/search.svg';
import CloseIconSvg from 'icons/close.svg';
import type { EmotesCategory, HtmlEmote } from '../emotesTypes';
import { emoteCategoriesSelector } from '../emotesSelectors';
import useFrequentlyUsedEmotes from '../hooks/useFrequentlyUsedEmotes';

const EmotePickerRoot = styled.div`
  padding-top: 16px;
  padding-bottom: 16px;
  height: 100%;
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  white-space: normal;
  color: #fff;
  border-radius: 4px;
`;
const Categories = styled.div`
  height: calc(100% - 30px);
  overflow-x: hidden;
  overflow-y: scroll;
`;
const Category = styled.div`
  padding-top: 10px;
  padding-right: 8px;
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
  display: flex;
  justify-content: space-between;
  padding: 0 16px;
  color: #adadb8;
`;
const SearchInput = styled.input`
  padding-left: 30px;
  padding-right: 10px;
  width: calc(100% - 36px);
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
const CloseIcon = styled(CloseIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;

const getRenderedEmoteCategories = (
  search: string,
  emoteCategories: EmotesCategory[],
  frequentlyUsedEmotes: HtmlEmote[],
) => {
  let result: EmotesCategory[] = [];

  const normalizedSearch = search.trim().toLowerCase();

  if (normalizedSearch) {
    result = emoteCategories
      .map((category) => ({
        ...category,
        items: category.items.filter(({ alt }) =>
          alt.toLowerCase().includes(normalizedSearch),
        ),
      }))
      .filter((category) => category.items.length);

    if (result.length === 0) {
      result = [{ title: `No Search Results for "${search}"`, items: [] }];
    }
  } else {
    result = [...emoteCategories];

    if (frequentlyUsedEmotes.length !== 0) {
      result.unshift({
        title: 'Frequently Used',
        items: frequentlyUsedEmotes,
      });
    }
  }

  return result;
};

type Props = {
  onClose: () => void;
  onEmoteClick: (name: string) => void;
};

const EmotePicker = ({ onClose, onEmoteClick }: Props) => {
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const emoteCategories = useAppSelector(emoteCategoriesSelector);

  const frequentlyUsedEmotes = useFrequentlyUsedEmotes();

  useEffect(() => {
    searchInputRef.current?.focus();

    return () => setSearch('');
  }, []);

  const renderedEmoteCategories = getRenderedEmoteCategories(
    search,
    emoteCategories,
    frequentlyUsedEmotes,
  );

  const renderCategory = ({ title, items }: EmotesCategory, key: number) => (
    <Category key={key}>
      {!!title && <CategoryHeader>{title}</CategoryHeader>}
      <CategoryItems>
        {items.map(({ id, alt, src, srcSet }) => (
          <Emote
            key={id}
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
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </SearchBlock>
      <Categories>{renderedEmoteCategories.map(renderCategory)}</Categories>
    </EmotePickerRoot>
  );
};

export default React.memo(EmotePicker);
