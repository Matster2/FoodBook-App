import PropTypes from 'prop-types';
import React from 'react';
import { Navigate } from 'react-router-dom';

import useAuth from 'hooks/useAuth';

const AdminRoute = ({ children }) => {
  const { authenticated, claims } = useAuth();

  if (!authenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (claims?.role !== 'Administrator') {
    return <Navigate to="/" />;
  }

  return children;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
