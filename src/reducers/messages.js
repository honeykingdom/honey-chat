import { createActions, handleActions, combineActions } from 'redux-actions';
import { pathOr } from 'ramda';
import { parse } from 'tekko';

import {
  twitchEmotesSelector,
  bttvEmotesSelector,
  ffzEmotesSelector,
} from './emotes/selectors';
import { fetchRecentMessages as apiFetchRecentMessages } from '../utils/api';
import { CHANNEL_MESSAGES_LIMIT } from '../utils/constants';
import {
  getIsAction,
  normalizeActionMessage,
  parseMessageTags,
} from '../utils/twitchChat';
import formatMessage from '../utils/formatMessage';

const defaultState = {
  // [channel]: {
  //   history: {
  //     isLoading: true,
  //     isLoaded: false,
  //     isError: false,
  //     error: null,
  //   },
  //   items: [],
  // },
};

const sliceMessages = (items) => {
  const diff = items.length - CHANNEL_MESSAGES_LIMIT;
  return diff > 0 ? items.slice(diff) : items;
};

const getEmotes = (state) => ({
  twitch: twitchEmotesSelector(state),
  bttv: bttvEmotesSelector(state),
  ffz: ffzEmotesSelector(state),
});

const {
  addMessages: addMessagesRequest,
  fetchRecentMessagesRequest,
  fetchRecentMessagesSuccess,
  fetchRecentMessagesFailure,
} = createActions(
  'ADD_MESSAGES',
  'FETCH_RECENT_MESSAGES_REQUEST',
  'FETCH_RECENT_MESSAGES_SUCCESS',
  'FETCH_RECENT_MESSAGES_FAILURE',
);

const normalizeRecentMessages = (messages) =>
  messages
    .map((m) => parse(m))
    .filter((m) => m.command === 'PRIVMSG')
    .map(({ tags, params: [channel, message], prefix: { user } }) => {
      const isAction = getIsAction(message);
      return {
        message: isAction ? normalizeActionMessage(message) : message,
        tags: parseMessageTags(tags),
        user,
        channel: channel.slice(1),
        isAction,
        isHistory: true,
      };
    });

export const fetchRecentMessages = (channel) => async (dispatch, getState) => {
  dispatch(fetchRecentMessagesRequest({ channel }));
  try {
    const response = await apiFetchRecentMessages(channel);
    const data = {
      channel,
      items: formatMessage(
        normalizeRecentMessages(response.messages),
        getEmotes(getState()),
      ),
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
        items: sliceMessages([...payload.items, ...state[channel].items]),
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

export const addMessages = (payload) => (dispatch, getState) => {
  const newItems = formatMessage(payload.items, getEmotes(getState()));

  dispatch(
    addMessagesRequest({
      ...payload,
      items: newItems,
    }),
  );
};

const handleAddMessages = (state, { payload }) => {
  const { channel } = payload;
  const oldItems = pathOr([], [channel, 'items'], state);

  return {
    ...state,
    [channel]: {
      ...state[channel],
      items: sliceMessages([...oldItems, ...payload.items]),
    },
  };
};

const reducer = handleActions(
  {
    [addMessagesRequest]: handleAddMessages,
    [combineActions(
      fetchRecentMessagesRequest,
      fetchRecentMessagesSuccess,
      fetchRecentMessagesFailure,
    )]: handleFetchRecentMessages,
  },
  defaultState,
);

export default reducer;
