import { Navigate } from 'react-router-dom';
import useAuth from 'src/hooks/useAuth';

interface AdminRouteProps {
  children: React.ReactNode
}

const AdminRoute = ({
  children
}: AdminRouteProps) => {
  const { authenticated, claims } = useAuth();

  if (!authenticated) {
    return <Navigate to="/sign-in" />;
  }

  if (claims?.role !== 'Administrator') {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
