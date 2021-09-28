import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/login/index.js';
import Signup from '../pages/signup/index.js';
import Kitchen from '../pages/kitchen/index.js';
import Hall from '../pages/hall/index.js';
import NotFound from '../pages/notfound/index.js';
//import PrivateRoute from './privateRoute/index.js';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/kitchen' component={Kitchen} />
        <Route path='/hall' component={Hall} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
