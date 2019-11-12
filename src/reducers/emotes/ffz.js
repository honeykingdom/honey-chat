import { createActions, handleActions } from 'redux-actions';
import { mergeDeepRight, pipe, pathOr, map, values, flatten } from 'ramda';

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

const parseFfzEmotes = pipe(
  pathOr({}, ['sets']),
  values,
  map(pathOr([], ['emoticons'])),
  flatten,
);

export const fetchFfzGlobalEmotes = () => async (dispatch) => {
  dispatch(fetchFfzGlobalEmotesRequest());

  try {
    const response = await apiFetchFfzGlobalEmotes();
    const data = { items: parseFfzEmotes(response) };

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
      items: parseFfzEmotes(response),
    };

    dispatch(fetchFfzChannelEmotesSuccess(data));
  } catch (e) {
    dispatch(fetchFfzChannelEmotesFailure({ channel, error: e.message }));
  }
};

const handleFetchFfzGlobalEmotes = {
  [fetchFfzGlobalEmotesRequest]: (state) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.REQUEST },
    }),
  [fetchFfzGlobalEmotesSuccess]: (state, { payload }) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.SUCCESS, items: payload.items },
    }),
  [fetchFfzGlobalEmotesFailure]: (state, { payload }) =>
    mergeDeepRight(state, {
      global: { ...STORE_FLAGS.FAILURE, error: payload.error },
    }),
};

const handleFetchFfzChannelEmotes = {
  [fetchFfzChannelEmotesRequest]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.REQUEST },
      },
    }),
  [fetchFfzChannelEmotesSuccess]: (state, { payload }) =>
    mergeDeepRight(state, {
      channels: {
        [payload.channel]: { ...STORE_FLAGS.SUCCESS, items: payload.items },
      },
    }),
  [fetchFfzChannelEmotesFailure]: (state, { payload }) =>
    mergeDeepRight(state, {
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
