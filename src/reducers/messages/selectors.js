import { pathOr } from 'ramda';

import { currentChannelSelector } from 'reducers/chat/selectors';

export const messagesSelector = (state) =>
  pathOr([], ['messages', currentChannelSelector(state), 'items'], state);

export const isHistoryLoadingSelector = (state) =>
  pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isLoading',
  ])(state);

export const isHistoryLoadedSelector = (state) =>
  pathOr(false, [
    'messages',
    currentChannelSelector(state),
    'history',
    'isLoaded',
  ])(state);
