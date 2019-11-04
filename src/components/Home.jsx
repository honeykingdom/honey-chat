import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setIsAuth } from '../reducers/auth';
import AuthCallback from './AuthCallback';
import Chat from './Chat';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!window.location.hash) {
      const rawUser = localStorage.getItem('user');

      if (rawUser) {
        const user = JSON.parse(rawUser);

        dispatch(setIsAuth({ isAuth: true, user }));
      }

      // try to connect to the chat. if there is an error, set isAuth to false and connect without login
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (window.location.hash) {
    return <AuthCallback />;
  }

  return <Chat />;
};

export default Home;
