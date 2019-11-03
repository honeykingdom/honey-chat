import { createActions, handleActions, combineActions } from 'redux-actions';

const defaultState = {
  items: [],
};

export const { addMessage, addMessages } = createActions({
  ADD_MESSAGE: (message) => ({ messages: [message] }),
  ADD_MESSAGES: (messages) => ({ messages }),
});

const reducer = handleActions(
  {
    [combineActions(addMessage, addMessages)]: (
      state,
      { payload: { messages } },
    ) => ({ ...state, items: [...state.items, ...messages] }),
  },
  defaultState,
);

export default reducer;
