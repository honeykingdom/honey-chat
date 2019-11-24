import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ReactGA from 'react-ga';

import isAuthRedirect from 'features/auth/utils/isAuthRedirect';
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
  const App = require('./app/App').default;

  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  );
};

render();

if (process.env.NODE_ENV === 'development' && (module as any).hot) {
  (module as any).hot.accept('./app/App', render);
}
