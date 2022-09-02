import styled from '@emotion/styled';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { createCustomNotice } from 'features/messages';
import CloseIconSvg from 'icons/close.svg';
import { LS } from 'utils/constants';
import { lsRead, lsWrite } from 'utils/ls';
import {
  channelNamesSelector,
  currentChannelNameSelector,
} from '../chatSelectors';
import {
  currentChannelChanged,
  channelAdded,
  channelRemoved,
  messageReceived,
} from '../chatSlice';
import type useTwitchClient from '../hooks/useTwitchClient';

const TabsRoot = styled.div`
  display: flex;
  background-color: #18181b;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;
const Tab = styled.div<{ $isActive: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  height: 32px;
  font-size: 15px;
  color: #fff;
  background-color: ${(p) => (p.$isActive ? '#9147ff' : 'transparent')};
  border-right: 1px solid
    ${(p) => (p.$isActive ? 'transparent' : 'rgba(255, 255, 255, 0.1)')};
  cursor: pointer;

  &:hover {
    background-color: ${(p) =>
      p.$isActive ? 'rgba(145, 71, 255, 0.95)' : 'rgba(255, 255, 255, 0.05)'};

    svg {
      ${(p) => (p.$isActive ? 'opacity: 0.9' : '')};
    }
  }

  svg {
    ${(p) => (p.$isActive ? 'opacity: 0.6' : '')};
  }
`;
const TabName = styled.span<{ $isAdd?: boolean }>`
  padding-left: 16px;
  padding-right: ${(p) => (p.$isAdd ? '16px' : '32px')};
`;
const CloseIcon = styled(CloseIconSvg)`
  position: absolute;
  padding: 2px;
  top: calc(50% + 1px);
  right: 8px;
  display: block;
  width: 16px;
  height: 16px;
  opacity: 0.3;
  transform: translateY(-50%);
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
    opacity: 0.6;
  }
`;

type Props = {
  chat: ReturnType<typeof useTwitchClient>;
};

const ChatTabs = ({ chat }: Props) => {
  const dispatch = useAppDispatch();

  const channelNames = useAppSelector(channelNamesSelector);
  const currentChannelName = useAppSelector(currentChannelNameSelector);

  const handleTabClick = (name: string) => () => {
    dispatch(currentChannelChanged(name));
  };

  const handleCloseTab = (name: string) => () => {
    chat.current?.part(name);
    dispatch(channelRemoved(name));

    const lsChannels = lsRead(LS.Channels);
    if (lsChannels) {
      lsWrite(
        LS.Channels,
        lsChannels.filter(([n]) => n !== name),
      );
    }
  };

  const handleAddTabClick = () => {
    const name = prompt('Enter channel name', '');
    if (!name) return;
    const normalizedName = name.trim().toLowerCase();
    if (!normalizedName || normalizedName.includes(' ')) return;

    chat.current
      ?.join(normalizedName)
      .catch((e) =>
        dispatch(
          messageReceived(createCustomNotice(normalizedName, e.message)),
        ),
      );

    dispatch(channelAdded(normalizedName));

    const lsChannels = lsRead(LS.Channels);
    if (lsChannels) {
      lsChannels.push([name]);
      lsWrite(LS.Channels, lsChannels);
    }
  };

  return (
    <TabsRoot>
      {channelNames.map((name) => (
        <Tab key={name} $isActive={name === currentChannelName}>
          <TabName onClick={handleTabClick(name)}>{name}</TabName>
          <CloseIcon onClick={handleCloseTab(name)} />
        </Tab>
      ))}
      <Tab $isActive={false}>
        <TabName $isAdd onClick={handleAddTabClick}>
          +
        </TabName>
      </Tab>
    </TabsRoot>
  );
};

export default ChatTabs;
