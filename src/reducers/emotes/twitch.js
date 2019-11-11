import { createActions, handleActions } from 'redux-actions';

import { STORE_FLAGS } from 'utils/constants';
import { fetchTwitchEmotesBySets } from 'utils/api';

const defaultState = {
  ...STORE_FLAGS.DEFAULT,
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
  } catch (error) {
    dispatch(fetchTwitchEmotesFailure({ error }));
  }
};

const handleFetchTwitchEmotes = {
  [fetchTwitchEmotesRequest]: (state) => ({
    ...state,
    ...STORE_FLAGS.REQUEST,
  }),
  [fetchTwitchEmotesSuccess]: (state, { payload }) => ({
    ...state,
    ...STORE_FLAGS.SUCCESS,
    items: payload.items,
  }),
  [fetchTwitchEmotesFailure]: (state, { payload }) => ({
    ...state,
    ...STORE_FLAGS.FAILURE,
    error: payload.error,
  }),
};

const reducer = handleActions(handleFetchTwitchEmotes, defaultState);

export default reducer;
