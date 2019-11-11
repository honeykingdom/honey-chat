import { createActions, handleActions, combineActions } from 'redux-actions';
import { pathOr, mergeDeepRight } from 'ramda';

import {
  fetchGlobalBadges as apiFetchGlobalBadges,
  fetchChannelBadges as apiFetchChannelBadges,
} from 'utils/api';
import storeFlags from 'utils/storeFlags';

const defaultState = {
  global: {
    ...storeFlags.default,
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
    return mergeDeepRight(state, {
      global: { ...storeFlags.request },
    });
  }

  if (type === fetchGlobalBadgesSuccess.toString()) {
    return mergeDeepRight(state, {
      global: { ...storeFlags.success, items: payload.items },
    });
  }

  if (type === fetchGlobalBadgesFailure.toString()) {
    return mergeDeepRight(state, {
      global: { ...storeFlags.failure, error: payload.error },
    });
  }

  return state;
};

const handleFetchFfzChannelEmotes = (state, { type, payload }) => {
  const { channel } = payload;

  if (type === fetchChannelBadgesRequest.toString()) {
    return mergeDeepRight(state, {
      channels: {
        [channel]: { ...storeFlags.request },
      },
    });
  }

  if (type === fetchChannelBadgesSuccess.toString()) {
    return mergeDeepRight(state, {
      channels: {
        [channel]: { ...storeFlags.success, items: payload.items },
      },
    });
  }

  if (type === fetchChannelBadgesFailure.toString()) {
    return mergeDeepRight(state, {
      channels: {
        [channel]: { ...storeFlags.failure, error: payload.error },
      },
    });
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
