import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import MainNavigation from './shared/Navigation/MainNavigation';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';

const App = () => {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Switch>
          <Route path='/' exact component={Users} />
          <Route path='/places/new' component={NewPlace} />
          <Route path='/:userId/places' component={UserPlaces} />
          <Route path='/places/:placeId' component={UpdatePlace}/>
        </Switch>
      </main>
    </Router>
  );
}

export default App;
