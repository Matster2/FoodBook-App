import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import api from 'src/api';

interface RecipesQueryProps {
    search?: string;
    random?: boolean;
    ingredientIds?: string[];
    equipmentIds?: string[];
    tagIds?: string[];
    collectionIds?: string[];
    minTotalTime?: number;
    maxTotalTime?: number;
    types?: string[];
    difficulties?: string[];
    states?: string[];
    personal?: boolean;
    variantOfRecipeId?: string;
    containsAlcohol?: boolean;
    authorId?: string;
    publishedAfter?: dayjs.Dayjs;
    publishedBefore?: dayjs.Dayjs;
    favourited?: boolean;
    hidden?: boolean;
    promoted?: boolean;
    page?: number;
    pageSize?: number;
    sortBy?: string;
    sortDesc?: boolean;
}

const useRecipesQuery = ({

}: RecipesQueryProps) => {
    return useQuery({
        queryKey: ["tags"],
        queryFn: () => api.getRecipes()
            .then((data) => data.results),
        initialData: []
    })

}

export default useRecipesQuery
