import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import Button from 'components/Button';
import { clearAuthData, getAuthUrl } from 'features/auth';
import useOnClickOutside from 'hooks/useOnClickOutside';
import TwitchIconSvg from 'icons/twitch.svg';
import { useRef, useState } from 'react';
import { authStatusChanged } from '../chatSlice';
import { authStatusSelector, meSelector } from '../chatSelectors';

const ProfileRoot = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 13px;
  max-width: calc(100% - 128px);
`;
const ProfileContainer = styled.div`
  max-width: 100%;
`;
const UserButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  height: 30px;
  max-width: 100%;
  vertical-align: middle;
  overflow: hidden;
  white-space: nowrap;
  user-select: none;
  border-radius: 4px;
  font-weight: 600;
  font-family: inherit;
  color: rgba(173, 173, 184, 0.7);
  border: none;
  background: none;
  transition-property: background-color, color;
  transition-duration: 0.1s;
  transition-timing-function: ease;
  cursor: pointer;

  &:hover,
  &:focus {
    background-color: rgba(255, 255, 255, 0.2);
    color: #adadb8;
  }
`;
const UserAvatar = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 5px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
`;
const UserName = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Dropdown = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  transform: translateY(-100%);
  box-shadow: rgba(0, 0, 0, 0.4) 0px 4px 8px 0px,
    rgba(0, 0, 0, 0.4) 0px 0px 4px 0px;
  background-color: #18181b;
  border-radius: 4px;
`;
const DropdownButton = styled.button`
  padding: 8px 8px;
  width: 100%;
  color: #bf94ff;
  text-decoration: none;
  background: none;
  border: none;
  font: inherit;
  text-align: left;
  border-radius: 4px;
  color: #fff;
  cursor: pointer;

  &:focus,
  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;
const TwitchIcon = styled(TwitchIconSvg)`
  display: block;
  margin-right: 4px;
  width: 20px;
  height: 20px;
`;
const ButtonA = Button as ReturnType<typeof styled.a>;

const Profile = () => {
  const dispatch = useAppDispatch();
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const authStatus = useAppSelector(authStatusSelector);

  const profileRef = useRef<HTMLDivElement>(null);

  const me = useAppSelector(meSelector);

  useOnClickOutside(profileRef, () => setIsDropdownActive(false));

  const handleLogout = () => {
    dispatch(authStatusChanged({ authStatus: 'error' }));
    clearAuthData();
  };

  const renderSignInButton = () => (
    <ButtonA as="a" href={getAuthUrl()}>
      <TwitchIcon />
      Sign in with Twitch
    </ButtonA>
  );

  const renderProfile = () => (
    <ProfileContainer ref={profileRef}>
      <UserButton onClick={() => setIsDropdownActive((prev) => !prev)}>
        <UserAvatar alt={me.displayName || me.login} src={me.picture} />
        <UserName color={me.color}>{me.displayName || me.login}</UserName>
      </UserButton>
      {isDropdownActive && (
        <Dropdown>
          <DropdownButton onClick={handleLogout}>Log Out</DropdownButton>
        </Dropdown>
      )}
    </ProfileContainer>
  );

  return (
    <ProfileRoot>
      {authStatus === 'error' && renderSignInButton()}
      {authStatus === 'success' && renderProfile()}
    </ProfileRoot>
  );
};

export default Profile;
