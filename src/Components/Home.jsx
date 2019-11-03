import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setIsAuth } from '../reducers/auth';
import Chat from './Chat';

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const rawUser = localStorage.getItem('user');

    if (rawUser) {
      const user = JSON.parse(rawUser);

      dispatch(setIsAuth({ isAuth: true, user }));
    }

    // try to connect to the chat. if there is an error, set isAuth to false and connect without login

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <Chat />;
};

export default Home;
