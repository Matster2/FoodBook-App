import { Masonry } from '@mui/lab';
import { Box, CircularProgress, Container, Dialog, Grid, InputAdornment, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import SearchIcon from 'src/assets/icons/search.svg?react';
import FilterButton from 'src/components/FilterButton';
import Header from 'src/components/Header';
import RecipeTile from 'src/components/RecipeTile';
import useTagsQuery from 'src/hooks/queries/useTagsQuery';
import useInput from 'src/hooks/useInput';
import { RecipeState } from 'src/types';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import Filters from './Filters';
import styles from './Recipes.module.css';

const Recipes = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    data: tags
  } = useTagsQuery();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { value: search, onChange: onSearchChange } = useInput(location?.state?.filters?.search);
  const [filters, setFilters] = useState({
    ...location?.state?.filters,
    pageSize: 40,
    states: [RecipeState.Published]
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
    refetchTags();
    refetchRecipes();
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

  const handleRecipeClick = (id: string) => {
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

export default Recipes;