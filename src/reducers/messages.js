import {
  createAction,
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';
import { pathOr } from 'ramda';
import { parse } from 'tekko';
import uuid from 'uuid/v4';

import {
  twitchEmotesSelector,
  bttvEmotesSelector,
  ffzEmotesSelector,
} from './emotes/selectors';
import { globalBadgesSelector, channelBadgesSelector } from './badges';
import { fetchRecentMessages as apiFetchRecentMessages } from '../utils/api';
import { CHANNEL_MESSAGES_LIMIT } from '../utils/constants';
import {
  getIsAction,
  normalizeActionMessage,
  parseMessageTags,
} from '../utils/twitchChat';
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

export const clearChat = createAction('CLEAR_CHAT');

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

const normalizeRecentMessages = (messages, state) => {
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

export const fetchRecentMessages = (channel) => async (dispatch, getState) => {
  dispatch(fetchRecentMessagesRequest({ channel }));
  try {
    const response = await apiFetchRecentMessages(channel);
    const data = {
      channel,
      items: normalizeRecentMessages(response.messages, getState()),
    };

    dispatch(fetchRecentMessagesSuccess(data));
  } catch (error) {
    dispatch(fetchRecentMessagesFailure({ channel, error }));
  }
};

const handleFetchRecentMessages = (state, { type, payload }) => {
  const { channel } = payload;

  if (type === fetchRecentMessagesRequest.toString()) {
    const oldItems = pathOr([], [channel, 'items'], state);
    return {
      ...state,
      [channel]: {
        ...state[channel],
        history: {
          isLoading: true,
          isLoaded: false,
          isError: false,
          error: null,
        },
        items: oldItems,
      },
    };
  }

  if (type === fetchRecentMessagesSuccess.toString()) {
    const newItems = [...payload.items, ...state[channel].items];
    const slicedMessages = sliceMessages(newItems);
    const isSliced = newItems.length > slicedMessages.length;
    const isEven = pathOr(false, [channel, 'isEven'], state);

    return {
      ...state,
      [channel]: {
        ...state[channel],
        history: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          error: null,
        },
        isEven: getIsEven(isEven, payload.items.length, isSliced),
        items: newItems,
      },
    };
  }

  if (type === fetchRecentMessagesFailure.toString()) {
    return {
      ...state,
      [channel]: {
        ...state[channel],
        history: {
          isLoading: false,
          isLoaded: false,
          isError: true,
          error: payload.error,
        },
      },
    };
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
  const normalizedMessage = message.tags.id
    ? message
    : { ...message, tags: { ...message.tags, id: uuid() } };
  const oldItems = pathOr([], [channel, 'items'], state);
  const newItems = [...oldItems, normalizedMessage];
  const slicedMessages = sliceMessages(newItems);
  const isSliced = newItems.length > slicedMessages.length;
  const isEven = pathOr(false, [channel, 'isEven'], state);

  console.log(normalizedMessage);

  return {
    ...state,
    [channel]: {
      ...state[channel],
      isEven: getIsEven(isEven, 1, isSliced),
      items: slicedMessages,
    },
  };
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
