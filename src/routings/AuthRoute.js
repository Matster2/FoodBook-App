import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const AuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

AuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRoute;
