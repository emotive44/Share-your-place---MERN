import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Users from './user/pages/Users';

const App = () => {
    return (
      <Router>
        <Switch>
          <Route path='/' exact component={Users}/>
        </Switch>
      </Router>
    );
}

export default App;
