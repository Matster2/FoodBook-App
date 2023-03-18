import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Grid,
  Avatar,
  Stack,
  List,
  Dialog,
  Slide,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AccountCircle, Alarm as AlarmIcon } from '@mui/icons-material';
import Filters from './Filters';
import RecipeTile from '../components/RecipeTile';
import CategoryChip from '../components/CategoryChip';
import usePagedFetch from '../hooks/usePagedFetch';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

const Section = ({ title, children }) => (
  <Box sx={{ mb: 2 }}>
    <Grid item xs={12} container justifyContent="space-between" alignItems="center">
      <Grid item xs>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item xs="auto">
        <Link to="/recipes">See all</Link>
      </Grid>
    </Grid>

    <List style={{ overflow: 'auto' }}>
      <Stack direction="row" alignItems="center" gap={2}>
        {children}
        {children}
        {children}
      </Stack>
    </List>
  </Box>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default () => {
  const navigate = useNavigate();

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(true);

  const { results: recentlyViewedRecipes } = usePagedFetch(`${process.env.REACT_APP_API_URL}/recipes`);
  const { results: recommendedRecipes } = usePagedFetch(`${process.env.REACT_APP_API_URL}/recipes`);
  const { results: favouriteRecipes } = usePagedFetch(`${process.env.REACT_APP_API_URL}/recipes`);

  const categories = [
    {
      id: 1,
      name: 'Vegetables',
    },
    {
      id: 1,
      name: 'Fish',
    },
    {
      id: 1,
      name: 'Meat',
    },
    {
      id: 1,
      name: 'Desserts',
    },
    {
      id: 1,
      name: 'Soups',
    },
    {
      id: 1,
      name: 'Fast',
    },
  ];

  const handleCategoryClick = (id) => {
    navigate(`/recipes`);
  };

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleAdvancedFiltersClick = () => {
    setShowAdvancedFilters(true);
  };

  const handleFiltersApplied = () => {
    setShowAdvancedFilters(false);
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
        <Filters onApply={handleFiltersApplied} />
      </Dialog>

      <Box sx={{ mb: 3, mt: 5 }}>
        <Grid item xs={12} container justifyContent="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="subtitle2">Welcome, Matthew</Typography>
            <Typography variant="h3">What would you like to cook today?</Typography>
          </Grid>
          <Grid xs="auto">
            <Avatar sx={{ bgcolor: '#fb6b1c' }}>M</Avatar>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ mb: 3 }}>
        <TextField
          id="input-with-icon-adornment"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
        />
        <IconButton onClick={handleAdvancedFiltersClick}>
          <AlarmIcon />
        </IconButton>
      </Box>

      <Section title="Categories">
        {categories.map((category) => (
          <CategoryChip category={category} onClick={handleCategoryClick} />
        ))}
      </Section>

      {recommendedRecipes.length > 0 && (
        <Section title="Recommendations">{recommendedRecipes.map((recipe) => renderRecipeTile(recipe))}</Section>
      )}

      {favouriteRecipes.length > 0 && (
        <Section title="Favourite Recipes">{favouriteRecipes.map((recipe) => renderRecipeTile(recipe))}</Section>
      )}

      {recentlyViewedRecipes.length > 0 && (
        <Section title="Recently Viewed">{recentlyViewedRecipes.map((recipe) => renderRecipeTile(recipe))}</Section>
      )}
    </Container>
  );
};
