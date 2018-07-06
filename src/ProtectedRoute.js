import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = rest;
  return <Route {...rest} render={(props) => {
    return isAuthenticated ? <Component {...props} /> : 
      <Redirect to={{
        pathname: '/auth_error',
        state: { from: props.location }
      }} />
  }} />
}

export default ProtectedRoute;
