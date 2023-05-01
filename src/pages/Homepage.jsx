import React, { useMemo, useEffect, useContext, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import PropTypes from 'prop-types';
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  Grid,
  Avatar,
  Stack,
  List,
  Dialog,
  Slide,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import Filters from './Filters';
import useInput from '../hooks/useInput';
import RecipeTile from '../components/RecipeTile';
import FilterButton from '../components/FilterButton';
import CategoryChip from '../components/CategoryChip';
import usePagedFetch from '../hooks/usePagedFetch';
import { TagContext } from '../contexts/TagContext';
import { UserContext } from '../contexts/UserContext';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import styles from './Homepage.module.css';
import useAuth from '../hooks/useAuth';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

const Section = ({ title, seeAll, children }) => (
  <Box sx={{ mb: 2 }}>
    <Grid item xs={12} container justifyContent="space-between" alignItems="center">
      <Grid item xs>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      {seeAll && (
        <Grid item xs="auto">
          <Link to="/recipes">See all</Link>
        </Grid>
      )}
    </Grid>

    <List style={{ overflow: 'auto' }}>
      <Stack direction="row" alignItems="center" gap={2}>
        {children}
      </Stack>
    </List>
  </Box>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  seeAll: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  seeAll: true,
};

export default () => {
  const navigate = useNavigate();
  const { authenticated } = useAuth();

  const { setTags } = useContext(TagContext);
  const { user } = useContext(UserContext);

  const { value: search, onChange: onSearchChange } = useInput('');
  const [filters] = useState({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const { results: categories, totalResults: totalCategories } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/tags?random=true&pageSize=10`
  );

  const sevenDaysAgo = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() - 7);
    return date;
  }, []);

  const { results: recentlyAddedRecipes, totalResults: totalRecentlyAddedRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL
    }/recipes?random=true&pageSize=25&publishedAfter=${sevenDaysAgo.toISOString()}&sortBy=datepublished&sortDesc=true`
  );
  const { results: recommendedRecipes, totalResults: totalRecommendedRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/recipes?random=true&pageSize=25`
  );
  const { results: favouriteRecipes, totalResults: totalFavouriteRecipes } = usePagedFetch(
    `${process.env.REACT_APP_API_URL}/recipes?random=true&pageSize=25&favourited=true`
  );

  const { results: tags } = usePagedFetch(`${process.env.REACT_APP_API_URL}/tags`);

  const handleAvatarClick = () => {
    if (authenticated) {
      navigate('/settings');
    } else {
      NiceModal.show('authentication-modal');
    }
  };

  const handleApplySearch = () => {
    navigate(`/recipes`, {
      state: {
        filters: {
          search: search,
        },
      },
    });
  }

  const handleCategoryClick = (id) => {
    navigate(`/recipes`, {
      state: {
        filters: {
          tagIds: [id],
        },
      },
    });
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = (newFilters) => {
    setShowAdvancedFilters(false);
    navigate(`/recipes`, {
      state: {
        filters: newFilters,
      },
    });
  };

  useEffect(() => {
    setTags(tags);
  }, [tags]);

  const getWelcomeMessage = () => {
    if (user?.firstName) {
      return `Welcome, ${user.firstName}`;
    }

    return 'Welcome';
  };

  const renderRecipeTile = (recipe) => (
    <Box
      sx={{
        maxWidth: 150,
      }}
    >
      <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
    </Box>
  );

  return (
    <Container sx={{ pb: 7 }}>
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
        <Filters onApply={handleFiltersApplied} onClose={() => setShowAdvancedFilters(false)} />
      </Dialog>

      <Box sx={{ mb: 3, mt: 5 }}>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="subtitle2">{getWelcomeMessage()}</Typography>
            <Typography variant="h3">What would you like to cook today?</Typography>
          </Grid>
          <Grid xs="auto">
            <Avatar sx={{ bgcolor: authenticated ? '#fb6b1c' : 'grey' }} onClick={handleAvatarClick} />
          </Grid>
        </Grid>
      </Box>

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
              value={search}
              onChange={onSearchChange}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleApplySearch();
                }
              }}
            />
          </Grid>
          <Grid xs="auto">
            <FilterButton onClick={handleAdvancedFiltersClick} />
          </Grid>
        </Grid>
      </Box>

      <Section title="Categories" seeAll={categories.length < totalCategories}>
        {categories.map((category) => (
          <CategoryChip key={category.id} category={category} onClick={handleCategoryClick} />
        ))}
      </Section>

      {recommendedRecipes.length > 0 && (
        <Section title="Recommendations" seeAll={recommendedRecipes.length < totalRecommendedRecipes}>
          {recommendedRecipes.map((recipe) => renderRecipeTile(recipe))}
        </Section>
      )}

      {recentlyAddedRecipes.length > 0 && (
        <Section title="Recently Added" seeAll={recentlyAddedRecipes.length < totalRecentlyAddedRecipes}>
          {recentlyAddedRecipes.map((recipe) => renderRecipeTile(recipe))}
        </Section>
      )}

      {favouriteRecipes.length > 0 && (
        <Section title="Favourite Recipes" seeAll={favouriteRecipes.length < totalFavouriteRecipes}>
          {favouriteRecipes.map((recipe) => renderRecipeTile(recipe))}
        </Section>
      )}
    </Container>
  );
};
