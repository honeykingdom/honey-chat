import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { LS_LAST_CHANNEL } from 'utils/constants';
import { updateCurrentChannel } from 'features/chat/chatSlice';

// TODO: remove lastChannel if can't connect to the channel

const useCurrentChannel = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { hash } = history.location;

  useEffect(() => {
    if (hash && hash.length > 1) {
      const channel = hash.slice(1);

      dispatch(updateCurrentChannel(channel));

      localStorage.setItem(LS_LAST_CHANNEL, channel);

      document.title = channel
        ? `#${channel} - ${process.env.REACT_APP_NAME} `
        : (process.env.REACT_APP_NAME as string);

      return;
    }

    const lastChannel = localStorage.getItem(LS_LAST_CHANNEL);

    if (lastChannel) {
      history.push({ pathname: '/chat/', hash: lastChannel });

      dispatch(updateCurrentChannel(lastChannel));
    } else {
      dispatch(updateCurrentChannel(''));
    }
  }, [dispatch, history, hash]);
};

export default useCurrentChannel;
