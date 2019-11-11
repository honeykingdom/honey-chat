import { createActions, handleActions } from 'redux-actions';
import { pathOr, mergeDeepRight } from 'ramda';

import {
  fetchGlobalBadges as apiFetchGlobalBadges,
  fetchChannelBadges as apiFetchChannelBadges,
} from 'utils/api';
import { STORE_FLAGS } from 'utils/constants';

const defaultState = {
  global: {
    ...STORE_FLAGS.DEFAULT,
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

const handleFetchGlobalBadges = {
  [fetchGlobalBadgesRequest]: (state) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.REQUEST },
    }),
  [fetchGlobalBadgesSuccess]: (state, { payload }) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.SUCCESS, items: payload.items },
    }),
  [fetchGlobalBadgesFailure]: (state, { payload }) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.FAILURE, error: payload.error },
    }),
};

const handleFetchChannelBadges = {
  [fetchChannelBadgesRequest]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.REQUEST },
      },
    }),
  [fetchChannelBadgesSuccess]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.SUCCESS, items: payload.items },
      },
    }),
  [fetchChannelBadgesFailure]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.FAILURE, error: payload.error },
      },
    }),
};

const reducer = handleActions(
  {
    ...handleFetchGlobalBadges,
    ...handleFetchChannelBadges,
  },
  defaultState,
);

export default reducer;
