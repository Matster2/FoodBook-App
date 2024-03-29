import NiceModal from '@ebay/nice-modal-react';
import { Add as AddIcon } from '@mui/icons-material';
import { Masonry } from '@mui/lab';
import { Box, Button, CircularProgress, Container, Dialog, Grid, IconButton, InputAdornment, Stack, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import SearchIcon from 'src/assets/icons/search.svg?react';
import FilterButton from 'src/components/FilterButton';
import Header from 'src/components/Header';
import RecipeTile from 'src/components/RecipeTile';
import useAuth from 'src/hooks/useAuth';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import { isUndefined } from 'src/utils/utils';
import Filters from './Filters';
import styles from './Personal.module.css';

const Personal = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticated } = useAuth();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [filters, setFilters] = useState({
    ...location?.state?.filters,
    personal: true,
    pageSize: 40,
  });

  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipes, setRecipes] = useState([]);

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

  /* Handlers */
  const handleRefresh = async () => {
    fetchRecipes();
  }

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = () => {
    setShowAdvancedFilters(false);
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  /* Effects */
  useEffect(() => {
    if (authenticated && !isUndefined(filters)) {
      fetchRecipes();
    }
  }, [filters]);

  /* Rendering */
  if (!authenticated) {
    return (
      <Container>
        <Box textAlign="center" sx={{ marginTop: '30%' }}>
          <Typography>{t('pages.personal.authenticationRequired')}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              NiceModal.show('authentication-modal');
            }}
          >
            {t('pages.personal.components.buttons.signIn.label')}
          </Button>
        </Box>
      </Container>
    );
  }

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

      <Header title={t('pages.personal.title')} onBackClick={() => navigate(-1)} />

      <Tabs
        sx={{ mb: 2 }}
        value={"personal"}
        onChange={() => { }}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab value="favourite" label={t('pages.favourites.title')} onClick={() => navigate('/favourites')} />
        <Tab value="personal" label={t('pages.personal.title')} onClick={() => navigate('/personal')} />
      </Tabs>

      <Stack sx={{ mb: 3 }} alignItems="end">
        <IconButton className={styles.optionButton} onClick={() => navigate('/recipes/create')}>
          <AddIcon className={styles.optionIcon} />
        </IconButton>
      </Stack>

      <Box sx={{ mb: 3 }}>
        <Grid item xs={12} container gap={2} justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              id="input-with-icon-adornment"
              placeholder={t('pages.personal.components.inputs.recipeSearch.placeholder')}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon className={styles.searchIcon} />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs="auto">
            <FilterButton onClick={handleAdvancedFiltersClick} />
          </Grid>
        </Grid>
      </Box>

      <PullToRefresh onRefresh={handleRefresh}>
        {!loadingRecipes && recipes.length === 0 && (
          <Box textAlign="center" sx={{ marginTop: '20%', mb: 1 }}>
            <Typography>{t('pages.personal.noRecipes')}</Typography>
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
              key={recipe.id}
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

export default Personal;