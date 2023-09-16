import PropTypes from 'prop-types';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

const MaintenanceRoute = ({ children }) => {
  const [maintenance] = useState(true);

  if (maintenance) {
    return <Navigate to="/maintenace" />;
  }

  return children;
};

MaintenanceRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MaintenanceRoute;
