import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { pathOr } from 'ramda';

import useLocationHash from '../hooks/useLocationHash';
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
import { addMessages, fetchRecentMessages } from '../reducers/messages';
import {
  setCurrentChannel,
  setIsConnected,
  updateGlobalUserState,
  updateUserState,
  updateRoomState,
  removeChannel,
} from '../reducers/chat';
import { setIsAuth } from '../reducers/auth';
import Client from '../utils/twitchChat';
import replaceEmojis from '../utils/replaceEmojis';

import Chat from './Chat';

let client = null;

const channelIdSelector = (state) =>
  pathOr(
    null,
    ['chat', 'channels', state.chat.currentChannel, 'roomState', 'roomId'],
    state,
  );

const Home = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuth);
  const username = useSelector((state) => state.auth.user.login);
  const currentChannel = useSelector((state) => state.chat.currentChannel);
  const currentChannelId = useSelector(channelIdSelector);
  const isAllEmotesLoaded = useSelector(isAllEmotesLoadedSelector);
  const userId = useSelector((state) => state.auth.user.id);
  const hash = useLocationHash();

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
    document.title = currentChannel
      ? `#${currentChannel} - ${process.env.REACT_APP_NAME} `
      : process.env.REACT_APP_NAME;
  }, [currentChannel]);

  useEffect(() => {
    if (currentChannel && isAuth) {
      const handleMessage = (data) => {
        const eventData = {
          channel: data.channel,
          items: [data],
        };
        dispatch(addMessages(eventData));
      };

      const options = {
        identity: {
          name: username,
          auth: localStorage.accessToken,
        },
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

      client.on('part', (data) => dispatch(removeChannel(data)));

      client.on('message', handleMessage);
      client.on('own-message', handleMessage);

      // setTimeout(() => client.part(currentChannel), 5000);
    }
  }, [dispatch, username, currentChannel, isAuth]);

  useEffect(() => {
    dispatch(fetchBttvGlobalEmotes());
    dispatch(fetchFfzGlobalEmotes());
  }, [dispatch]);

  useEffect(() => {
    // TODO: Load recent messages immedeatly but render after all emotes will load
    if (currentChannel && isAllEmotesLoaded) {
      dispatch(fetchRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel, isAllEmotesLoaded]);

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
    }
  }, [dispatch, currentChannel, currentChannelId]);

  const handleSendMessage = (message) => {
    const normalizedMessage = replaceEmojis(message.trim());
    client.say(currentChannel, normalizedMessage);
  };

  return <Chat onSendMessage={handleSendMessage} />;
};

export default Home;
