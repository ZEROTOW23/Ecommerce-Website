import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const ProtectedRoute = ({ role, children }) => {
  const { user } = useContext(AuthContext);

  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
