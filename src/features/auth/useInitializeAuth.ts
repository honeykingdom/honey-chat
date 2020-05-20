import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwt from 'jsonwebtoken';

import { initializeAuth, fetchUser } from 'features/auth/authSlice';
import { isAuthReadySelector } from 'features/auth/authSelectors';
import { readUserFromLocatStorage } from 'features/auth/authUtils';

const useInitializeAuth = () => {
  const dispatch = useDispatch();
  const isAuthReady = useSelector(isAuthReadySelector);

  useEffect(() => {
    if (isAuthReady) return;

    const { idToken } = localStorage;
    const user = readUserFromLocatStorage();

    if (!idToken) {
      dispatch(initializeAuth({ isAuth: false }));
      return;
    }

    if (user) {
      const { id, login } = user;
      const params = { isAuth: true, userId: id, userLogin: login };

      dispatch(initializeAuth(params));
    } else {
      const jwtData = jwt.decode(idToken);

      if (jwtData) {
        dispatch(fetchUser(jwtData.sub));
      } else {
        dispatch(initializeAuth({ isAuth: false }));
      }
    }
  }, [dispatch, isAuthReady]);
};

export default useInitializeAuth;
