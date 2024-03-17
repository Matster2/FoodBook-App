import { Navigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

interface UnAuthRouteProps {
  children: React.ReactNode
}

const UnAuthRoute = ({
  children
}: UnAuthRouteProps) => {
  const { authenticated } = useAuth();

  if (authenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default UnAuthRoute;
