import { Box, CircularProgress, Container, CssBaseline, Dialog, Grid, InputAdornment, Slide, TextField, Typography } from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import FilterButton from 'components/FilterButton';
import Header from 'components/Header';
import RecipeTile from 'components/RecipeTile';
import { TagContext } from 'contexts/TagContext';
import useAPI from 'hooks/useAPI';
import useInput from 'hooks/useInput';
import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Filters from './Filters';
import styles from './Recipes.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const { t } = useTranslation();
  const api = useAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const { setTags } = useContext(TagContext);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { value: search, onChange: onSearchChange } = useInput(location?.state?.filters?.search);
  const [filters, setFilters] = useState({
    ...location?.state?.filters,
    pageSize: 40,
  });

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
      const { data } = await api.getRecipes(filters);
      setRecipes(data.results);
    } catch {
      console.log('error fetching recipes');
    }
    setLoadingRecipes(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchTags();
    fetchRecipes();
  }

  const handleApplySearch = () => {
    setFilters((value) => ({
      ...filters,
      search
    }))
  }

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = (newFilters) => {
    setFilters((value) => ({
      ...value,
      ...newFilters,
    }))
    setShowAdvancedFilters(false);
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  /* Effects */
  useEffect(() => {
    fetchRecipes();
    console.log(filters)
  }, [filters]);

  /* Rendering */
  return (
    <Container>
      <CssBaseline />

      <Dialog
        fullScreen
        open={showAdvancedFilters}
        onClose={() => { }}
        TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Filters filters={filters} onApply={handleFiltersApplied} onClose={() => setShowAdvancedFilters(false)} />
      </Dialog>

      <Header title={t('pages.recipes.title')} onBackClick={() => navigate(-1)} />

      <Box sx={{ mb: 3 }}>
        <Grid item xs={12} container gap={2} justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              id="input-with-icon-adornment"
              placeholder={t('pages.recipes.components.inputs.recipeSearch.placeholder')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.searchIcon} />
                  </InputAdornment>
                ),
              }}
              value={search}
              onChange={onSearchChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleApplySearch();
                }
              }}
              onBlur={handleApplySearch}
            />
          </Grid>
          <Grid xs="auto">
            <FilterButton onClick={handleAdvancedFiltersClick} />
          </Grid>
        </Grid>
      </Box>

      <PullToRefresh onRefresh={handleRefresh}>
        {!loadingRecipes && recipes.length === 0 && (
          <Box textAlign="center" sx={{ marginTop: '20%' }}>
            <Typography>{t('pages.recipes.noRecipes')}</Typography>
          </Box>
        )}

        {loadingRecipes && (
          <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        <Grid container spacing={1}>
          <Grid item xs={6}>
            {recipes
              .filter((_, index) => !(index % 2))
              .map((recipe) => (
                <Box sx={{ mb: 1 }}>
                  <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
                </Box>
              ))}
          </Grid>
          <Grid item xs={6}>
            {recipes
              .filter((_, index) => index % 2)
              .map((recipe) => (
                <Box sx={{ mb: 1 }}>
                  <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
                </Box>
              ))}
          </Grid>
        </Grid>
      </PullToRefresh>
    </Container>
  );
};
