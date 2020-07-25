import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import * as serviceWorker from 'serviceWorker';
import { isAuthRedirect } from 'features/auth/authUtils';
import store from 'app/store';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-139550930-3');

  if (!isAuthRedirect(window.location.hash)) {
    const page =
      window.location.pathname + window.location.search + window.location.hash;
    ReactGA.pageview(page);
  }
}

const render = () => {
  // eslint-disable-next-line global-require, @typescript-eslint/no-var-requires
  const App = require('./app/App').default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./app/App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
