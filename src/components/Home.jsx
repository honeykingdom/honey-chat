import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pathOr } from 'ramda';
import uuid from 'uuid/v4';

import useLocationHash from '../hooks/useLocationHash';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { fetchTwitchEmotes } from '../reducers/emotes/twitch';
import {
  fetchBttvGlobalEmotes,
  fetchBttvChannelEmotes,
} from '../reducers/emotes/bttv';
import {
  fetchFfzGlobalEmotes,
  fetchFfzChannelEmotes,
} from '../reducers/emotes/ffz';
import { isAllEmotesLoadedSelector } from '../reducers/emotes/selectors';
import {
  addMessage,
  addNoticeMessage,
  addUserNoticeMessage,
  fetchRecentMessages,
  clearChat,
} from '../reducers/messages';
import {
  setCurrentChannel,
  setIsConnected,
  updateGlobalUserState,
  updateUserState,
  updateRoomState,
  currentChannelSelector,
} from '../reducers/chat';
import {
  fetchGlobalBadges,
  fetchChannelBadges,
  isBadgesLoadedSelector,
} from '../reducers/badges';
import { setIsAuth } from '../reducers/auth';
import Client from '../utils/twitchChat';
import replaceEmojis from '../utils/replaceEmojis';

import Chat from './Chat';

let client = null;

const channelIdSelector = (state) =>
  pathOr(
    null,
    ['chat', 'channels', currentChannelSelector(state), 'roomState', 'roomId'],
    state,
  );

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const login = useSelector((state) => state.auth.user.login);
  const currentChannel = useSelector(currentChannelSelector);
  const currentChannelId = useSelector(channelIdSelector);
  const isAllEmotesLoaded = useSelector(isAllEmotesLoadedSelector);
  const isBadgesLoaded = useSelector(isBadgesLoadedSelector);
  const userId = useSelector((state) => state.auth.user.id);
  const hash = useLocationHash();

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
    if (currentChannel && isAuth) {
      const options = {
        identity: {
          name: login,
          auth: localStorage.accessToken,
        },
      };

      const handleMessage = (data) => dispatch(addMessage(data));

      const handleClearChat = (data) => {
        if (!data.tags.targetUserId) return;

        dispatch(clearChat(data));
      };

      const handleNotice = (data) => {
        const normalizedMessage = {
          ...data,
          tags: { ...data.tags, id: uuid() },
        };
        dispatch(addNoticeMessage(normalizedMessage));
      };

      if (!client) {
        client = new Client(options);
        client.connect();
      }

      // TODO: Part the previous channel before join
      client.join(currentChannel);

      client.on('connected', () => dispatch(setIsConnected(true)));
      client.on('disconnected', () => dispatch(setIsConnected(false)));

      client.on('globaluserstate', (data) =>
        dispatch(updateGlobalUserState(data)),
      );
      client.on('userstate', (data) => dispatch(updateUserState(data)));
      client.on('roomstate', (data) => dispatch(updateRoomState(data)));

      client.on('clearchat', handleClearChat);

      client.on('message', handleMessage);
      client.on('ownmessage', handleMessage);
      client.on('notice', handleNotice);
      client.on('usernotice', (data) => dispatch(addUserNoticeMessage(data)));
    }
  }, [dispatch, login, currentChannel, isAuth]);

  useEffect(() => {
    dispatch(fetchBttvGlobalEmotes());
    dispatch(fetchFfzGlobalEmotes());
    dispatch(fetchGlobalBadges());
  }, [dispatch]);

  useEffect(() => {
    // TODO: Load recent messages immediately but render after all emotes will load
    if (currentChannel && isAllEmotesLoaded && isBadgesLoaded) {
      dispatch(fetchRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel, isAllEmotesLoaded, isBadgesLoaded]);

  useEffect(() => {
    if (userId) {
      dispatch(fetchTwitchEmotes(userId));
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
