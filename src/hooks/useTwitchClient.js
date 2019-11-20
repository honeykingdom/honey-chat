import { useEffect, useRef, useMemo } from 'react';
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
import { currentChannelSelector } from 'reducers/chat/selectors';
import { isAuthSelector, userIdSelector } from 'reducers/auth/selectors';
import { NOTICE_MESSAGE_TAGS } from 'utils/constants';
import createOwnMessage from 'utils/createOwnMessage';

const useTwitchClient = (name, auth) => {
  const dispatch = useDispatch();

  const currentChannel = useSelector(currentChannelSelector);
  const prevChannel = usePrevious(currentChannel);
  const userId = useSelector(userIdSelector);
  const isAuth = useSelector(isAuthSelector);
  const clientRef = useRef(null);

  useEffect(() => {
    if (!currentChannel) return () => {};

    const handleRegister = () => dispatch(setIsConnected(true));
    const handleDisconnect = () => dispatch(setIsConnected(true));
    const handleGlobalUserState = (data) =>
      dispatch(updateGlobalUserState(data));
    const handleUserState = (data) => dispatch(updateUserState(data));
    const handleRoomState = (data) => dispatch(updateRoomState(data));
    const handleMessage = (data) => dispatch(addMessage(data));
    const handleNotice = (data) => {
      const normalizedMessage = { ...data, tags: { ...data.tags, id: uuid() } };
      dispatch(addNoticeMessage(normalizedMessage));
    };
    const handleUserNotice = (data) => dispatch(addUserNoticeMessage(data));
    const handleClearChat = (data) => {
      if (!data.tags.targetUserId) return;
      dispatch(clearChat(data));
    };

    if (!clientRef.current) {
      (async () => {
        clientRef.current = new Client(isAuth ? { name, auth } : {});

        await clientRef.current.connect();

        clientRef.current.join(currentChannel);
      })();
    } else if (prevChannel !== currentChannel) {
      clientRef.current.part(prevChannel);
      clientRef.current.join(currentChannel);
    }

    clientRef.current.on('register', handleRegister);
    clientRef.current.on('disconnect', handleDisconnect);
    clientRef.current.on('globaluserstate', handleGlobalUserState);
    clientRef.current.on('userstate', handleUserState);
    clientRef.current.on('roomstate', handleRoomState);
    clientRef.current.on('message', handleMessage);
    clientRef.current.on('notice', handleNotice);
    clientRef.current.on('usernotice', handleUserNotice);
    clientRef.current.on('clearchat', handleClearChat);

    return () => {
      clientRef.current.off('register', handleRegister);
      clientRef.current.off('disconnect', handleDisconnect);
      clientRef.current.off('globaluserstate', handleGlobalUserState);
      clientRef.current.off('userstate', handleUserState);
      clientRef.current.off('roomstate', handleRoomState);
      clientRef.current.off('message', handleMessage);
      clientRef.current.off('notice', handleNotice);
      clientRef.current.off('usernotice', handleUserNotice);
      clientRef.current.off('clearchat', handleClearChat);
    };
  }, [dispatch, name, auth, currentChannel, prevChannel, isAuth]);

  const client = () => ({
    say(channel, message) {
      if (!clientRef.current) return;

      clientRef.current.say(channel, message);

      function handleUserState(data) {
        if (data.channel === channel) {
          const m = createOwnMessage(message, data.tags, channel, name, userId);
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

  return useMemo(client, [clientRef, dispatch, name, userId]);
};

export default useTwitchClient;
