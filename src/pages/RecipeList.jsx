import React, { useState, useEffect } from 'react';
import { Container, Grid, TextField, Box, InputAdornment, CssBaseline, Dialog, Slide } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import RecipeTile from '../components/RecipeTile';
import Header from '../components/Header';
import Filters from './Filters';
import FilterButton from '../components/FilterButton';
import useAPI from '../hooks/useAPI';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const api = useAPI();
  const navigate = useNavigate();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

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

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = () => {
    setShowAdvancedFilters(false);
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  return (
    <Container>
      <CssBaseline />

      <Dialog
        fullScreen
        open={showAdvancedFilters}
        onClose={() => {}}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Filters onApply={handleFiltersApplied} />
      </Dialog>

      <Header />

      <Box sx={{ mb: 3, mt: 5 }}>
        <Grid item xs={12} container gap={2} justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              id="input-with-icon-adornment"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid xs="auto">
            <FilterButton onClick={handleAdvancedFiltersClick} />
          </Grid>
        </Grid>
      </Box>

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
