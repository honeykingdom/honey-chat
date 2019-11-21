import { createAction, createActions, handleActions } from 'redux-actions';
import * as R from 'ramda';

import { emotesSelector } from 'reducers/emotes/selectors';
import {
  globalBadgesSelector,
  channelBadgesSelector,
} from 'reducers/badges/selectors';
import { blockedUsersSelector } from 'reducers/chat/selectors';
import { fetchRecentMessages as apiFetchRecentMessages } from 'utils/api';
import {
  CHANNEL_MESSAGES_LIMIT,
  STORE_USERS_LIMIT,
  MESSAGE_TYPES,
  STORE_FLAGS,
} from 'utils/constants';
import formatMessage from 'utils/formatMessage';
import getMessageBadges from 'utils/getMessageBadges';
import normalizeRecentMessages from 'utils/normalizeRecentMessages';

const defaultState = {
  // [channel]: {
  //   history: {
  //     isLoading: true,
  //     isLoaded: false,
  //     isError: false,
  //     error: null,
  //   },
  //   isEven: false,
  //   items: [],
  //   users: [],
  // },
};

const {
  addMessages,
  fetchRecentMessagesRequest,
  fetchRecentMessagesSuccess,
  fetchRecentMessagesFailure,
} = createActions(
  'ADD_MESSAGES',
  'FETCH_RECENT_MESSAGES_REQUEST',
  'FETCH_RECENT_MESSAGES_SUCCESS',
  'FETCH_RECENT_MESSAGES_FAILURE',
);

export const clearChat = createAction('CLEAR_CHAT');

const sliceMessages = (items) => {
  const diff = items.length - CHANNEL_MESSAGES_LIMIT;
  return diff > 0 ? items.slice(diff) : items;
};

const sliceUsers = (users) => {
  const diff = users.length - STORE_USERS_LIMIT;
  return diff > 0 ? users.slice(diff) : users;
};

const getIsEven = (prev, addedItemsCount, isSliced) => {
  if (isSliced) {
    return addedItemsCount % 2 ? !prev : prev;
  }
  return prev;
};

export const addRecentMessages = (channel) => (dispatch, getState) => {
  const state = getState();
  const messages = R.pathOr(
    [],
    ['messages', channel, 'history', 'items'],
    state,
  );
  const data = {
    items: normalizeRecentMessages(state, messages),
    isHistory: true,
  };

  dispatch(addMessages(data));
};

export const fetchRecentMessages = (channel) => async (dispatch) => {
  dispatch(fetchRecentMessagesRequest({ channel }));
  try {
    const response = await apiFetchRecentMessages(channel);
    const data = { channel, items: response.messages };

    dispatch(fetchRecentMessagesSuccess(data));
  } catch (e) {
    dispatch(fetchRecentMessagesFailure({ channel, error: e.message }));
  }
};

export const addMessage = (payload) => (dispatch, getState) => {
  const { message, tags, user } = payload;
  const state = getState();
  const blockedUsers = blockedUsersSelector(state);

  if (blockedUsers.includes(user)) return;

  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = emotesSelector(state);

  const normalizedMessage = {
    ...payload,
    type: MESSAGE_TYPES.MESSAGE,
    messageArray: formatMessage(message, tags.emotes, emotes),
    badges: getMessageBadges(tags.badges, globalBadges, channelBadges),
  };

  dispatch(addMessages({ items: [normalizedMessage] }));
};

export const addNoticeMessage = (message) => (dispatch) => {
  const normalizedMessage = {
    ...message,
    type: MESSAGE_TYPES.NOTICE_MESSAGE,
  };

  dispatch(addMessages({ items: [normalizedMessage] }));
};

export const addUserNoticeMessage = (message) => (dispatch) => {
  const normalizedMessage = {
    ...message,
    type: MESSAGE_TYPES.USER_NOTICE_MESSAGE,
  };

  dispatch(addMessages({ items: [normalizedMessage] }));
};

const historyAddedPatch = {
  history: { isAdded: true, items: [] },
};

const handleAddMessages = (state, { payload }) => {
  const { items, isHistory } = payload;
  const channel = R.path([0, 'channel'], items);
  const prevItems = R.pathOr([], [channel, 'items'], state);
  const newItems = isHistory
    ? [...items, ...prevItems]
    : [...prevItems, ...items];
  const slicedMessages = sliceMessages(newItems);

  const isSliced = newItems.length > slicedMessages.length;
  const prevIsEven = R.pathOr(false, [channel, 'isEven'], state);
  const isEven = getIsEven(prevIsEven, items.length, isSliced);

  const clearHistory = isHistory ? { history: { items: [] } } : {};

  let users = R.pathOr([], [channel, 'users'], state);
  items.forEach((message) => {
    const displayName = R.path(['tags', 'displayName'], message);
    if (displayName && !users.includes(displayName)) {
      users = [...users, displayName];
    }
  });
  users = sliceUsers(users);

  return R.mergeDeepRight(state, {
    [channel]: {
      ...(isHistory ? historyAddedPatch : {}),
      items: slicedMessages,
      users,
      isEven,
    },
  });
};

const handleClearChat = (state, { payload }) => {
  const {
    channel,
    tags: { targetUserId },
  } = payload;

  const newItems = state[channel].items.map((message) =>
    message.tags.userId === targetUserId && !message.isHistory
      ? { ...message, isDeleted: true }
      : message,
  );

  return {
    ...state,
    [channel]: {
      ...state[channel],
      items: newItems,
    },
  };
};

const handleFetchRecentMessages = {
  [fetchRecentMessagesRequest]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      [payload.channel]: {
        history: { ...STORE_FLAGS.REQUEST },
      },
    }),
  [fetchRecentMessagesSuccess]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      [payload.channel]: {
        history: { ...STORE_FLAGS.SUCCESS, items: payload.items },
      },
    }),
  [fetchRecentMessagesFailure]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      [payload.channel]: {
        history: { ...STORE_FLAGS.FAILURE, error: payload.error },
      },
    }),
};

const reducer = handleActions(
  {
    [addMessages]: handleAddMessages,
    [clearChat]: handleClearChat,
    ...handleFetchRecentMessages,
  },
  defaultState,
);

export default reducer;
