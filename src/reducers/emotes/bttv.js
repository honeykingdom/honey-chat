import { createActions, handleActions, combineActions } from 'redux-actions';

import {
  fetchBttvGlobalEmotes as apiFetchBttvGlobalEmotes,
  fetchBttvChannelEmotes as apiFetchBttvChannelEmotes,
} from '../../utils/api';

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
  } catch (error) {
    dispatch(fetchBttvGlobalEmotesFailure({ error }));
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
  } catch (error) {
    dispatch(fetchBttvChannelEmotesFailure({ channel, error }));
  }
};

const handleFetchBttvGlobalEmotes = (state, { type, payload }) => {
  if (type === fetchBttvGlobalEmotesRequest.toString()) {
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

  if (type === fetchBttvGlobalEmotesSuccess.toString()) {
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

  if (type === fetchBttvGlobalEmotesFailure.toString()) {
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

const handleFetchBttvChannelEmotes = (state, { type, payload }) => {
  const { channel } = payload;

  if (type === fetchBttvChannelEmotesRequest.toString()) {
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

  if (type === fetchBttvChannelEmotesSuccess.toString()) {
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

  if (type === fetchBttvChannelEmotesFailure.toString()) {
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
      fetchBttvGlobalEmotesRequest,
      fetchBttvGlobalEmotesSuccess,
      fetchBttvGlobalEmotesFailure,
    )]: handleFetchBttvGlobalEmotes,

    [combineActions(
      fetchBttvChannelEmotesRequest,
      fetchBttvChannelEmotesSuccess,
      fetchBttvChannelEmotesFailure,
    )]: handleFetchBttvChannelEmotes,
  },
  defaultState,
);

export default reducer;
