import React from 'react';
import { Route } from 'react-router-dom';
import Home from './layouts/home/Home';

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, authError } = rest;

  return (
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else if (authError) {
          return <Home authError={authError} />;
        } else {
          return <div />;
        }
      }}
    />
  );
};

export default ProtectedRoute;
