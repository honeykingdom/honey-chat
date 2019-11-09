import {
  createAction,
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';
import { pathOr, mergeDeepRight, concat } from 'ramda';
import { parse } from 'tekko';

import {
  twitchEmotesSelector,
  bttvEmotesSelector,
  ffzEmotesSelector,
} from './emotes/selectors';
import { globalBadgesSelector, channelBadgesSelector } from './badges';
import { currentChannelSelector } from './chat';
import { fetchRecentMessages as apiFetchRecentMessages } from '../utils/api';
import { CHANNEL_MESSAGES_LIMIT } from '../utils/constants';
import {
  getIsAction,
  normalizeActionMessage,
  parseMessageTags,
} from '../utils/twitchChat';
import storeFlags from '../utils/storeFlags';
import formatMessage from '../utils/formatMessage';
import getMessageBadges from '../utils/getMessageBadges';

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
  // },
};

export const messageTypes = {
  MESSAGE: 'MESSAGE',
  NOTICE_MESSAGE: 'NOTICE_MESSAGE',
  USER_NOTICE_MESSAGE: 'USER_NOTICE_MESSAGE',
};

const {
  addMessageEntity,
  fetchRecentMessagesRequest,
  fetchRecentMessagesSuccess,
  fetchRecentMessagesFailure,
} = createActions(
  'ADD_MESSAGE_ENTITY',
  'FETCH_RECENT_MESSAGES_REQUEST',
  'FETCH_RECENT_MESSAGES_SUCCESS',
  'FETCH_RECENT_MESSAGES_FAILURE',
);

export const isHistoryLoadingSelector = (state) =>
  pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isLoading',
  ])(state);

export const isHistoryLoadedSelector = (state) =>
  pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isLoaded',
  ])(state);

export const clearChat = createAction('CLEAR_CHAT');
export const addRecentMessagesAction = createAction('ADD_RECENT_MESSAGES');

const sliceMessages = (items) => {
  const diff = items.length - CHANNEL_MESSAGES_LIMIT;
  return diff > 0 ? items.slice(diff) : items;
};

const getEmotes = (state) => ({
  twitch: twitchEmotesSelector(state),
  bttv: bttvEmotesSelector(state),
  ffz: ffzEmotesSelector(state),
});

const getIsEven = (prev, addedItemsCount, isSliced) => {
  if (isSliced) {
    return addedItemsCount % 2 ? !prev : prev;
  }
  return prev;
};

const normalizeRecentMessages = (state, messages) => {
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);

  return messages
    .map((m) => parse(m))
    .filter((m) => m.command === 'PRIVMSG')
    .map(({ tags, params: [channel, message], prefix: { user } }) => {
      const isAction = getIsAction(message);
      const normalizedMessage = isAction
        ? normalizeActionMessage(message)
        : message;
      const parsedTags = parseMessageTags(tags);
      return {
        type: 'MESSAGE',
        message: normalizedMessage,
        messageArray: formatMessage(
          normalizedMessage,
          parsedTags.emotes,
          getEmotes(state),
        ),
        tags: parsedTags,
        badges: getMessageBadges(
          parsedTags.badges,
          globalBadges,
          channelBadges,
        ),
        user,
        channel: channel.slice(1),
        isAction,
        isHistory: true,
      };
    });
};

export const addRecentMessages = (channel) => (dispatch, getState) => {
  const state = getState();
  const messages = pathOr([], ['messages', channel, 'history', 'items'], state);
  const data = {
    channel,
    items: normalizeRecentMessages(state, messages),
  };

  dispatch(addRecentMessagesAction(data));
};

export const fetchRecentMessages = (channel) => async (dispatch) => {
  dispatch(fetchRecentMessagesRequest({ channel }));
  try {
    const response = await apiFetchRecentMessages(channel);
    const data = { channel, items: response.messages };

    dispatch(fetchRecentMessagesSuccess(data));
  } catch (error) {
    dispatch(fetchRecentMessagesFailure({ channel, error }));
  }
};

const handleFetchRecentMessages = (state, { type, payload }) => {
  const { channel } = payload;

  if (type === fetchRecentMessagesRequest.toString()) {
    return mergeDeepRight(state, {
      [channel]: {
        history: { ...storeFlags.request },
      },
    });
  }

  if (type === fetchRecentMessagesSuccess.toString()) {
    return mergeDeepRight(state, {
      [channel]: {
        history: { ...storeFlags.success, items: payload.items },
      },
    });
  }

  if (type === fetchRecentMessagesFailure.toString()) {
    return mergeDeepRight(state, {
      [channel]: {
        history: { ...storeFlags.failure, error: payload.error },
      },
    });
  }

  return state;
};

export const addMessage = ({ message, tags, ...rest }) => (
  dispatch,
  getState,
) => {
  const state = getState();
  const globalBadges = globalBadgesSelector(state);
  const channelBadges = channelBadgesSelector(state);
  const emotes = getEmotes(state);

  const normalizedMessage = {
    type: messageTypes.MESSAGE,
    message,
    messageArray: formatMessage(message, tags.emotes, emotes),
    tags,
    badges: getMessageBadges(tags.badges, globalBadges, channelBadges),
    ...rest,
  };

  dispatch(addMessageEntity(normalizedMessage));
};

export const addNoticeMessage = (message) => (dispatch) => {
  const normalizedMessage = {
    ...message,
    type: messageTypes.NOTICE_MESSAGE,
  };

  dispatch(addMessageEntity(normalizedMessage));
};

export const addUserNoticeMessage = (message) => (dispatch) => {
  const normalizedMessage = {
    ...message,
    type: messageTypes.USER_NOTICE_MESSAGE,
  };

  dispatch(addMessageEntity(normalizedMessage));
};

const handleAddMessageEntity = (state, { payload: message }) => {
  const { channel } = message;
  const oldItems = pathOr([], [channel, 'items'], state);
  const newItems = [...oldItems, message];
  const slicedMessages = sliceMessages(newItems);
  const isSliced = newItems.length > slicedMessages.length;
  const isEven = pathOr(false, [channel, 'isEven'], state);

  return {
    ...state,
    [channel]: {
      ...state[channel],
      isEven: getIsEven(isEven, 1, isSliced),
      items: slicedMessages,
    },
  };
};

const handleAddRecentMessages = (state, { payload: { channel, items } }) => {
  const newItems = concat(items, pathOr([], [channel, 'items'], state));
  const slicedMessages = sliceMessages(newItems);
  const isSliced = newItems.length > slicedMessages.length;
  const isEven = pathOr(false, [channel, 'isEven'], state);

  return mergeDeepRight(state, {
    [channel]: {
      history: { items: [] },
      items: newItems,
      isEven: getIsEven(isEven, items.length, isSliced),
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

const reducer = handleActions(
  {
    [addMessageEntity]: handleAddMessageEntity,
    [addRecentMessagesAction]: handleAddRecentMessages,
    [combineActions(
      fetchRecentMessagesRequest,
      fetchRecentMessagesSuccess,
      fetchRecentMessagesFailure,
    )]: handleFetchRecentMessages,
    [clearChat]: handleClearChat,
  },
  defaultState,
);

export default reducer;
