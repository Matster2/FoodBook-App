import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const UnAuthRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

UnAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnAuthRoute;
