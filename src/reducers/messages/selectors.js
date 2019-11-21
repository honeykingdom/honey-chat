import * as R from 'ramda';

import { currentChannelSelector } from 'reducers/chat/selectors';

export const messagesSelector = (state) =>
  R.pathOr([], ['messages', currentChannelSelector(state), 'items'], state);

export const usersSelector = (state) =>
  R.pathOr([], ['messages', currentChannelSelector(state), 'users'], state);

export const isHistoryLoadingSelector = (state) =>
  R.pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isLoading',
  ])(state);

export const isHistoryLoadedSelector = (state) =>
  R.pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isLoaded',
  ])(state);

export const isHistoryAddedSelector = (state) =>
  R.pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isAdded',
  ])(state);

export const isEvenSelector = (state) =>
  R.pathOr(false, ['messages', currentChannelSelector(state), 'isEven'], state);
