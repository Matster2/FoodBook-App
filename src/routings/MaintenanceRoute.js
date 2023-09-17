import PropTypes from 'prop-types';
import { useContext } from 'react';

import { AppContext } from 'contexts/AppContext';
import Maintenance from 'pages/Maintenance';

const MaintenanceRoute = ({ children }) => {
  const { maintenance } = useContext(AppContext);

  if (maintenance) {
    return <Maintenance />;
  }

  return children;
};

MaintenanceRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MaintenanceRoute;
