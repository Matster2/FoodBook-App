import { Box, Container } from '@mui/material';
import Header from 'components/Header';
import IngredientForm from 'forms/IngredientForm';
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

  const [loadingIngredient, setLoadingIngredient] = useState(false);
  const [ingredient, setIngredient] = useState()

  const fetchIngredient = async () => {
    setLoadingIngredient(true);
    try {
      const { data } = await api.getIngredient(id);
      setIngredient({
        ...location?.state,
        ...data
      });
    } catch (e) {
      console.log('error fetching ingredient');
    }
    setLoadingIngredient(false);
  };

  /* Handlers */
  const handleSubmit = (newIngredient) => {
  }

  /* Effects */
  useEffect(() => {
    if (id) {
      fetchIngredient();
    }
  }, []);
  
  /* Rendering */
  return (
    <>
      <Container sx={{ pb: 7 }}>
        <Header title={`${id ? t("common.words.actions.update") : t("common.words.actions.add")} ${t("types.ingredient.name")}`} onBackClick={() => navigate(-1)} />

        {loadingIngredient && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {!loadingIngredient && (
          <IngredientForm
            ingredient={ingredient}
            onSubmit={handleSubmit}
            admin={true}
          />
        )}
      </Container>
    </>
  );
};
