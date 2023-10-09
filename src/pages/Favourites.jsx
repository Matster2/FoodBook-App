import NiceModal from '@ebay/nice-modal-react';
import { Masonry } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  InputAdornment,
  Slide,
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
import useTags from 'hooks/useTags';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { includeResizeQueryParameters } from 'utils/imageUtils';
import { isUndefined } from 'utils/utils';
import styles from './Favourites.module.css';
import Filters from './Filters';

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

  const { fetch: fetchTags } = useTags();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [filters, setFilters] = useState({
    ...location?.state?.filters,
    favourited: true,
    pageSize: 40,
  });

  const [loadingTags, setLoadingTags] = useState(false);
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

      <Header title={t('pages.favourites.title')} onBackClick={() => navigate(-1)} />

      <Tabs
        sx={{ mb: 2 }}
        value={"favourites"}
        onChange={() => {}}
        textColor="primary"
        indicatorColor="primary"
        centered
      >
        <Tab value="favourites" label={t('pages.favourites.title')} onClick={() => navigate('/favourites')} />
        <Tab value="personal" label={t('pages.personal.title')} onClick={() => navigate('/personal')}  />
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
          <Grid item  xs="auto">
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
    </Container>
  );
};
