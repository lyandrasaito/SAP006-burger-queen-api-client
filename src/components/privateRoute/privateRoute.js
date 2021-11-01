import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const isLogged = () => {
  const token = localStorage.getItem('token');

  if (token !== 'undefined' && token !== null) {
    return true;
  } else {
    return false;
  }
};

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest} render={props =>
      isLogged() ? (<Component {...props} />) :
        (<Redirect to={{ pathname: '/login', state: { from: props.location } }} />)
    }
  />
);

export default PrivateRoute;
