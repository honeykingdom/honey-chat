import { createActions, handleActions, combineActions } from 'redux-actions';
import { pipe, pathOr, map, values, flatten } from 'ramda';

import {
  fetchFfzGlobalEmotes as apiFetchFfzGlobalEmotes,
  fetchFfzChannelEmotes as apiFetchFfzChannelEmotes,
} from 'utils/api';

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

const parseFfzGlobalEmotes = pipe(
  pathOr({}, ['sets']),
  values,
  map(pathOr([], ['emoticons'])),
  flatten,
);
const parseFfzChannelEmotes = parseFfzGlobalEmotes;

export const fetchFfzGlobalEmotes = () => async (dispatch) => {
  dispatch(fetchFfzGlobalEmotesRequest());

  try {
    const response = await apiFetchFfzGlobalEmotes();
    const data = { items: parseFfzGlobalEmotes(response) };

    dispatch(fetchFfzGlobalEmotesSuccess(data));
  } catch (error) {
    dispatch(fetchFfzGlobalEmotesFailure({ error }));
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
  } catch (error) {
    dispatch(fetchFfzChannelEmotesFailure({ channel, error }));
  }
};

const handleFetchFfzGlobalEmotes = (state, { type, payload }) => {
  if (type === fetchFfzGlobalEmotesRequest.toString()) {
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

  if (type === fetchFfzGlobalEmotesSuccess.toString()) {
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

  if (type === fetchFfzGlobalEmotesFailure.toString()) {
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

  if (type === fetchFfzChannelEmotesRequest.toString()) {
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

  if (type === fetchFfzChannelEmotesSuccess.toString()) {
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

  if (type === fetchFfzChannelEmotesFailure.toString()) {
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
      fetchFfzGlobalEmotesRequest,
      fetchFfzGlobalEmotesSuccess,
      fetchFfzGlobalEmotesFailure,
    )]: handleFetchFfzGlobalEmotes,

    [combineActions(
      fetchFfzChannelEmotesRequest,
      fetchFfzChannelEmotesSuccess,
      fetchFfzChannelEmotesFailure,
    )]: handleFetchFfzChannelEmotes,
  },
  defaultState,
);

export default reducer;
