import React from 'react';
import pt from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home';
import Auth from './components/Auth';
import AuthCallback from './components/AuthCallback';
import GlobalStyles from './styles';

const getHomeComponent = () => {
  const isAuthRedirect = window.location.hash.startsWith('#access_token=');
  return isAuthRedirect ? AuthCallback : Home;
};

const App = ({ store }) => (
  <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/chat/" component={getHomeComponent()} />
          <Route exact path="/chat/auth" component={Auth} />
        </Switch>
      </Router>
    </Provider>
    <GlobalStyles />
  </>
);

App.propTypes = {
  store: pt.shape({}).isRequired,
};

export default App;
