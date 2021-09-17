import React from 'react';
import { Router, Switch, Route } from 'react-router';
import { history } from '../history.js';
import Login from '../pages/login/index.js';
import Signup from '../pages/signup/index.js';
import Kitchen from '../pages/kitchen/index.js';
import Hall from '../pages/hall/index.js';
import NotFound from '../pages/notfound/index.js';
import PrivateRoute from './privateRoute/index.js';

const Root = () => (
  <Router history={history}>
    <Switch>
      <Route exact path='/' component={Login}  />
      <Route exact path='/login' component={Login}  />
      <Route path='/signup' component={Signup} />
      <PrivateRoute path='/kitchen' component={Kitchen} />
      <PrivateRoute path='/hall' component={Hall} />
      <Route component={NotFound} />

    </Switch>
  </Router>

)

export default Root;