import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainNavigation from './shared/Navigation/MainNavigation';
import Users from './user/pages/Users';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact component={Users}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
