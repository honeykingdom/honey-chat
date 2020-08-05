import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  currentChannelSelector,
  currentChannelIdSelector,
} from 'features/chat/chatSelectors';
import {
  isHistoryAddedSelector,
  isHistoryLoadedSelector,
} from 'features/messages/messagesSelectors';
import {
  isTwitchEmotesLoadedSelector,
  isBttvGlobalEmotesLoadedSelector,
  isBttvChannelEmotesLoadedSelector,
  isFfzGlobalEmotesLoadedSelector,
  isFfzChannelEmotesLoadedSelector,
} from 'features/emotes/emotesSelectors';
import {
  isGlobalBadgesLoadedSelector,
  isChannelBadgesLoadedSelector,
} from 'features/badges/badgesSelectors';
import { isBlockedUsersLoadedSelector } from 'features/blockedUsers/blockedUsersSelectors';
import {
  isAuthReadySelector,
  isAuthSelector,
  userIdSelector,
} from 'features/auth/authSelectors';
import {
  addRecentMessages,
  fetchRecentMessages,
} from 'features/messages/messagesSlice';
import {
  fetchTwitchEmotes,
  fetchBttvGlobalEmotes,
  fetchBttvChannelEmotes,
  fetchFfzGlobalEmotes,
  fetchFfzChannelEmotes,
} from 'features/emotes/emotesSlice';
import {
  fetchChannelBadges,
  fetchGlobalBadges,
} from 'features/badges/badgesSlice';
import { fetchBlockedUsers } from 'features/blockedUsers/blockedUsersSlice';

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

  const isAllEmotesLoaded =
    (isAuth ? isTwitchEmotesLoaded : true) &&
    isBttvGlobalEmotesLoaded &&
    isBttvChannelEmotesLoaded &&
    isFfzGlobalEmotesLoaded &&
    isFfzChannelEmotesLoaded;

  const isReadyToAddHistory =
    isAuthReady &&
    currentChannel &&
    !isHistoryAdded &&
    isAllEmotesLoaded &&
    (isAuth ? isBlockedUsersLoaded : true) &&
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
      dispatch(addRecentMessages(currentChannel));
    }
  }, [dispatch, currentChannel, isReadyToAddHistory]);

  useEffect(() => {
    if (!isHistoryAdded && currentChannel) {
      dispatch(fetchRecentMessages(currentChannel));
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
