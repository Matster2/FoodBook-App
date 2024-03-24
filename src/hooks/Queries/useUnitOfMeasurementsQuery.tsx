import { useQuery } from "@tanstack/react-query";
import api from 'src/api';

const useUnitOfMeasurementsQuery = () => {
    return useQuery({
        queryKey: ["unit-of-measurements"],
        queryFn: () => api.unitOfMeasurements.getUnitOfMeasurements({
            sortBy: "name"
        })
            .then(({ data }) => data.results),
        initialData: []
    });
}

export default useUnitOfMeasurementsQuery;