import { createActions, handleActions, combineActions } from 'redux-actions';
import { pathOr, toPairs, map, pipe, filter } from 'ramda';
import { parse } from 'tekko';

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

const createBadge = ({
  title,
  description,
  image_url_1x: imageUrl1x,
  image_url_2x: imageUrl2x,
  image_url_4x: imageUrl4x,
}) => ({
  alt: title,
  label: description,
  src: imageUrl1x,
  srcSet: `${imageUrl1x} 1x, ${imageUrl2x} 2x, ${imageUrl4x} 4x`,
});

const getMessageBadges = (badges, globalBadges, channelBadges) => {
  const mapBadges = ([name, version]) => {
    const badge =
      pathOr(false, [name, 'versions', version], channelBadges) ||
      pathOr(false, [name, 'versions', version], globalBadges);

    return badge ? createBadge(badge) : false;
  };

  return pipe(
    toPairs,
    map(mapBadges),
    filter(Boolean),
  )(badges);
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

export const addMessages = (payload) => (dispatch, getState) => {
  const newItems = payload.items.map(({ message, tags, ...rest }) => ({
    message,
    messageArray: formatMessage(message, tags.emotes, getEmotes(getState())),
    tags,
    ...rest,
  }));

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
  const newItems = [...oldItems, ...payload.items];
  const slicedMessages = sliceMessages(newItems);
  const isSliced = newItems.length > slicedMessages.length;
  const isEven = pathOr(false, [channel, 'isEven'], state);

  return {
    ...state,
    [channel]: {
      ...state[channel],
      isEven: getIsEven(isEven, payload.items.length, isSliced),
      items: slicedMessages,
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
