import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import isAuthRedirect from 'utils/isAuthRedirect';
import Home from 'components/Home';
import Auth from 'components/Auth';
import Logout from 'components/Logout';
import AuthCallback from 'components/AuthCallback';
import GlobalStyles from 'styles';

const getHomeComponent = ({ location }: RouteComponentProps) =>
  isAuthRedirect(location.hash) ? <AuthCallback /> : <Home />;

interface Props {
  store: any;
}

const App: React.FC<Props> = ({ store }) => (
  <>
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/chat/" render={getHomeComponent} />
          <Route exact path="/chat/auth" component={Auth} />
          <Route exact path="/chat/logout" component={Logout} />
        </Switch>
      </Router>
    </Provider>
    <GlobalStyles />
  </>
);

export default App;
