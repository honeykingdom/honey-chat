import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';

import useFetchChatData from 'hooks/useFetchChatData';
import useCurrentChannel from 'hooks/useCurrentChannel';
import useTwitchClient from 'hooks/useTwitchClient';
import { isAuthReadySelector } from 'reducers/auth/selectors';
import { currentChannelSelector } from 'reducers/chat/selectors';
import { setAuth, fetchUser } from 'reducers/auth';
import replaceEmojis from 'utils/replaceEmojis';
import Chat from 'components/Chat';

const Home = () => {
  const dispatch = useDispatch();

  const isAuthReady = useSelector(isAuthReadySelector);
  const currentChannel = useSelector(currentChannelSelector);

  const client = useTwitchClient();

  useCurrentChannel();
  useFetchChatData();

  useEffect(() => {
    if (isAuthReady) return () => {};

    const { user, idToken } = localStorage;

    if (!idToken) {
      dispatch(setAuth({ isAuthReady: true, isAuth: false }));
      return () => {};
    }

    if (user) {
      const params = {
        isAuthReady: true,
        isAuth: true,
        user: JSON.parse(user),
      };

      dispatch(setAuth(params));
    } else {
      const { sub: id } = jwt.decode(idToken);

      dispatch(fetchUser(id));
    }

    return () => {};
  }, [dispatch, isAuthReady]);

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
