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
} from 'reducers/chat';
import {
  currentChannelSelector,
  channelIdSelector,
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
  const isTwitchEmotesLoaded = useSelector(isTwitchEmotesLoadedSelector);
  const isBttvEmotesLoaded = useSelector(isBttvEmotesLoadedSelector);
  const isFfzEmotesLoaded = useSelector(isFfzEmotesLoadedSelector);
  const isBadgesLoaded = useSelector(isBadgesLoadedSelector);
  const isHistoryLoaded = useSelector(isHistoryLoadedSelector);
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
    if (currentChannel) {
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
        client = new Client(isAuth ? options : {});
        client.connect();

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

      // TODO: Part the previous channel before join
      client.join(currentChannel);
    }
  }, [dispatch, login, currentChannel, isAuth]);

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
    // Don't wait twitch emotes for anonymous users
    if (
      currentChannel &&
      (isAuth ? isTwitchEmotesLoaded : true) &&
      isBttvEmotesLoaded &&
      isFfzEmotesLoaded &&
      isBadgesLoaded &&
      isHistoryLoaded
    ) {
      dispatch(addRecentMessages(currentChannel));
    }
  }, [
    dispatch,
    isAuth,
    currentChannel,
    isTwitchEmotesLoaded,
    isBttvEmotesLoaded,
    isFfzEmotesLoaded,
    isBadgesLoaded,
    isHistoryLoaded,
  ]);

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
