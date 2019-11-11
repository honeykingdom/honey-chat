import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import pt from 'prop-types';
import styled from 'styled-components';

import { changeOption } from 'reducers/options';
import { optionsSelector } from 'reducers/options/selectors';
import Scrollbar from 'components/Scrollbar';
import Switch from 'components/Switch';

const OptionsRoot = styled.div`
  padding: 16px;
  height: 100%;
`;
const Header = styled.h2`
  margin: 0;
  padding: 0;
  font-size: 14px;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
`;
const Categories = styled(Scrollbar)`
  height: 100%;
`;
const Category = styled.div`
  &:not(:last-child) {
    padding-bottom: 10px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.15);
  }
`;
const CategoryHeader = styled.div`
  padding: 8px 0;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.6);
`;
const CategoryItems = styled.div``;
const Option = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 4px 0;
  cursor: pointer;
`;
const OptionText = styled.span``;

const Options = () => {
  const dispatch = useDispatch();
  const options = useSelector(optionsSelector);

  const renderOption = useCallback(
    ({ id, name, title, description, value }) => (
      <Option
        key={id}
        onClick={() => dispatch(changeOption(name, !value))}
        title={description}
      >
        <OptionText>{title}</OptionText>
        <Switch
          id={id}
          label={title}
          checked={value}
          onChange={() => dispatch(changeOption(name, value))}
        />
      </Option>
    ),
  );

  const renderOptionsCategory = useCallback(({ title, items }, key) => (
    <Category key={key}>
      {!!title && <CategoryHeader>{title}</CategoryHeader>}
      <CategoryItems>{items.map(renderOption)}</CategoryItems>
    </Category>
  ));

  return (
    <OptionsRoot>
      <Header>Chat settings</Header>
      <Categories>{options.map(renderOptionsCategory)}</Categories>
    </OptionsRoot>
  );
};

Options.defaultProps = {};

Options.propTypes = {};

export default Options;
