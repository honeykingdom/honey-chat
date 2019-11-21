import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  isAuthReadySelector,
  isAuthSelector,
  userIdSelector,
} from 'reducers/auth/selectors';
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
import { fetchRecentMessages, addRecentMessages } from 'reducers/messages';
import {
  isHistoryLoadedSelector,
  isHistoryAddedSelector,
} from 'reducers/messages/selectors';
import { fetchBlockedUsers } from 'reducers/chat';
import {
  currentChannelSelector,
  currentChannelIdSelector,
  isBlockedUsersLoadedSelector,
} from 'reducers/chat/selectors';
import { fetchGlobalBadges, fetchChannelBadges } from 'reducers/badges';
import { isBadgesLoadedSelector } from 'reducers/badges/selectors';

const useFetchChatData = () => {
  const dispatch = useDispatch();

  const isAuthReady = useSelector(isAuthReadySelector);
  const isAuth = useSelector(isAuthSelector);
  const userId = useSelector(userIdSelector);
  const currentChannel = useSelector(currentChannelSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);

  const isTwitchEmotesLoaded = useSelector(isTwitchEmotesLoadedSelector);
  const isBttvEmotesLoaded = useSelector(isBttvEmotesLoadedSelector);
  const isFfzEmotesLoaded = useSelector(isFfzEmotesLoadedSelector);
  const isBadgesLoaded = useSelector(isBadgesLoadedSelector);
  const isHistoryLoaded = useSelector(isHistoryLoadedSelector);
  const isBlockedUsersLoaded = useSelector(isBlockedUsersLoadedSelector);
  const isHistoryAdded = useSelector(isHistoryAddedSelector);

  const isReadyToAddHistory =
    isAuthReady &&
    currentChannel &&
    !isHistoryAdded &&
    (isAuth ? isTwitchEmotesLoaded : true) &&
    (isAuth ? isBlockedUsersLoaded : true) &&
    isBttvEmotesLoaded &&
    isFfzEmotesLoaded &&
    isBadgesLoaded &&
    isHistoryLoaded;

  // TODO: check if emotes and badges is already in the store

  useEffect(() => {
    dispatch(fetchBttvGlobalEmotes());
    dispatch(fetchFfzGlobalEmotes());
    dispatch(fetchGlobalBadges());
  }, [dispatch]);

  useEffect(() => {
    if (!isHistoryAdded && currentChannel) {
      dispatch(fetchRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel, isHistoryAdded]);

  useEffect(() => {
    if (isReadyToAddHistory) {
      dispatch(addRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel, isReadyToAddHistory]);

  useEffect(() => {
    if (isAuthReady && isAuth && userId) {
      dispatch(fetchTwitchEmotes(userId));
      dispatch(fetchBlockedUsers(userId));
    }
  }, [dispatch, isAuthReady, isAuth, userId]);

  useEffect(() => {
    if (currentChannel && currentChannelId) {
      dispatch(fetchBttvChannelEmotes(currentChannelId, currentChannel));
      dispatch(fetchFfzChannelEmotes(currentChannelId, currentChannel));
      dispatch(fetchChannelBadges(currentChannelId, currentChannel));
    }
  }, [dispatch, currentChannel, currentChannelId]);
};

export default useFetchChatData;
