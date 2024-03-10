import {
  Box,
  Checkbox,
  CircularProgress, Paper, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow, Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import useAPI from 'src/hooks/useAPI';
import useFilters from 'src/hooks/useFilters';

const Recipes = ({ collection }) => {
  const { t } = useTranslation();

  const api = useAPI();
  const { filters, setFilter } = useFilters({
    states: ['published'],
    sortBy: 'datepublished',
    sortDesc: true,
    personal: false,
    page: 1,
    pageSize: 50
  });


  const [loadingCollectionRecipes, setLoadingCollectionRecipes] = useState(false);
  const [collectionRecipes, setCollectionRecipes] = useState();

  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipeResponse, setRecipeResponse] = useState();

  const fetchCollectionRecipes = async () => {
    setLoadingCollectionRecipes(true);

    try {
      const { data } = await api.getRecipes({
        collectionIds: [collection.id]
      });
      setCollectionRecipes(data.results);
    } catch (e) {
      console.log(e);
    }

    setLoadingCollectionRecipes(false);
  };

  const fetchRecipes = async () => {
    setLoadingRecipes(true);

    try {
      const { data } = await api.getRecipes(filters);
      setRecipeResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingRecipes(false);
  };

  /* Handlers */
  const handleRecipeCheckboxChanged = async (recipe, checked) => {
    if (checked) {
      await addRecipeToCollection(recipe);
    } else if (!checked) {
      await removeRecipeFromCollection(recipe);
    }
  }

  const addRecipeToCollection = async (recipe) => {
    try {
      await api.addRecipeToCollection(collection.id, recipe.id);

      setCollectionRecipes((recipes) => [
        ...recipes,
        recipe
      ]);

      toast.success(t("requests.collections.addRecipeToCollection.success"));
    } catch (e) {
      console.log(e)
      toast.error(t("requests.collections.addRecipeToCollection.error"));
    }
  }

  const removeRecipeFromCollection = async (recipe) => {
    try {
      await api.removeRecipeFromCollection(collection.id, recipe.id);

      setCollectionRecipes((recipes) => [...recipes.filter(x => x.id !== recipe.id)]);

      toast.success(t("requests.collections.removeRecipeFromCollection.success"));
    } catch (e) {
      console.log(e)
      toast.error(t("requests.collections.removeRecipeFromCollection.error"));
    }
  }

  /* Effects */
  useEffect(() => {
    if (collection) {
      fetchCollectionRecipes();
    }
  }, [collection]);

  useEffect(() => {
    fetchRecipes()
  }, [filters]);

  /* Rendering */
  return (
    <>
      {(loadingRecipes || loadingCollectionRecipes) && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {(!loadingCollectionRecipes && recipeResponse) && (
        <Box>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total recipes: {recipeResponse.totalResults}</Typography>
          </Box>

          {recipeResponse.results.length === 0 && !loadingRecipes && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Recipe Found</Typography>
            </Box>
          )}

          {recipeResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} style={{ tableLayout: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeResponse.results.map((recipe) => (
                    <TableRow key={recipe.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={collectionRecipes.some(x => x.id === recipe.id)}
                          onChange={(e) => handleRecipeCheckboxChanged(recipe, e.target.checked)}
                        />
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {recipe.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {recipeResponse.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={recipeResponse.totalPages} page={recipeResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </Box>
      )}
    </>
  )
}

export default Recipes;