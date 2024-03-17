import { Navigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

interface AuthRouteProps {
  children: React.ReactNode
}

const AuthRoute = ({
  children
}: AuthRouteProps) => {
  const { authenticated } = useAuth();

  if (!authenticated) {
    return <Navigate to="/sign-in" />;
  }

  return children;
};

export default AuthRoute;
