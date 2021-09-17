import React from 'react';
import { Route, Redirect } from 'react-router';
import { isLogged } from '../../utils/auth';

/*const PrivateRoute = props => isLogged() ?
  <Route {...props} />
  : <Redirect to='/login' />*/

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLogged() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
);

export default PrivateRoute;