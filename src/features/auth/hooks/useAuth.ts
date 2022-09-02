import { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { LS } from 'utils/constants';
import { lsRead, lsWrite } from 'utils/ls';
import api, { JwtPayload } from 'features/api';
import { authStatusChanged, authStatusSelector } from 'features/chat';
import { LsUser } from '../authTypes';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const meAuthStatus = useAppSelector(authStatusSelector);

  useEffect(() => {
    if (meAuthStatus !== 'uninitialized') return;

    let idToken: string | null | undefined;
    let accessToken: string | null | undefined;

    if (window.location.hash.startsWith('#access_token=')) {
      const params = new URLSearchParams(window.location.hash.slice(1));

      idToken = params.get('id_token');
      accessToken = params.get('access_token');

      if (accessToken && idToken) {
        lsWrite(LS.Tokens, { accessToken, idToken });
      }

      window.location.hash = '';
    } else {
      const tokens = lsRead(LS.Tokens);
      accessToken = tokens?.accessToken;
      idToken = tokens?.idToken;
    }

    if (!idToken || !accessToken) {
      dispatch(authStatusChanged({ authStatus: 'error' }));
      return;
    }

    const user = lsRead(LS.User);

    if (user) {
      dispatch(
        authStatusChanged({ authStatus: 'success', accessToken, ...user }),
      );
      return;
    }

    const jwtData = jwtDecode<JwtPayload>(idToken);

    if (!jwtData) {
      dispatch(authStatusChanged({ authStatus: 'error' }));
      return;
    }

    dispatch(
      authStatusChanged({
        authStatus: 'success',
        accessToken,
        id: jwtData.sub,
        displayName: jwtData.preferred_username,
        picture: jwtData.picture,
      }),
    );

    (async () => {
      let result: Awaited<ReturnType<typeof api.twitch.users.getUsers>>;

      try {
        result = await api.twitch.users.getUsers(
          [{ id: jwtData.sub }],
          accessToken,
        );
      } catch (e) {
        dispatch(authStatusChanged({ authStatus: 'error' }));
        return;
      }

      const twitchUser = result.data[0];
      const user: LsUser = {
        id: twitchUser.id,
        login: twitchUser.login,
        displayName: twitchUser.display_name,
        picture: twitchUser.profile_image_url,
      };

      dispatch(
        authStatusChanged({ authStatus: 'success', accessToken, ...user }),
      );
      lsWrite(LS.User, user);
    })();
  }, [meAuthStatus]);
};

export default useAuth;
