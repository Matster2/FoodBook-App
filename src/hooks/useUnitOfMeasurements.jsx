import { UnitOfMeasurementContext } from 'contexts/UnitOfMeasurementContext';
import useAPI from 'hooks/useAPI';
import { useContext } from 'react';

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