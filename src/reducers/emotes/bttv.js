import { createActions, handleActions } from 'redux-actions';
import { mergeDeepRight } from 'ramda';

import {
  fetchBttvGlobalEmotes as apiFetchBttvGlobalEmotes,
  fetchBttvChannelEmotes as apiFetchBttvChannelEmotes,
} from 'utils/api';
import { STORE_FLAGS } from 'utils/constants';

const defaultState = {
  global: {
    isLoading: false,
    isLoaded: false,
    isError: false,
    error: null,
    items: [],
  },
  channels: {
    // [channel]: {
    //   isLoading: false,
    //   isLoaded: false,
    //   isError: false,
    //   error: null,
    //   items: [],
    // },
  },
};

const {
  fetchBttvGlobalEmotesRequest,
  fetchBttvGlobalEmotesSuccess,
  fetchBttvGlobalEmotesFailure,
  fetchBttvChannelEmotesRequest,
  fetchBttvChannelEmotesSuccess,
  fetchBttvChannelEmotesFailure,
} = createActions(
  'FETCH_BTTV_GLOBAL_EMOTES_REQUEST',
  'FETCH_BTTV_GLOBAL_EMOTES_SUCCESS',
  'FETCH_BTTV_GLOBAL_EMOTES_FAILURE',
  'FETCH_BTTV_CHANNEL_EMOTES_REQUEST',
  'FETCH_BTTV_CHANNEL_EMOTES_SUCCESS',
  'FETCH_BTTV_CHANNEL_EMOTES_FAILURE',
);

const parseBttvChannelEmotes = ({ channelEmotes, sharedEmotes }) => [
  ...channelEmotes,
  ...sharedEmotes,
];

export const fetchBttvGlobalEmotes = () => async (dispatch) => {
  dispatch(fetchBttvGlobalEmotesRequest());

  try {
    const items = await apiFetchBttvGlobalEmotes();
    const data = { items };

    dispatch(fetchBttvGlobalEmotesSuccess(data));
  } catch (e) {
    dispatch(fetchBttvGlobalEmotesFailure({ error: e.message }));
  }
};

export const fetchBttvChannelEmotes = (channelId, channel) => async (
  dispatch,
) => {
  dispatch(fetchBttvChannelEmotesRequest({ channel }));

  try {
    const response = await apiFetchBttvChannelEmotes(channelId);
    const data = {
      channel,
      items: parseBttvChannelEmotes(response),
    };

    dispatch(fetchBttvChannelEmotesSuccess(data));
  } catch (e) {
    dispatch(fetchBttvChannelEmotesFailure({ channel, error: e.message }));
  }
};

const handleFetchBttvGlobalEmotes = {
  [fetchBttvGlobalEmotesRequest]: (state) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.REQUEST },
    }),
  [fetchBttvGlobalEmotesSuccess]: (state, { payload }) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.SUCCESS, items: payload.items },
    }),
  [fetchBttvGlobalEmotesFailure]: (state, { payload }) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.FAILURE, error: payload.error },
    }),
};

const handleFetchBttvChannelEmotes = {
  [fetchBttvChannelEmotesRequest]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.REQUEST },
      },
    }),
  [fetchBttvChannelEmotesSuccess]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.SUCCESS, items: payload.items },
      },
    }),
  [fetchBttvChannelEmotesFailure]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.FAILURE, error: payload.error },
      },
    }),
};

const reducer = handleActions(
  {
    ...handleFetchBttvGlobalEmotes,
    ...handleFetchBttvChannelEmotes,
  },
  defaultState,
);

export default reducer;
