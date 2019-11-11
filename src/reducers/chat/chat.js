import { createActions, handleActions } from 'redux-actions';
import { pathOr, omit } from 'ramda';

const defaultState = {
  currentChannel: null,
  isConnected: false,
  globalState: {},
  channels: {
    // [channel]: {
    //   userState: {},
    //   roomState: {},
    // }
  },
};

export const {
  setCurrentChannel,
  setIsConnected,
  updateGlobalUserState,
  updateUserState,
  updateRoomState,
  removeChannel,
} = createActions(
  'SET_CURRENT_CHANNEL',
  'SET_IS_CONNECTED',
  'UPDATE_GLOBAL_USER_STATE',
  'UPDATE_USER_STATE',
  'UPDATE_ROOM_STATE',
  'REMOVE_CHANNEL',
);

const handleSetCurrentChannel = (state, { payload }) => ({
  ...state,
  currentChannel: payload,
});
const handleSetIsConnected = (state, { payload }) => ({
  ...state,
  isConnected: payload,
});
const handleUpdateGlobalUserState = (state, { payload: { tags } }) => ({
  ...state,
  globalState: { ...state.globalState, ...tags },
});
const handleUpdateUserState = (state, { payload: { channel, tags } }) => ({
  ...state,
  channels: {
    ...state.channels,
    [channel]: { ...state.channels[channel], userState: tags },
  },
});
const handleUpdateRoomState = (state, { payload: { channel, tags } }) => ({
  ...state,
  channels: {
    ...state.channels,
    [channel]: { ...state.channels[channel], roomState: tags },
  },
});
const handleRemoveChannel = (state, { payload: channel }) => ({
  ...state,
  channels: omit([channel], state.channels),
});

const reducer = handleActions(
  {
    [setCurrentChannel]: handleSetCurrentChannel,
    [setIsConnected]: handleSetIsConnected,
    [updateGlobalUserState]: handleUpdateGlobalUserState,
    [updateUserState]: handleUpdateUserState,
    [updateRoomState]: handleUpdateRoomState,
    [removeChannel]: handleRemoveChannel,
  },
  defaultState,
);

export default reducer;
