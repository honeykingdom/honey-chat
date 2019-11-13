import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useFetchChatData from 'hooks/useFetchChatData';
import useCurrentChannel from 'hooks/useCurrentChannel';
import useTwitchClient from 'hooks/useTwitchClient';
import { userLoginSelector } from 'reducers/auth/selectors';
import { currentChannelSelector } from 'reducers/chat/selectors';
import { setIsAuth } from 'reducers/auth';
import replaceEmojis from 'utils/replaceEmojis';
import Chat from 'components/Chat';

const Home = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector(userLoginSelector);
  const currentChannel = useSelector(currentChannelSelector);

  const client = useTwitchClient(userLogin, localStorage.accessToken);

  useCurrentChannel();
  useFetchChatData();

  useEffect(() => {
    const rawUser = localStorage.getItem('user');

    if (rawUser) {
      const user = JSON.parse(rawUser);

      dispatch(setIsAuth({ isAuth: true, user }));
    }

    // TODO: try to connect to the chat. if there is an error, set isAuth to false and connect without login
  }, [dispatch]);

  const handleSendMessage = useCallback(
    (message) => {
      if (!client) return;
      const normalizedMessage = replaceEmojis(message.trim());
      client.say(currentChannel, normalizedMessage);
    },
    [client, currentChannel],
  );

  return <Chat onSendMessage={handleSendMessage} />;
};

export default Home;
