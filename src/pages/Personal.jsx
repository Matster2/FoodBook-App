import NiceModal from '@ebay/nice-modal-react';
import { Add as AddIcon } from '@mui/icons-material';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  InputAdornment,
  Slide,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography
} from '@mui/material';
import { ReactComponent as SearchIcon } from 'assets/icons/search.svg';
import FilterButton from 'components/FilterButton';
import Header from 'components/Header';
import RecipeTile from 'components/RecipeTile';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { isUndefined } from 'utils/utils';
import Filters from './Filters';
import styles from './Personal.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const api = useAPI();
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
        TransitionComponent={Transition}
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
        onChange={() => {}}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab value="favourite" label={t('pages.favourites.title')} onClick={() => navigate('/favourites')} />
        <Tab value="personal" label={t('pages.personal.title')} onClick={() => navigate('/personal')}  />
      </Tabs>

      <Stack sx={{ mb: 3 }} alignItems="end">
        <IconButton className={styles.optionButton}>
          <AddIcon className={styles.optionIcon} onClick={() => navigate('/recipes/create')} />
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
          <Grid xs="auto">
            <FilterButton onClick={handleAdvancedFiltersClick} />
          </Grid>
        </Grid>
      </Box>

      <PullToRefresh onRefresh={handleRefresh}>
        {!loadingRecipes && recipes.length === 0 && (
          <Box textAlign="center" sx={{ marginTop: '20%' }}>
            <Typography>{t('pages.personal.noRecipes')}</Typography>
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