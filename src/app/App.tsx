import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from 'react-router-dom';

import { isAuthRedirect } from 'features/auth/authUtils';
import Chat from 'features/chat/Chat';
import Auth from 'features/auth/Auth';
import Logout from 'features/auth/Logout';
import AuthCallback from 'features/auth/AuthCallback';
import GlobalStyles from 'styles';

const getHomeComponent = ({ location }: RouteComponentProps) =>
  isAuthRedirect(location.hash) ? <AuthCallback /> : <Chat />;

const App: React.FC = () => (
  <>
    <Router>
      <Switch>
        <Route exact path="/chat/" render={getHomeComponent} />
        <Route exact path="/chat/auth" component={Auth} />
        <Route exact path="/chat/logout" component={Logout} />
      </Switch>
    </Router>
    <GlobalStyles />
  </>
);

export default App;
