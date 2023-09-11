import { Masonry } from '@mui/lab';
import { Box, CircularProgress, Container, Dialog, Grid, InputAdornment, Slide, TextField, Typography } from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import FilterButton from 'components/FilterButton';
import Header from 'components/Header';
import RecipeTile from 'components/RecipeTile';
import useAPI from 'hooks/useAPI';
import useInput from 'hooks/useInput';
import useTags from 'hooks/useTags';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { RecipeState } from 'types';
import { includeResizeQueryParameters } from 'utils/imageUtils';
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

  const { fetch: fetchTags } = useTags();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { value: search, onChange: onSearchChange } = useInput(location?.state?.filters?.search);
  const [filters, setFilters] = useState({
    ...location?.state?.filters,
    pageSize: 40,
    states: [ RecipeState.Published ]
  });

  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);

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
    setFilters((_value) => ({
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
          <Grid item xs="auto">
            <FilterButton onClick={handleAdvancedFiltersClick} />
          </Grid>
        </Grid>
      </Box>

      <PullToRefresh onRefresh={handleRefresh}>
        {!loadingRecipes && recipes.length === 0 && (
          <Box textAlign="center" sx={{ mt: 20, mb: 1 }}>
            <Typography>{t('pages.recipes.noRecipes')}</Typography>
          </Box>
        )}

        {loadingRecipes && (
          <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        <Masonry columns={{ xs: 2, sm: 4, md: 6 }} spacing={1}>
          {recipes.map((recipe, index) => (
            <RecipeTile
              key={index}
              recipe={{
                ...recipe,
                images: recipe.images.map((image) => ({
                  ...image,
                  url: includeResizeQueryParameters(image.url, 300, 0)
                }))
              }}
              onClick={handleRecipeClick}
            />
          ))}
        </Masonry>
      </PullToRefresh>
    </Container>
  );
};
