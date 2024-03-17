import { useContext } from 'react';
import { AppContext } from 'src/contexts/AppContext';
import Maintenance from 'src/pages/Maintenance';

interface MaintenanceRouteProps {
  children: React.ReactNode
}

const MaintenanceRoute = ({
  children
}: MaintenanceRouteProps) => {
  const { maintenance } = useContext(AppContext);

  if (maintenance) {
    return <Maintenance />;
  }

  return children;
};

export default MaintenanceRoute;
