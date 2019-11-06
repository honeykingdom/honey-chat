import { createActions, handleActions, combineActions } from 'redux-actions';

import { fetchTwitchEmotesBySets } from '../../utils/api';

const defaultState = {
  isLoading: false,
  isLoaded: false,
  isError: false,
  error: null,
  items: {
    // [setId]: [
    //   {
    //     code: "PartyPoro",
    //     id: 300949540,
    //   },
    // ],
  },
};

const {
  fetchTwitchEmotesRequest,
  fetchTwitchEmotesSuccess,
  fetchTwitchEmotesFailure,
} = createActions(
  'FETCH_TWITCH_EMOTES_REQUEST',
  'FETCH_TWITCH_EMOTES_SUCCESS',
  'FETCH_TWITCH_EMOTES_FAILURE',
);

export const fetchTwitchEmotes = (userId) => async (dispatch) => {
  dispatch(fetchTwitchEmotesRequest);

  try {
    const response = await fetchTwitchEmotesBySets(userId);
    const data = { items: response.emoticon_sets };

    dispatch(fetchTwitchEmotesSuccess(data));
  } catch (e) {
    dispatch(fetchTwitchEmotesFailure(e));
  }
};

const handleFetchTwitchEmotes = (state, { type, payload }) => {
  if (type === fetchTwitchEmotesRequest.toString()) {
    return {
      ...state,
      isLoading: true,
      isLoaded: false,
      isError: false,
      error: null,
    };
  }

  if (type === fetchTwitchEmotesSuccess.toString()) {
    return {
      ...state,
      isLoading: false,
      isLoaded: true,
      isError: false,
      ...payload,
    };
  }

  if (type === fetchTwitchEmotesFailure.toString()) {
    return {
      ...state,
      isLoading: false,
      isLoaded: false,
      isError: true,
      error: payload,
    };
  }

  return state;
};

const reducer = handleActions(
  {
    [combineActions(
      fetchTwitchEmotesRequest,
      fetchTwitchEmotesSuccess,
      fetchTwitchEmotesFailure,
    )]: handleFetchTwitchEmotes,
  },
  defaultState,
);

export default reducer;
