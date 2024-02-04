import { useContext } from 'react';
import { UnitOfMeasurementContext } from 'src/contexts/UnitOfMeasurementContext';
import useAPI from 'src/hooks/useAPI';

export default () => {
  const { unitOfMeasurements, setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);
  const api = useAPI();

  const fetch = async () => {
    try {
      const { data } = await api.getUnitOfMeasurements({ sortBy: 'name' });
      setUnitOfMeasurements(data.results);
    } catch {
      console.log('error fetching unit of measurements');
    }
  };

  return {
    unitOfMeasurements,
    setUnitOfMeasurements,
    fetch
  };
};