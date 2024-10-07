import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
  const { user } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={(props) =>
        user && roles.includes(user.role) ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
