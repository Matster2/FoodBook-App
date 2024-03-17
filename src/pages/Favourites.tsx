import NiceModal from '@ebay/nice-modal-react';
import { Masonry } from '@mui/lab';
import { Box, Button, CircularProgress, Container, Dialog, Grid, InputAdornment, Tab, Tabs, TextField, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import api from 'src/api';
import SearchIcon from 'src/assets/icons/search.svg?react';
import FilterButton from 'src/components/FilterButton';
import RecipeTile from 'src/components/RecipeTile';
import useAuth from 'src/hooks/useAuth';
import PageLayout from 'src/layouts/PageLayout';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import styles from './Favourites.module.css';
import Filters from './Filters';

const Favourites = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticated } = useAuth();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [filters, setFilters] = useState({
    ...location?.state?.filters,
    favourited: true,
    pageSize: 40,
  });

  const {
    isLoading: loadingRecipes,
    data: recipes,
    refetch: refetchRecipes
  } = useQuery({
    queryKey: ["recipes", { ...filters }],
    queryFn: () => api.recipes.getRecipes({
      ...filters
    }),
    initialData: []
  })



  /* Handlers */
  const handleRefresh = async () => {
    refetchRecipes();
  }

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = () => {
    setShowAdvancedFilters(false);
  };

  const handleRecipeClick = (id: string) => {
    navigate(`/recipes/${id}`);
  };

  /* Rendering */
  if (!authenticated) {
    return (
      <Container>
        <Box textAlign="center" sx={{ marginTop: '30%' }}>
          <Typography>{t('pages.favourites.authenticationRequired')}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              NiceModal.show('authentication-modal');
            }}
          >
            {t('pages.favourites.components.buttons.signIn.label')}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <>
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

      <PageLayout
        title={t('pages.favourites.title')}
      >
        <Tabs
          sx={{ mb: 2 }}
          value={"favourites"}
          onChange={() => { }}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab value="favourites" label={t('pages.favourites.title')} onClick={() => navigate('/favourites')} />
          <Tab value="personal" label={t('pages.personal.title')} onClick={() => navigate('/personal')} />
        </Tabs>
        <Box sx={{ mb: 3 }}>
          <Grid item xs={12} container gap={2} justifyContent="space-between" alignItems="center">
            <Grid item xs>
              <TextField
                fullWidth
                id="input-with-icon-adornment"
                placeholder={t('pages.favourites.components.inputs.recipeSearch.placeholder')}
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
              <Typography>{t('pages.favourites.noRecipes')}</Typography>
            </Box>
          )}

          {loadingRecipes && (
            <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
              <CircularProgress />
            </Box>
          )}

          <Masonry columns={{ xs: 2, sm: 4, md: 6 }} spacing={1}>
            {recipes.map((recipe) => {
              return (
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
              )
            })}
          </Masonry>
        </PullToRefresh>
      </PageLayout>
    </>
  );
};

export default Favourites;