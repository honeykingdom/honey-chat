import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { LS_LAST_CHANNEL } from 'utils/constants';
import useLocationHash from 'hooks/useLocationHash';
import { updateCurrentChannel } from 'features/chat/slice';

const useCurrentChannel = () => {
  const dispatch = useDispatch();
  const hash = useLocationHash();

  useEffect(() => {
    if (hash && hash.length > 1) {
      const channel = hash.slice(1);

      dispatch(updateCurrentChannel(channel));

      localStorage.setItem(LS_LAST_CHANNEL, channel);

      document.title = channel
        ? `#${channel} - ${process.env.REACT_APP_NAME} `
        : (process.env.REACT_APP_NAME as string);
    }
  }, [dispatch, hash]);
};

export default useCurrentChannel;
