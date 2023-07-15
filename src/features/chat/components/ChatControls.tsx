import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'app/hooks';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Modal from 'components/Modal';
import OptionsCategories from 'features/options/components/OptionsCategories';
import GearsIconSvg from 'icons/gears.svg';
import GithubIconSvg from 'icons/github.svg';
import { authStatusSelector, isRegisteredSelector } from '../chatSelectors';
import Profile from './Profile';

const ChatControlsRoot = styled.div`
  position: relative;
  padding-left: 10px;
  padding-right: 10px;
  padding-bottom: 10px;
`;
const Controls = styled.div`
  display: flex;
  align-items: center;
`;
const ControlButtons = styled.div`
  display: flex;
  align-items: center;
  margin-left: auto;
  flex-shrink: 0;

  & > :not(:last-child) {
    margin-right: 8px;
  }
`;
const GearsIcon = styled(GearsIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;
const GithubIcon = styled(GithubIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
  padding: 2px;
`;
const IconButtonA = IconButton as unknown as ReturnType<typeof styled.a>;

type Props = {
  onChatClick: () => void;
};

const ChatControls = ({ onChatClick }: Props) => {
  const authStatus = useAppSelector(authStatusSelector);
  const isRegistered = useAppSelector(isRegisteredSelector);

  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const handleCloseOptions = () => setIsOptionsVisible(false);

  return (
    <ChatControlsRoot>
      <Controls>
        <Profile />
        <ControlButtons>
          <IconButtonA
            as="a"
            title="Github Repo"
            href="https://github.com/honeykingdom/honey-chat"
            target="_blank"
            rel="noreferrer noopener"
          >
            <GithubIcon />
          </IconButtonA>
          <IconButton
            title="Chat settings"
            onClick={() => setIsOptionsVisible((prev) => !prev)}
          >
            <GearsIcon />
          </IconButton>
          <Button
            disabled={!(isRegistered && authStatus === 'success')}
            onClick={onChatClick}
          >
            Chat
          </Button>
        </ControlButtons>
      </Controls>
      <Modal
        title="Chat settings"
        isOpen={isOptionsVisible}
        onClose={handleCloseOptions}
      >
        <OptionsCategories />
      </Modal>
    </ChatControlsRoot>
  );
};

export default React.memo(ChatControls);
