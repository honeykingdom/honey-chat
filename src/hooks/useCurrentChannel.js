import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import useLocationHash from 'hooks/useLocationHash';
import { setCurrentChannel } from 'reducers/chat';

const useCurrentChannel = () => {
  const dispatch = useDispatch();
  const hash = useLocationHash();

  useEffect(() => {
    if (hash && hash.length > 1) {
      const channel = hash.slice(1);

      dispatch(setCurrentChannel(channel));

      localStorage.setItem('lastChannel', channel);

      document.title = channel
        ? `#${channel} - ${process.env.REACT_APP_NAME} `
        : process.env.REACT_APP_NAME;
    }
  }, [dispatch, hash]);
};

export default useCurrentChannel;
