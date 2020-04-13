import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Users from './user/pages/Users';

const App = () => {
    return (
      <Users />
    );
}

export default App;
