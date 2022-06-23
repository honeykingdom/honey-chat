import { useEffect } from 'react';
import { useRouter } from 'next/router';
import jwtDecode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LS_ACCESS_TOKEN, LS_ID_TOKEN, LS_LAST_CHANNEL } from 'utils/constants';
import {
  useLazyUserQuery,
  JwtPayload,
  TwitchUsersResponse,
} from 'features/api';
import { initializeAuth } from './authSlice';
import { isAuthSelector } from './authSelectors';
import { readUserFromLocalStorage, writeUserToLocalStorage } from './authUtils';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const isAuth = useAppSelector(isAuthSelector);

  const [fetchUser] = useLazyUserQuery();

  useEffect(() => {
    if (isAuth) return;

    let idToken: string | null;
    let accessToken: string | null;

    if (window.location.hash.startsWith('#access_token=')) {
      const params = new URLSearchParams(window.location.hash.slice(1));

      idToken = params.get('id_token');
      accessToken = params.get('access_token');

      if (accessToken && idToken) {
        localStorage.setItem(LS_ACCESS_TOKEN, accessToken);
        localStorage.setItem(LS_ID_TOKEN, idToken);
      }

      router.push({
        pathname: '/',
        hash: localStorage.getItem(LS_LAST_CHANNEL) || '',
      });
    } else {
      idToken = localStorage.getItem(LS_ID_TOKEN);
      accessToken = localStorage.getItem(LS_ACCESS_TOKEN);
    }

    const user = readUserFromLocalStorage();

    if (!idToken || !accessToken) {
      dispatch(initializeAuth({ status: 'error' }));
      return;
    }

    if (user) {
      dispatch(initializeAuth({ status: 'success', accessToken, user }));
      return;
    }

    const jwtData = jwtDecode<JwtPayload>(idToken);

    if (!jwtData) {
      dispatch(initializeAuth({ status: 'error' }));
      return;
    }

    (async () => {
      dispatch(initializeAuth({ status: 'pending', accessToken }));

      let result: TwitchUsersResponse;

      try {
        result = await fetchUser(jwtData.sub).unwrap();
      } catch (e) {
        dispatch(initializeAuth({ status: 'error' }));
        return;
      }

      const twitchUser = result.data[0];
      const user = { id: twitchUser.id, login: twitchUser.login };

      dispatch(initializeAuth({ status: 'success', user }));
      writeUserToLocalStorage(user);
    })();
  }, [dispatch, isAuth]);
};

export default useAuth;
