import React, { useState } from 'react';
import styled from '@emotion/styled';
import { useAppSelector } from 'app/hooks';
import Button from 'components/Button';
import IconButton from 'components/IconButton';
import Modal from 'components/Modal';
import { OptionsCategories } from 'features/options';
import GearsIconSvg from 'icons/gears.svg';
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

  & > :not(:last-child) {
    margin-right: 8px;
  }
`;
const OptionsButton = styled(IconButton)`
  margin-left: auto;
`;
const GearsIcon = styled(GearsIconSvg)`
  display: block;
  width: 20px;
  height: 20px;
`;

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
        <OptionsButton onClick={() => setIsOptionsVisible((prev) => !prev)}>
          <GearsIcon />
        </OptionsButton>
        <Button
          disabled={!(isRegistered && authStatus === 'success')}
          onClick={onChatClick}
        >
          Chat
        </Button>
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
