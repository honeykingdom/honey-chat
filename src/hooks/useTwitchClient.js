import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';

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
import { isAuthSelector } from 'reducers/auth/selectors';
import Client from 'utils/twitchChat';

let client = null;

const useTwitchClient = (name, auth) => {
  const dispatch = useDispatch();

  const currentChannel = useSelector(currentChannelSelector);
  const isAuth = useSelector(isAuthSelector);

  useEffect(() => {
    if (!currentChannel) return () => {};

    const options = {
      identity: {
        name,
        auth,
      },
    };

    const handleConnected = () => dispatch(setIsConnected(true));
    const handleDisconnected = () => dispatch(setIsConnected(true));

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

    if (!client) {
      client = new Client(isAuth ? options : {});
      client.connect();
    }

    // TODO: update blocked users if the /block command was sent

    client.on('connected', handleConnected);
    client.on('disconnected', handleDisconnected);
    client.on('globaluserstate', handleGlobalUserState);
    client.on('userstate', handleUserState);
    client.on('roomstate', handleRoomState);
    client.on('message', handleMessage);
    client.on('ownmessage', handleMessage);
    client.on('notice', handleNotice);
    client.on('usernotice', handleUserNotice);
    client.on('clearchat', handleClearChat);

    // TODO: Part the previous channel before join
    client.join(currentChannel);

    return () => {
      client.off('connected', handleConnected);
      client.off('disconnected', handleDisconnected);
      client.off('globaluserstate', handleGlobalUserState);
      client.off('userstate', handleUserState);
      client.off('roomstate', handleRoomState);
      client.off('message', handleMessage);
      client.off('ownmessage', handleMessage);
      client.off('notice', handleNotice);
      client.off('usernotice', handleUserNotice);
      client.off('clearchat', handleClearChat);
    };
  }, [dispatch, name, auth, currentChannel, isAuth]);

  return client;
};

export default useTwitchClient;
