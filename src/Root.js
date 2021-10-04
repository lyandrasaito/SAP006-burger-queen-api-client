import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/login/login.js';
import SignUp from './pages/signUp/signUp.js';
import Kitchen from './pages/kitchen/kitchen.js';
import Hall from './pages/hall/hall.js';
import NotFound from './pages/notFound/notFound.js';
//import PrivateRoute from './privateRoute/privateRoute.js';

const Root = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/login' component={Login} />
        <Route path='/signup' component={SignUp} />
        <Route path='/kitchen' component={Kitchen} />
        <Route path='/hall' component={Hall} />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  ); 
}

export default Root;
