import { createAction, handleActions } from 'redux-actions';

import { fetchUser as apiFetchUser } from '../utils/api';

const defaultState = {
  isAuth: false,
  isLoading: false,
  user: {
    id: null,
    login: null,
    displayName: null,
  },
};

export const setIsAuth = createAction('SET_IS_AUTH');
const fetchUserRequest = createAction('FETCH_USER_REQUEST');
const fetchUserSuccess = createAction('FETCH_USER_SUCCESS');
const fetchUserFailure = createAction('FETCH_USER_FAILURE');

export const fetchUser = (dispatch) => async (id) => {
  dispatch(fetchUserRequest());

  const response = await apiFetchUser(id);
  const { login, display_name: displayName } = response.data[0];
  const user = { id, login, displayName };
  localStorage.setItem('user', JSON.stringify(user));

  dispatch(fetchUserSuccess(user));
};

const handleSetIsAuth = (state, { payload: { isAuth, user } }) => ({
  ...state,
  isAuth: isAuth === undefined ? state.isAuth : isAuth,
  user: { ...state.user, ...user },
});

const handleFetchUserRequest = (state) => ({
  ...state,
  isLoading: true,
});
const handleFetchUserSuccess = (state, { payload }) => ({
  ...state,
  isAuth: true,
  isLoading: false,
  user: payload,
});
const handleFetchUserFailure = (state, { payload }) => ({
  ...state,
  isAuth: false,
  isLoading: false,
  error: payload,
});

const reducer = handleActions(
  {
    [setIsAuth]: handleSetIsAuth,
    [fetchUserRequest]: handleFetchUserRequest,
    [fetchUserSuccess]: handleFetchUserSuccess,
    [fetchUserFailure]: handleFetchUserFailure,
  },
  defaultState,
);

export default reducer;
