import React, { useContext, useState, useEffect } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import {
  Container,
  Grid,
  TextField,
  Box,
  InputAdornment,
  CssBaseline,
  Dialog,
  Slide,
  Typography,
  Button,
} from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import RecipeTile from '../components/RecipeTile';
import Header from '../components/Header';
import Filters from './Filters';
import FilterButton from '../components/FilterButton';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
import { isUndefined } from '../utils/utils';
import { TagContext } from '../contexts/TagContext';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import styles from './Favourites.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const api = useAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const { authenticated } = useAuth();

  const { setTags } = useContext(TagContext);

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const [filters, setFilters] = useState(undefined);

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
        favourited: true,
        pageSize: 40,
      });
    } else {
      setFilters({
        favourited: true,
        pageSize: 40,
      });
    }

    fetchTags();
  }, []);

  useEffect(() => {
    console.log(filters);
    if (authenticated && !isUndefined(filters)) {
      fetchRecipes();
    }
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

  if (!authenticated) {
    return (
      <Container>
        <Box textAlign="center" sx={{ marginTop: '30%' }}>
          <Typography>You must be signed in to see your favourites</Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              NiceModal.show('authentication-modal');
            }}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    );
  }

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

      <Header title="Favourites" onBackClick={() => navigate(-1)} />

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

      {!loadingRecipes && recipes.length === 0 && (
        <Box textAlign="center" sx={{ marginTop: '20%' }}>
          <Typography>No favourited recipes</Typography>
        </Box>
      )}

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
