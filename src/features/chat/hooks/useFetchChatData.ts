import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  isAuthReadySelector,
  isAuthSelector,
  userIdSelector,
} from 'features/auth/authSlice';
import {
  currentChannelSelector,
  currentChannelIdSelector,
  isHistoryAddedSelector,
  isHistoryLoadedSelector,
  isTwitchEmotesLoadedSelector,
  isBttvGlobalEmotesLoadedSelector,
  isBttvChannelEmotesLoadedSelector,
  isFfzGlobalEmotesLoadedSelector,
  isFfzChannelEmotesLoadedSelector,
  isGlobalBadgesLoadedSelector,
  isChannelBadgesLoadedSelector,
  isBlockedUsersLoadedSelector,
} from 'features/chat/selectors';
import {
  addChatHistory,
  fetchChatHistory,
  fetchTwitchEmotes,
  fetchBttvGlobalEmotes,
  fetchBttvChannelEmotes,
  fetchFfzGlobalEmotes,
  fetchFfzChannelEmotes,
  fetchChannelBadges,
  fetchGlobalBadges,
  fetchBlockedUsers,
} from 'features/chat/slice';

const useFetchChatData = () => {
  const dispatch = useDispatch();

  const isAuthReady = useSelector(isAuthReadySelector);
  const isAuth = useSelector(isAuthSelector);
  const userId = useSelector(userIdSelector);
  const currentChannel = useSelector(currentChannelSelector);
  const currentChannelId = useSelector(currentChannelIdSelector);

  const isTwitchEmotesLoaded = useSelector(isTwitchEmotesLoadedSelector);
  const isBttvGlobalEmotesLoaded = useSelector(
    isBttvGlobalEmotesLoadedSelector,
  );
  const isBttvChannelEmotesLoaded = useSelector(
    isBttvChannelEmotesLoadedSelector,
  );
  const isFfzGlobalEmotesLoaded = useSelector(isFfzGlobalEmotesLoadedSelector);
  const isFfzChannelEmotesLoaded = useSelector(
    isFfzChannelEmotesLoadedSelector,
  );
  const isGlobalBadgesLoaded = useSelector(isGlobalBadgesLoadedSelector);
  const isChannelBadgesLoaded = useSelector(isChannelBadgesLoadedSelector);
  const isHistoryLoaded = useSelector(isHistoryLoadedSelector);
  const isBlockedUsersLoaded = useSelector(isBlockedUsersLoadedSelector);
  const isHistoryAdded = useSelector(isHistoryAddedSelector);

  const isReadyToAddHistory =
    isAuthReady &&
    currentChannel &&
    !isHistoryAdded &&
    (isAuth ? isTwitchEmotesLoaded : true) &&
    (isAuth ? isBlockedUsersLoaded : true) &&
    isBttvGlobalEmotesLoaded &&
    isBttvChannelEmotesLoaded &&
    isFfzGlobalEmotesLoaded &&
    isFfzChannelEmotesLoaded &&
    isGlobalBadgesLoaded &&
    isChannelBadgesLoaded &&
    isHistoryLoaded;

  useEffect(() => {
    dispatch(fetchBttvGlobalEmotes());
    dispatch(fetchFfzGlobalEmotes());
    dispatch(fetchGlobalBadges());
  }, [dispatch]);

  useEffect(() => {
    if (isReadyToAddHistory) {
      dispatch(addChatHistory(currentChannel));
    }
  }, [dispatch, currentChannel, isReadyToAddHistory]);

  useEffect(() => {
    if (!isHistoryAdded && currentChannel) {
      dispatch(fetchChatHistory(currentChannel));
    }
  }, [dispatch, currentChannel, isHistoryAdded]);

  useEffect(() => {
    if (isAuthReady && isAuth && userId) {
      dispatch(fetchTwitchEmotes(userId));
      dispatch(fetchBlockedUsers(userId));
    }
  }, [dispatch, isAuthReady, isAuth, userId]);

  // TODO: check if emotes and badges is already in the store

  useEffect(() => {
    if (currentChannel && currentChannelId) {
      const params = {
        channel: currentChannel,
        channelId: currentChannelId,
      };

      dispatch(fetchBttvChannelEmotes(params));
      dispatch(fetchFfzChannelEmotes(params));
      dispatch(fetchChannelBadges(params));
    }
  }, [dispatch, currentChannel, currentChannelId]);
};

export default useFetchChatData;
