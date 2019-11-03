import React from 'react';
import pt from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Auth from './Components/Auth';
import AuthCallback from './Components/AuthCallback';
import GlobalStyles from './styles';

const App = ({ store }) => (
  <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/auth/callback" component={AuthCallback} />
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
