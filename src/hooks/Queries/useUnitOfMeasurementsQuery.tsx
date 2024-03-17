import { useQuery } from "@tanstack/react-query";
import api from 'src/api';

const useUnitOfMeasurementsQuery = () => {
    return useQuery({
        queryKey: ["unit-of-measurements"],
        queryFn: () => api.getUnitOfMeasurements()
            .then((data) => data.results),
        initialData: []
    });
}

export default useUnitOfMeasurementsQuery;