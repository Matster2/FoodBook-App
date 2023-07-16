import {
  Container
} from '@mui/material';
import Header from 'components/Header';
import RecipeForm from 'forms/RecipeForm';
import useAPI from 'hooks/useAPI';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';

const initialRecipeValue = {
  name: '',
  description: '',
  type: undefined,
  difficulty: undefined,
  prepTime: undefined,
  cookTime: undefined,
  totalTime: undefined,
  servings: undefined,
  containsAlcohol: false,
  steps: [
    {
      id: uuid(),
      name: "",
      instructions: []
    }
  ],
  ingredients: [],
  equipment: [],
  referenceUrl: '',
  nutrition: {
    calories: undefined,
    sugar: undefined,
    fat: undefined,
    saturatedFat: undefined,
    sodium: undefined,
    protein: undefined,
    carbohydrates: undefined,
    fiber: undefined,
  },
  tags: [],
  images: [],
};

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAPI();

  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipeValue);

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

  /* Handlers */
  const handleRecipeChange = (newRecipe) => {
    setRecipe(newRecipe);
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
        <Header title="Add Recipe" onBackClick={() => navigate(-1)} />

        <RecipeForm
          recipe={recipe}
      />
      </Container>
    </>
  );
};
