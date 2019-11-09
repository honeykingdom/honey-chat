import { createActions, handleActions, combineActions } from 'redux-actions';
import { pathOr } from 'ramda';

import { currentChannelSelector } from './chat';

import {
  fetchGlobalBadges as apiFetchGlobalBadges,
  fetchChannelBadges as apiFetchChannelBadges,
} from '../utils/api';

const defaultState = {
  global: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    error: null,
    items: {},
  },
  channels: {
    // [channel]: {
    //   isLoading: false,
    //   isLoaded: false,
    //   isError: false,
    //   error: null,
    //   items: {},
    // },
  },
};

export const globalBadgesSelector = (state) => state.badges.global.items;
export const channelBadgesSelector = (state) =>
  pathOr({}, ['badges', 'channels', currentChannelSelector(state), 'items']);

export const isBadgesLoadedSelector = (state) =>
  state.badges.global.isLoaded &&
  pathOr(
    false,
    ['badges', 'channels', currentChannelSelector(state), 'isLoaded'],
    state,
  );

const {
  fetchGlobalBadgesRequest,
  fetchGlobalBadgesSuccess,
  fetchGlobalBadgesFailure,
  fetchChannelBadgesRequest,
  fetchChannelBadgesSuccess,
  fetchChannelBadgesFailure,
} = createActions(
  'FETCH_GLOBAL_BADGES_REQUEST',
  'FETCH_GLOBAL_BADGES_SUCCESS',
  'FETCH_GLOBAL_BADGES_FAILURE',
  'FETCH_CHANNEL_BADGES_REQUEST',
  'FETCH_CHANNEL_BADGES_SUCCESS',
  'FETCH_CHANNEL_BADGES_FAILURE',
);

const parseBadges = pathOr({}, ['badge_sets']);

export const fetchGlobalBadges = () => async (dispatch) => {
  dispatch(fetchGlobalBadgesRequest());

  try {
    const response = await apiFetchGlobalBadges();
    const data = { items: parseBadges(response) };

    dispatch(fetchGlobalBadgesSuccess(data));
  } catch (error) {
    dispatch(fetchGlobalBadgesFailure({ error }));
  }
};

export const fetchChannelBadges = (channelId, channel) => async (dispatch) => {
  dispatch(fetchChannelBadgesRequest({ channel }));

  try {
    const response = await apiFetchChannelBadges(channelId);
    const data = {
      channel,
      items: parseBadges(response),
    };

    dispatch(fetchChannelBadgesSuccess(data));
  } catch (error) {
    dispatch(fetchChannelBadgesFailure({ channel, error }));
  }
};

const handleFetchFfzGlobalEmotes = (state, { type, payload }) => {
  if (type === fetchGlobalBadgesRequest.toString()) {
    return {
      ...state,
      global: {
        ...state.global,
        isLoading: true,
        isLoaded: false,
        isError: false,
        error: null,
      },
    };
  }

  if (type === fetchGlobalBadgesSuccess.toString()) {
    return {
      ...state,
      global: {
        ...state.global,
        isLoading: false,
        isLoaded: true,
        isError: false,
        error: null,
        ...payload,
      },
    };
  }

  if (type === fetchGlobalBadgesFailure.toString()) {
    return {
      ...state,
      global: {
        ...state.global,
        isLoading: false,
        isLoaded: false,
        isError: true,
        ...payload,
      },
    };
  }

  return state;
};

const handleFetchFfzChannelEmotes = (state, { type, payload }) => {
  const { channel } = payload;

  if (type === fetchChannelBadgesRequest.toString()) {
    return {
      ...state,
      channels: {
        ...state.channels,
        [channel]: {
          isLoading: true,
          isLoaded: false,
          isError: false,
          error: null,
        },
      },
    };
  }

  if (type === fetchChannelBadgesSuccess.toString()) {
    return {
      ...state,
      channels: {
        ...state.channels,
        [channel]: {
          isLoading: false,
          isLoaded: true,
          isError: false,
          error: null,
          items: payload.items,
        },
      },
    };
  }

  if (type === fetchChannelBadgesFailure.toString()) {
    return {
      ...state,
      channels: {
        ...state.channels,
        [channel]: {
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

const reducer = handleActions(
  {
    [combineActions(
      fetchGlobalBadgesRequest,
      fetchGlobalBadgesSuccess,
      fetchGlobalBadgesFailure,
    )]: handleFetchFfzGlobalEmotes,

    [combineActions(
      fetchChannelBadgesRequest,
      fetchChannelBadgesSuccess,
      fetchChannelBadgesFailure,
    )]: handleFetchFfzChannelEmotes,
  },
  defaultState,
);

export default reducer;
