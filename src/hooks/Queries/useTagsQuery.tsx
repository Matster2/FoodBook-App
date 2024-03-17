import { useQuery } from "@tanstack/react-query";
import api from 'src/api';

const useTagsQuery = () => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => api.getTags()
            .then((data) => data.results),
        initialData: []
    });
}

export default useTagsQuery;