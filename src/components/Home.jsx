import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'uuid/v4';

import useLocationHash from 'hooks/useLocationHash';
import useDocumentTitle from 'hooks/useDocumentTitle';
import { fetchTwitchEmotes } from 'reducers/emotes/twitch';
import {
  fetchBttvGlobalEmotes,
  fetchBttvChannelEmotes,
} from 'reducers/emotes/bttv';
import {
  fetchFfzGlobalEmotes,
  fetchFfzChannelEmotes,
} from 'reducers/emotes/ffz';
import {
  isTwitchEmotesLoadedSelector,
  isBttvEmotesLoadedSelector,
  isFfzEmotesLoadedSelector,
} from 'reducers/emotes/selectors';
import {
  addMessage,
  addNoticeMessage,
  addUserNoticeMessage,
  fetchRecentMessages,
  addRecentMessages,
  clearChat,
} from 'reducers/messages';
import { isHistoryLoadedSelector } from 'reducers/messages/selectors';
import {
  setCurrentChannel,
  setIsConnected,
  updateGlobalUserState,
  updateUserState,
  updateRoomState,
  fetchBlockedUsers,
} from 'reducers/chat';
import {
  currentChannelSelector,
  channelIdSelector,
  blockedUsersSelector,
  isBlockedUsersLoadedSelector,
} from 'reducers/chat/selectors';
import { fetchGlobalBadges, fetchChannelBadges } from 'reducers/badges';
import { isBadgesLoadedSelector } from 'reducers/badges/selectors';
import { setIsAuth } from 'reducers/auth';
import Client from 'utils/twitchChat';
import replaceEmojis from 'utils/replaceEmojis';
import Chat from 'components/Chat';

let client = null;

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.user.login);
  const userId = useSelector((state) => state.auth.user.id);
  const currentChannel = useSelector(currentChannelSelector);
  const currentChannelId = useSelector(channelIdSelector);
  const blockedUsers = useSelector(blockedUsersSelector);

  const isTwitchEmotesLoaded = useSelector(isTwitchEmotesLoadedSelector);
  const isBttvEmotesLoaded = useSelector(isBttvEmotesLoadedSelector);
  const isFfzEmotesLoaded = useSelector(isFfzEmotesLoadedSelector);
  const isBadgesLoaded = useSelector(isBadgesLoadedSelector);
  const isHistoryLoaded = useSelector(isHistoryLoadedSelector);
  const isBlockedUsersLoaded = useSelector(isBlockedUsersLoadedSelector);
  const hash = useLocationHash();

  const isReadyToAddRecentMessages =
    currentChannel &&
    (isAuth ? isTwitchEmotesLoaded : true) &&
    (isAuth ? isBlockedUsersLoaded : true) &&
    isBttvEmotesLoaded &&
    isFfzEmotesLoaded &&
    isBadgesLoaded &&
    isHistoryLoaded;

  useDocumentTitle(currentChannel);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');

    if (rawUser) {
      const user = JSON.parse(rawUser);

      dispatch(setIsAuth({ isAuth: true, user }));
    }

    // TODO: try to connect to the chat. if there is an error, set isAuth to false and connect without login
  }, [dispatch]);

  useEffect(() => {
    if (hash && hash.length > 1) {
      const channel = hash.slice(1);
      dispatch(setCurrentChannel(channel));
      localStorage.setItem('lastChannel', channel);
    }
  }, [dispatch, hash]);

  useEffect(() => {
    if (!currentChannel) return () => {};

    const options = {
      identity: {
        name: login,
        auth: localStorage.accessToken,
      },
    };

    const handleConnected = () => dispatch(setIsConnected(true));
    const handleDisconnected = () => dispatch(setIsConnected(true));

    const handleGlobalUserState = (data) =>
      dispatch(updateGlobalUserState(data));

    const handleUserState = (data) => dispatch(updateUserState(data));
    const handleRoomState = (data) => dispatch(updateRoomState(data));
    const handleMessage = (data) => {
      if (blockedUsers.includes(data.user)) return;
      dispatch(addMessage(data));
    };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, login, currentChannel, isAuth, blockedUsers.length]);

  useEffect(() => {
    dispatch(fetchBttvGlobalEmotes());
    dispatch(fetchFfzGlobalEmotes());
    dispatch(fetchGlobalBadges());
  }, [dispatch]);

  useEffect(() => {
    if (currentChannel) {
      dispatch(fetchRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel]);

  useEffect(() => {
    if (isReadyToAddRecentMessages) {
      dispatch(addRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel, isReadyToAddRecentMessages]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTwitchEmotes(userId));
      dispatch(fetchBlockedUsers(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    // TODO: check if emotes for the current channel is already in the store
    if (currentChannel && currentChannelId) {
      dispatch(fetchBttvChannelEmotes(currentChannelId, currentChannel));
      dispatch(fetchFfzChannelEmotes(currentChannelId, currentChannel));
      dispatch(fetchChannelBadges(currentChannelId, currentChannel));
    }
  }, [dispatch, currentChannel, currentChannelId]);

  const handleSendMessage = (message) => {
    const normalizedMessage = replaceEmojis(message.trim());
    client.say(currentChannel, normalizedMessage);
  };

  return <Chat onSendMessage={handleSendMessage} />;
};

export default Home;
