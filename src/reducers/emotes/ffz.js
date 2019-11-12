import { createActions, handleActions } from 'redux-actions';
import * as R from 'ramda';

import {
  fetchFfzGlobalEmotes as apiFetchFfzGlobalEmotes,
  fetchFfzChannelEmotes as apiFetchFfzChannelEmotes,
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
  fetchFfzGlobalEmotesRequest,
  fetchFfzGlobalEmotesSuccess,
  fetchFfzGlobalEmotesFailure,
  fetchFfzChannelEmotesRequest,
  fetchFfzChannelEmotesSuccess,
  fetchFfzChannelEmotesFailure,
} = createActions(
  'FETCH_FFZ_GLOBAL_EMOTES_REQUEST',
  'FETCH_FFZ_GLOBAL_EMOTES_SUCCESS',
  'FETCH_FFZ_GLOBAL_EMOTES_FAILURE',
  'FETCH_FFZ_CHANNEL_EMOTES_REQUEST',
  'FETCH_FFZ_CHANNEL_EMOTES_SUCCESS',
  'FETCH_FFZ_CHANNEL_EMOTES_FAILURE',
);

const parseFfzGlobalEmotes = ({ default_sets: defaultSets, sets }) =>
  R.pipe(
    R.pick(defaultSets),
    R.values,
    R.map(R.propOr([], 'emoticons')),
    R.flatten,
  )(sets);

const parseFfzChannelEmotes = R.pipe(
  R.pathOr({}, ['sets']),
  R.values,
  R.map(R.pathOr([], ['emoticons'])),
  R.flatten,
);

export const fetchFfzGlobalEmotes = () => async (dispatch) => {
  dispatch(fetchFfzGlobalEmotesRequest());

  try {
    const response = await apiFetchFfzGlobalEmotes();
    const data = { items: parseFfzGlobalEmotes(response) };

    dispatch(fetchFfzGlobalEmotesSuccess(data));
  } catch (e) {
    dispatch(fetchFfzGlobalEmotesFailure({ error: e.message }));
  }
};

export const fetchFfzChannelEmotes = (channelId, channel) => async (
  dispatch,
) => {
  dispatch(fetchFfzChannelEmotesRequest({ channel }));

  try {
    const response = await apiFetchFfzChannelEmotes(channelId);
    const data = {
      channel,
      items: parseFfzChannelEmotes(response),
    };

    dispatch(fetchFfzChannelEmotesSuccess(data));
  } catch (e) {
    dispatch(fetchFfzChannelEmotesFailure({ channel, error: e.message }));
  }
};

const handleFetchFfzGlobalEmotes = {
  [fetchFfzGlobalEmotesRequest]: (state) =>
    R.mergeDeepRight(state, {
      global: { ...STORE_FLAGS.REQUEST },
    }),
  [fetchFfzGlobalEmotesSuccess]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      global: { ...STORE_FLAGS.SUCCESS, items: payload.items },
    }),
  [fetchFfzGlobalEmotesFailure]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      global: { ...STORE_FLAGS.FAILURE, error: payload.error },
    }),
};

const handleFetchFfzChannelEmotes = {
  [fetchFfzChannelEmotesRequest]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.REQUEST },
      },
    }),
  [fetchFfzChannelEmotesSuccess]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.SUCCESS, items: payload.items },
      },
    }),
  [fetchFfzChannelEmotesFailure]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.FAILURE, error: payload.error },
      },
    }),
};

const reducer = handleActions(
  {
    ...handleFetchFfzGlobalEmotes,
    ...handleFetchFfzChannelEmotes,
  },
  defaultState,
);

export default reducer;
