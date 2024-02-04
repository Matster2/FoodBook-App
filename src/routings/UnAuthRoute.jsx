import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import useAuth from 'src/hooks/useAuth';

const UnAuthRoute = ({ children }) => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

UnAuthRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UnAuthRoute;
