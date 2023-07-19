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
import { useNavigate, useParams } from 'react-router-dom';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAPI();

  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [recipe, setRecipe] = useState({
    personal: true
  });

  const fetchRecipe = async () => {
    setLoadingRecipe(true);
    try {
      const { data } = await api.getRecipe(id);
      setRecipe(data);
    } catch (e) {
      console.log('error fetching recipe');
    }
    setLoadingRecipe(false);
  };

  const handleSubmit = (newRecipe) => {
    setRecipe(newRecipe);
    navigate(`/recipes/${newRecipe.id}`)
  }

  /* Effects */
  useEffect(() => {
    if (id) {
      fetchRecipe();
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
            admin={false}
          />
        )}
      </Container>
    </>
  );
};
