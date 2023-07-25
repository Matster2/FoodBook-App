import {
  Box,
  CircularProgress,
  Container
} from '@mui/material';
import Header from 'components/Header';
import RecipeForm from 'forms/RecipeForm';
import useAPI from 'hooks/useAPI';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useParams } from 'react-router-dom';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const api = useAPI();

  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [recipe, setRecipe] = useState();

  const fetchRecipe = async (recipeId) => {
    setLoadingRecipe(true);
    try {
      const { data } = await api.getRecipe(recipeId);
      setRecipe({
        ...location?.state,
        ...data
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
      fetchRecipe(id);
    } else if (location?.state?.descendantOfRecipeId) {
      fetchRecipe(location?.state?.descendantOfRecipeId);
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
