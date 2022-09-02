import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { lsRead, lsWrite } from 'utils/ls';
import { LS } from 'utils/constants';
import { channelsInitialized, currentChannelChanged } from '../chatSlice';
import { LsChannels } from '../chatTypes';
import { currentChannelNameSelector } from '../chatSelectors';

/*
Last Channel Priority
1. hash
2. localStorage -> lastChannel
3. first channel in localStorage -> channels

If there is no such channel add it to the first position
*/

const initializeChannels = (): [
  initialChannels: LsChannels,
  initialCurrentChannel: string | undefined,
] => {
  const channels = lsRead(LS.Channels) || [];

  const hashChannel = window.location.hash.slice(1);
  if (hashChannel) {
    if (!channels.some(([name]) => name === hashChannel)) {
      channels.unshift([hashChannel]);
    }
    return [channels, hashChannel];
  }

  const lsChannel = lsRead(LS.LastChannel);
  if (lsChannel) {
    if (!channels.some(([name]) => name === lsChannel)) {
      channels.unshift([lsChannel]);
    }
    return [channels, lsChannel];
  }

  if (channels.length > 0) {
    return [channels, channels[0][0]];
  }

  return [channels, undefined];
};

const useInitializeTabs = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const channel = useAppSelector(currentChannelNameSelector);

  useEffect(() => {
    const [initialChannels, initialCurrentChannel] = initializeChannels();
    if (initialChannels.length === 0 || !initialCurrentChannel) return;
    dispatch(channelsInitialized(initialChannels));
    dispatch(currentChannelChanged(initialCurrentChannel));
  }, []);

  useEffect(() => {
    document.title = channel ? `#${channel} - Honey Chat` : 'Honey Chat';
    if (channel) {
      lsWrite(LS.LastChannel, channel);
      router.push({ hash: channel });
    }
  }, [channel]);
};

export default useInitializeTabs;
