/* eslint-disable no-underscore-dangle */
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const enhancer =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(thunk)
    : compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__
          ? window.__REDUX_DEVTOOLS_EXTENSION__()
          : (noop) => noop,
      );

const store = createStore(rootReducer, {}, enhancer);

export default store;
