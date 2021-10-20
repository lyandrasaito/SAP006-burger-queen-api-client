import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login.js';
import SignUp from './pages/signup/signUp.js';
import Kitchen from './pages/kitchen/kitchen.js';
import Hall from './pages/hall/hall.js';
import NotFound from './pages/notFound/notFound.js';
import Ready from './pages/kitchen/ready.js';
import ToDeliver from './pages/hall/toDeliver.js';
import Delivered from './pages/hall/delivered.js';
import PrivateRoute from './components/privateRoute/privateRoute.js';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <PrivateRoute path='/kitchen' component={Kitchen} />
        <PrivateRoute path='/hall' component={Hall} />
        <PrivateRoute path='/todeliver' component={ToDeliver} />
        <PrivateRoute path='/ready' component={Ready} />
        <PrivateRoute path='/delivered' component={Delivered} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
}

export default Root;
