import { pathOr } from 'ramda';

import { currentChannelSelector } from './chat';

export const channelIdSelector = (state) =>
  pathOr(
    null,
    ['chat', 'channels', currentChannelSelector(state), 'roomState', 'roomId'],
    state,
  );

export const isEvenSelector = (state) =>
  pathOr(false, ['messages', currentChannelSelector(state), 'isEven'], state);
