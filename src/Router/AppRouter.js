import React from 'react';
import { BrowserRouter, Route,Switch } from 'react-router-dom';
// import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore,applyMiddleware} from 'redux';
import { ReducerList } from '../reducers/ReducerIndex';
import logger from 'redux-logger';
import List from '../UserList/UserList';
import User from '../UserList/User';

const store = createStore(ReducerList,applyMiddleware(logger));
const AppRouter = () => (
  <Provider store = {store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={List} />
        <Route path="/list" component={List} />
        <Route path="/user" component={User} />
      </Switch>
  </BrowserRouter>
   </Provider>
);
export default AppRouter

