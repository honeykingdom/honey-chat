import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';
import { Client } from 'twitch-simple-irc';

import usePrevious from 'hooks/usePrevious';
import {
  addMessage,
  addNoticeMessage,
  addUserNoticeMessage,
  clearChat,
} from 'reducers/messages';
import {
  setIsConnected,
  updateGlobalUserState,
  updateUserState,
  updateRoomState,
} from 'reducers/chat';
import {
  currentChannelSelector,
  isConnectedSelector,
} from 'reducers/chat/selectors';
import {
  isAuthSelector,
  userIdSelector,
  isAuthReadySelector,
  userLoginSelector,
} from 'reducers/auth/selectors';
import { setAuth } from 'reducers/auth';
import { NOTICE_MESSAGE_TAGS } from 'utils/constants';
import createOwnMessage from 'utils/createOwnMessage';

const emptyFunc = () => {};

const useTwitchClient = () => {
  const dispatch = useDispatch();

  const isAuthReady = useSelector(isAuthReadySelector);
  const isAuth = useSelector(isAuthSelector);
  const userLogin = useSelector(userLoginSelector);
  const userId = useSelector(userIdSelector);
  const isConnected = useSelector(isConnectedSelector);
  const currentChannel = useSelector(currentChannelSelector);
  const prevChannel = usePrevious(currentChannel);
  const clientRef = useRef(null);

  const registerEvents = useCallback(
    (client) => {
      const handleRegister = () => dispatch(setIsConnected(true));
      const handleDisconnect = () => dispatch(setIsConnected(false));
      const handleGlobalUserState = (data) =>
        dispatch(updateGlobalUserState(data));
      const handleUserState = (data) => dispatch(updateUserState(data));
      const handleRoomState = (data) => dispatch(updateRoomState(data));
      const handleMessage = (data) => dispatch(addMessage(data));
      const handleNotice = (data) => {
        if (data.message === 'Login authentication failed') {
          dispatch(setAuth({ isAuth: false }));
          client.current.disconnect();
          // eslint-disable-next-line no-param-reassign
          client.current = null;
          return;
        }

        const normalizedMessage = {
          ...data,
          tags: { ...data.tags, id: uuid() },
        };

        dispatch(addNoticeMessage(normalizedMessage));
      };
      const handleUserNotice = (data) => dispatch(addUserNoticeMessage(data));
      const handleClearChat = (data) => {
        if (!data.tags.targetUserId) return;
        dispatch(clearChat(data));
      };

      client.current.on('register', handleRegister);
      client.current.on('disconnect', handleDisconnect);
      client.current.on('globaluserstate', handleGlobalUserState);
      client.current.on('userstate', handleUserState);
      client.current.on('roomstate', handleRoomState);
      client.current.on('message', handleMessage);
      client.current.on('notice', handleNotice);
      client.current.on('usernotice', handleUserNotice);
      client.current.on('clearchat', handleClearChat);
    },
    [dispatch],
  );

  useEffect(() => {
    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
    };
  }, [clientRef]);

  useEffect(() => {
    if (!currentChannel || !isAuthReady) return emptyFunc;

    if (!clientRef.current) {
      const options = isAuth
        ? { name: userLogin, auth: localStorage.accessToken }
        : {};

      (async () => {
        clientRef.current = new Client(options);

        registerEvents(clientRef);

        await clientRef.current.connect();

        clientRef.current.join(currentChannel);
      })();

      return emptyFunc;
    }

    if (prevChannel !== currentChannel) {
      clientRef.current.part(prevChannel);
      clientRef.current.join(currentChannel);
    }

    return emptyFunc;
  }, [
    dispatch,
    registerEvents,
    isAuth,
    isAuthReady,
    isConnected,
    userLogin,
    currentChannel,
    prevChannel,
  ]);

  const client = () => ({
    say(channel, message) {
      if (!clientRef.current) return;

      clientRef.current.say(channel, message);

      function handleUserState(data) {
        if (data.channel === channel) {
          const m = createOwnMessage(
            message,
            data.tags,
            channel,
            userLogin,
            userId,
          );
          dispatch(addMessage(m));
          // eslint-disable-next-line no-use-before-define
          removeListeners();
        }
      }

      function handleNotice(data) {
        if (
          data.channel === channel &&
          NOTICE_MESSAGE_TAGS.includes(data.tags.msgId)
        ) {
          // eslint-disable-next-line no-use-before-define
          removeListeners();
        }
      }

      function removeListeners() {
        clientRef.current.off('notice', handleNotice);
        clientRef.current.off('userstate', handleUserState);
      }

      clientRef.current.on('notice', handleNotice);
      clientRef.current.on('userstate', handleUserState);

      setTimeout(() => removeListeners(), 10000);
    },
  });

  return useMemo(client, [clientRef, dispatch, userLogin, userId]);
};

export default useTwitchClient;
