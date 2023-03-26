import React, { useContext, useState, useEffect } from 'react';
import { Container, Grid, TextField, Box, InputAdornment, CssBaseline, Dialog, Slide } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeTile from '../components/RecipeTile';
import Header from '../components/Header';
import Filters from './Filters';
import FilterButton from '../components/FilterButton';
import useAPI from '../hooks/useAPI';
import { isUndefined } from '../utils/utils';
import { TagContext } from '../contexts/TagContext';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import styles from './Recipes.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const api = useAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const { setTags } = useContext(TagContext);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [filters, setFilters] = useState({});

  const [loadingTags, setLoadingTags] = useState(false);
  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);

  const fetchTags = async () => {
    setLoadingTags(true);
    try {
      setLoadingTags(true);
      const { data } = await api.getTags();
      setTags(data.results);
    } catch {
      console.log('error fetching tags');
    }
    setLoadingTags(false);
  };

  const fetchRecipes = async () => {
    setLoadingRecipes(true);
    try {
      setLoadingRecipes(true);
      const { data } = await api.getRecipes(filters);
      setRecipes(data.results);
    } catch {
      console.log('error fetching recipes');
    }
    setLoadingRecipes(false);
  };

  useEffect(() => {
    if (!isUndefined(location?.state?.filters)) {
      setFilters({
        ...location.state.filters,
        pageSize: 40,
      });
    }
  }, []);

  useEffect(() => {
    fetchRecipes();
    fetchTags();
  }, [filters]);

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
        <Filters filters={filters} onApply={handleFiltersApplied} onClose={() => setShowAdvancedFilters(false)} />
      </Dialog>

      <Header title="Recipes" onBackClick={() => navigate(-1)} />

      <Box sx={{ mb: 3 }}>
        <Grid item xs={12} container gap={2} justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              id="input-with-icon-adornment"
              placeholder="Search recipes"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.searchIcon} />
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
          {recipes
            .filter((_, index) => !(index % 2))
            .map((recipe) => (
              <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
            ))}
        </Grid>
        <Grid item xs={6}>
          {recipes
            .filter((_, index) => index % 2)
            .map((recipe) => (
              <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
            ))}
        </Grid>
      </Grid>
    </Container>
  );
};
