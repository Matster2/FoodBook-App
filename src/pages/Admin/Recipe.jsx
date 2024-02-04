import {
    Box,
    CircularProgress,
    Container
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from 'src/components/Header';
import RecipeForm from 'src/forms/RecipeForm';
import useAPI from 'src/hooks/useAPI';
import { RecipeState } from 'src/types';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const api = useAPI();

  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [recipe, setRecipe] = useState();

  const fetchRecipe = async () => {
    setLoadingRecipe(true);
    try {
      const { data } = await api.getRecipe(id);
      setRecipe({
        ...location?.state,
        ...data,
        images: data.images.map((image) => ({
          ...image,
          url: includeResizeQueryParameters(image.url, 300, 0)
        }))
      });
    } catch (e) {
      console.log('error fetching recipe');
    }
    setLoadingRecipe(false);
  };

  const fetchFromDescendantRecipe = async () => {
    setLoadingRecipe(true);
    try {
      const { data } = await api.getRecipe(location?.state?.descendantOfRecipeId);
      setRecipe({
        ...location?.state,
        ...data,
        state: RecipeState.Draft,
        images: [],
        id: undefined,
        descendantOfRecipeId: location?.state?.descendantOfRecipeId
      });
    } catch (e) {
      console.log('error fetching recipe');
    }
    setLoadingRecipe(false);
  };

  /* Handlers */
  const handleSubmit = (newRecipe) => {
    navigate(`/recipes/${newRecipe.id}`)
  }

  /* Effects */
  useEffect(() => {
    if (id) {
      fetchRecipe();
    } else if (location?.state?.descendantOfRecipeId) {
      fetchFromDescendantRecipe();
    }
  }, []);

  return (
    <>
      <Container sx={{ pb: 7 }}>
        <Header title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.recipe.name")}`} onBackClick={() => navigate(-1)} />

        {loadingRecipe && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingRecipe && (
          <RecipeForm
            recipe={recipe}
            onSubmit={handleSubmit}
            admin={true}
          />
        )}
      </Container>
    </>
  );
};
