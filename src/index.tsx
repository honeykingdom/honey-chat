import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import isAuthRedirect from 'utils/isAuthRedirect';
import store from 'store';
import App from './App';
// import * as serviceWorker from './serviceWorker';

if (process.env.NODE_ENV === 'production') {
  ReactGA.initialize('UA-139550930-3');

  if (!isAuthRedirect(window.location.hash)) {
    const page =
      window.location.pathname + window.location.search + window.location.hash;
    ReactGA.pageview(page);
  }
}

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
