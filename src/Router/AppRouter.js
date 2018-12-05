import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
import List from '../UserList/UserList';
import User from '../UserList/User';


const AppRouter = () => (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/list" component={List} />
        <Route path="/user" component={User} />
      </Switch>
  </BrowserRouter>
);
export default AppRouter

