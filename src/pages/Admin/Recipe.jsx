import {
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
  const [recipe, setRecipe] = useState();

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
  const handleSubmit = (newRecipe, files) => {
    console.log("dadsa")
    if (!recipe.id) {
      handleCreateRecipe(newRecipe, files);
    } else {
      handleUpdateRecipe(newRecipe, files);
    }
  }

  const handleCreateRecipe = async (newRecipe, filesToUpload) => {
    try {
      const {
        data: { id },
      } = await api.createRecipe(data);

      filesToUpload.forEach(async (file, index) => {
        await api.uploadRecipeImage(id, file, index);
      });

      toast.success('Recipe successfully created');
    } catch (e) {
      console.log(e)
      toast.error('Unable to create recipe');
    }
  }

  const handleUpdateRecipe = (newRecipe) => {
    
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
          onSubmit={handleSubmit}
        />
      </Container>
    </>
  );
};
