import { useEffect, useRef, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';
import twitchIrc from 'twitch-simple-irc';

import usePrevious from 'hooks/usePrevious';
import { NOTICE_MESSAGE_TAGS, LS_ACCESS_TOKEN } from 'utils/constants';
import {
  addMessage,
  clearChat,
  updateIsConnected,
  updateGlobalUserParams,
  updateUserParams,
  updateRoomParams,
  addOwnMessage,
} from 'features/chat/slice';
import {
  currentChannelSelector,
  isConnectedSelector,
} from 'features/chat/selectors';
import replaceEmojis from 'features/chat/utils/replaceEmojis';
import {
  isAuthSelector,
  isAuthReadySelector,
  userLoginSelector,
  invalidateAuth,
} from 'features/auth/authSlice';

const useTwitchClient = () => {
  const dispatch = useDispatch();

  const isAuthReady = useSelector(isAuthReadySelector);
  const isAuth = useSelector(isAuthSelector);
  const userLogin = useSelector(userLoginSelector);
  const isConnected = useSelector(isConnectedSelector);
  const currentChannel = useSelector(currentChannelSelector);
  const prevChannel = usePrevious(currentChannel);
  const clientRef = useRef<twitchIrc.Client | null>(null);

  const registerEvents = useCallback(
    (client: typeof clientRef) => {
      if (!client.current) return;

      const handleRegister = () => dispatch(updateIsConnected(true));

      const handleDisconnect = () => dispatch(updateIsConnected(false));

      const handleGlobalUserState = (data: twitchIrc.GlobalUserStateEvent) =>
        dispatch(updateGlobalUserParams(data));

      const handleUserState = (data: twitchIrc.UserStateEvent) =>
        dispatch(updateUserParams(data));

      const handleRoomState = (data: twitchIrc.RoomStateEvent) =>
        dispatch(updateRoomParams(data));

      const handleMessage = (message: twitchIrc.MessageEvent) =>
        dispatch(addMessage({ type: 'message', message }));

      const handleNotice = (message: twitchIrc.NoticeEvent) => {
        if (
          client.current &&
          message.message === 'Login authentication failed'
        ) {
          dispatch(invalidateAuth());
          client.current.disconnect();
          // eslint-disable-next-line no-param-reassign
          client.current = null;
          return;
        }

        dispatch(addMessage({ type: 'notice', message, id: uuid() }));
      };

      const handleUserNotice = (message: twitchIrc.UserNoticeEvent) =>
        dispatch(addMessage({ type: 'user-notice', message }));

      const handleClearChat = (data: twitchIrc.ClearChatEvent) => {
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
    if (!currentChannel || !isAuthReady) return;

    if (!clientRef.current) {
      const options = isAuth
        ? {
            name: userLogin as string,
            auth: localStorage.getItem(LS_ACCESS_TOKEN),
          }
        : null;

      (async () => {
        clientRef.current = new twitchIrc.Client(options);

        registerEvents(clientRef);

        await clientRef.current.connect();

        clientRef.current.join(currentChannel);
      })();

      return;
    }

    if (prevChannel && prevChannel !== currentChannel) {
      clientRef.current.part(prevChannel);
      clientRef.current.join(currentChannel);
    }
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
    say(channel: string, message: string) {
      if (!clientRef.current || !message.trim()) return;

      const normalizedMessage = replaceEmojis(message.trim());

      clientRef.current.say(channel, normalizedMessage);

      function handleUserState(data: twitchIrc.UserStateEvent) {
        if (data.channel === channel) {
          dispatch(
            addOwnMessage({
              message: normalizedMessage,
              channel,
              tags: data.tags,
            }),
          );
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          removeListeners();
        }
      }

      function handleNotice(data: twitchIrc.NoticeEvent) {
        if (
          data.channel === channel &&
          NOTICE_MESSAGE_TAGS.includes(data.tags.msgId)
        ) {
          // eslint-disable-next-line @typescript-eslint/no-use-before-define
          removeListeners();
        }
      }

      function removeListeners() {
        if (!clientRef.current) return;

        clientRef.current.off('notice', handleNotice);
        clientRef.current.off('userstate', handleUserState);
      }

      clientRef.current.on('notice', handleNotice);
      clientRef.current.on('userstate', handleUserState);

      setTimeout(() => removeListeners(), 10000);
    },
  });

  return useMemo(client, [clientRef, dispatch]);
};

export default useTwitchClient;
