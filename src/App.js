import React, { useState, useCallback, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainNavigation from './shared/Navigation/MainNavigation';
import { AuthContext } from './shared/context/auth-context';
import UpdatePlace from './places/pages/UpdatePlace';
import UserPlaces from './places/pages/UserPlaces';
import NewPlace from './places/pages/NewPlace';
import Users from './user/pages/Users';
import Auth from './user/pages/Auth';

const App = () => {
  const [token, setToken] = useState(false);
  const [userId, setUserId] = useState(false);

  const login = useCallback((uid, token) => {
    setToken(token);
    setUserId(uid);
    localStorage.setItem(
      'userData',
      JSON.stringify({ userId: uid, token: token })
    ); 
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('userData'));

    if(storedData) {
      login(storedData.userId, storedData.token);
    }
  }, [login]);

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!token, token, userId, login, logout }}>
      <Router>
        <MainNavigation />
        <main>
          <Switch>
            <Route path='/auth' component={Auth} />
            <Route path='/' exact component={Users} />
            <Route path='/places/new' component={NewPlace} />
            <Route path='/:userId/places' component={UserPlaces} />
            <Route path='/places/:placeId' component={UpdatePlace}/>
          </Switch>
        </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
