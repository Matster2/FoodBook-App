import React, { useState, useEffect } from 'react';
import { Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import RecipeTile from '../components/RecipeTile';
import useAPI from '../hooks/useAPI';

export default () => {
  const api = useAPI();
  const navigate = useNavigate();

  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoadingRecipes(true);
      try {
        setLoadingRecipes(true);
        const { data } = await api.getRecipes();
        setRecipes(data.results);
      } catch {
        console.log('error fetching recipes');
      }
      setLoadingRecipes(false);
    };

    fetchRecipes();
  }, []);

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <Container>
      <h1>Recipe List</h1>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          {recipes.map((recipe) => (
            <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
          ))}
        </Grid>
        <Grid item xs={6}>
          {recipes.map((recipe) => (
            <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};
