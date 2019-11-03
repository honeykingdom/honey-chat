import React from 'react';
import pt from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './Components/Home';
import Auth from './Components/Auth';
import GlobalStyles from './styles';

const App = ({ store }) => (
  <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/chat/" component={Home} />
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
