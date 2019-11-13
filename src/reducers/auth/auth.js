import { createAction, handleActions } from 'redux-actions';
import * as R from 'ramda';

import { STORE_FLAGS } from 'utils/constants';
import { fetchUser as apiFetchUser } from 'utils/api';

const defaultState = {
  isAuth: false,
  user: {
    ...STORE_FLAGS.default,
    id: null,
    login: null,
    displayName: null,
  },
};

export const setIsAuth = createAction('SET_IS_AUTH');
const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
const fetchUserFailure = createAction('FETCH_USER_FAILURE');

export const fetchUser = (id) => async (dispatch) => {
  dispatch(fetchUserRequest());

  try {
    const response = await apiFetchUser(id);
    const { login, display_name: displayName } = response.data[0];
    const user = { id, login, displayName };
    localStorage.setItem('user', JSON.stringify(user));

    dispatch(fetchUserSuccess(user));
  } catch (e) {
    dispatch(fetchUserFailure({ error: e.message }));
  }
};

const handleSetIsAuth = (state, { payload: { isAuth, user } }) => ({
  ...state,
  isAuth: isAuth === undefined ? state.isAuth : isAuth,
  user: { ...state.user, ...user },
});

const handleFetchUser = {
  [fetchUserRequest]: (state) =>
    R.mergeDeepRight(state, {
      isAuth: false,
      user: { ...STORE_FLAGS.REQUEST },
    }),
  [fetchUserSuccess]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      isAuth: true,
      user: {
        ...STORE_FLAGS.SUCCESS,
        ...payload,
      },
    }),
  [fetchUserFailure]: (state, { payload }) =>
    R.mergeDeepRight(state, {
      isAuth: false,
      user: {
        ...STORE_FLAGS.FAILURE,
        error: payload.error,
      },
    }),
};

const reducer = handleActions(
  {
    [setIsAuth]: handleSetIsAuth,
    ...handleFetchUser,
  },
  defaultState,
);

export default reducer;
