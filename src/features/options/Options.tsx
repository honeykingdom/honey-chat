import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Scrollbar from 'components/Scrollbar';
import Switch from 'components/Switch';
import {
  userDisplayNameSelector,
  userColorSelector,
  userBadgesImagesSelector,
} from 'features/chat/selectors';
import { isAuthSelector } from 'features/auth/authSlice';
import { changeOption } from 'features/options/optionsSlice';
import { optionsSelector } from 'features/options/optionsSelectors';

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
const Profile = styled.div`
  display: flex;
  align-items: center;
`;
const UserName = styled.div`
  font-weight: bold;
  color: ${(p) => p.color};
`;
const LogOutButton = styled(Link)`
  margin-left: auto;
  color: #bf94ff;
  text-decoration: none;
  cursor: pointer;

  &:focus,
  &:hover {
    color: #a970ff;
    text-decoration: underline;
  }

  &:visited {
    color: #a970ff;
  }
`;
const Badge = styled.img`
  margin-right: 3px;
  max-width: 100%;
  vertical-align: middle;
  border-radius: 3px;
`;

const Options = () => {
  const dispatch = useDispatch();
  const options = useSelector(optionsSelector);

  const isAuth = useSelector(isAuthSelector);

  const userDisplayName = useSelector(userDisplayNameSelector);
  const userColor = useSelector(userColorSelector);
  const userBadgesImages = useSelector(userBadgesImagesSelector);

  const renderOption = useCallback(
    ({ id, name, title, description, value }) => (
      <Option
        key={id}
        onClick={() => dispatch(changeOption({ name, value: !value }))}
        title={description}
      >
        <OptionText>{title}</OptionText>
        <Switch
          id={id}
          label={title}
          checked={value}
          onChange={() => dispatch(changeOption({ name, value }))}
        />
      </Option>
    ),
    [dispatch],
  );

  const renderProfileCategory = () => {
    return (
      <Category>
        <CategoryHeader>Profile</CategoryHeader>
        <CategoryItems>
          <Profile>
            {userBadgesImages.map(({ alt, label, src, srcSet }, key) => (
              <Badge
                // eslint-disable-next-line react/no-array-index-key
                key={key}
                alt={alt}
                aria-label={label}
                src={src}
                srcSet={srcSet}
              />
            ))}
            <UserName color={userColor}>{userDisplayName}</UserName>
            <LogOutButton to="/chat/logout">Log Out</LogOutButton>
          </Profile>
        </CategoryItems>
      </Category>
    );
  };

  const renderOptionsCategory = useCallback(
    ({ title, items }, key) => (
      <Category key={key}>
        {!!title && <CategoryHeader>{title}</CategoryHeader>}
        <CategoryItems>{items.map(renderOption)}</CategoryItems>
      </Category>
    ),
    [renderOption],
  );

  return (
    <OptionsRoot>
      <Header>Chat settings</Header>
      <Categories>
        {isAuth && renderProfileCategory()}
        {options.map(renderOptionsCategory)}
      </Categories>
    </OptionsRoot>
  );
};

export default Options;
