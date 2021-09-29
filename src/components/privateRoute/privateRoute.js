import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { isLogged } from '../../utils/authStorage.js';

const PrivateRouter = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isLogged() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}

export default PrivateRouter;