import { createAction, handleActions } from 'redux-actions';

const getOptionsFromLocalStorage = () => {
  try {
    return JSON.parse(localStorage.options);
  } catch {
    return {};
  }
};

const defaultState = {
  showTimestamps: false,
  splitChat: true,
  blacklistKeywords: '',
  highlightKeywords: '',
  fixedWidth: false,
  ...getOptionsFromLocalStorage(),
};

export const changeOption = createAction('CHANGE_OPTION', (option, value) => {
  localStorage.setItem(
    'options',
    JSON.stringify({
      ...getOptionsFromLocalStorage(),
      [option]: value,
    }),
  );

  return {
    option,
    value,
  };
});
const handleChangeOption = (state, { payload: { option, value } }) => ({
  ...state,
  [option]: value,
});

const reducer = handleActions(
  {
    [changeOption]: handleChangeOption,
  },
  defaultState,
);

export default reducer;
