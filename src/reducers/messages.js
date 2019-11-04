import {
  createAction,
  createActions,
  handleActions,
  combineActions,
} from 'redux-actions';
import { parse } from 'tekko';

import { fetchRecentMessages as apiFetchRecentMessages } from '../utils/api';
import { CHANNEL_MESSAGES_LIMIT } from '../utils/constants';
import {
  getIsAction,
  normalizeActionMessage,
  parseMessageTags,
} from '../utils/twitchChat';
// import formatMessage from '../utils/formatMessage';

const defaultState = {
  isLoading: false,
  items: [],
};

const sliceMessages = (items) => {
  const itemsDiff = items.length - CHANNEL_MESSAGES_LIMIT;

  return itemsDiff > 0 ? items.slice(itemsDiff) : items;
};

export const { addMessage, addMessages } = createActions({
  ADD_MESSAGE: (message) => [message],
  ADD_MESSAGES: (messages) => messages,
});

const fetchRecentMessagesRequest = createAction(
  'FETCH_RECENT_MESSAGES_REQUEST',
);
const fetchRecentMessagesSuccess = createAction(
  'FETCH_RECENT_MESSAGES_SUCCESS',
);
const fetchRecentMessagesFailure = createAction(
  'FETCH_RECENT_MESSAGES_FAILURE',
);

export const fetchRecentMessages = (dispatch) => async (channel) => {
  dispatch(fetchRecentMessagesRequest());

  const { messages } = await apiFetchRecentMessages(channel);

  const normalizedMessages = messages
    .map((m) => parse(m))
    .filter((m) => m.command === 'PRIVMSG')
    .map(({ tags, params: [, message] }) => {
      const isAction = getIsAction(message);
      return {
        tags: parseMessageTags(tags),
        message: isAction ? normalizeActionMessage(message) : message,
        isAction,
        isHistory: true,
      };
    });

  dispatch(fetchRecentMessagesSuccess(normalizedMessages));
};

const handleFetchRecentMessagesRequest = (state) => ({
  ...state,
  isLoading: true,
});
const handleFetchRecentMessagesSuccess = (state, { payload }) => ({
  ...state,
  isLoading: false,
  items: sliceMessages(payload),
});
const handleFetchRecentMessagesFailure = (state, { payload }) => ({
  ...state,
  isLoading: false,
  isError: true,
  error: payload,
});

const handleAddMessages = (state, { payload }) => ({
  ...state,
  items: sliceMessages([...state.items, ...payload]),
});

const reducer = handleActions(
  {
    [combineActions(addMessage, addMessages)]: handleAddMessages,
    [fetchRecentMessagesRequest]: handleFetchRecentMessagesRequest,
    [fetchRecentMessagesSuccess]: handleFetchRecentMessagesSuccess,
    [fetchRecentMessagesFailure]: handleFetchRecentMessagesFailure,
  },
  defaultState,
);

export default reducer;
