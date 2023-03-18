import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container, Typography, Button, TextField, Autocomplete, Chip, Box, Grid } from '@mui/material';
import useFilters from '../hooks/useFilters';
import RatingFilter from '../components/RatingFilter';
import useAPI from '../hooks/useAPI';

const Filters = ({ onApply }) => {
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    ingredientIds: [],
    rating: undefined,
  });
  const [ingredients, setIngredients] = useState([]);

  const [ingredientSearch, setIngredientSearch] = useState('');

  const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const times = ['Fast', 'Medium', 'Long'];

  const removeIngredient = (id) => {
    const ingredientIds = filters.ingredientIds.filters((x) => x !== id);
    setFilter('ingredientIds', ingredientIds);

    const newIngredients = ingredients.filter((x) => x.id !== id);
    setIngredients(newIngredients);
  };

  const handleRatingClick = (rating) => {
    const newRating = filters.rating !== rating ? rating : undefined;
    setFilter('rating', newRating);
  };

  const handleApplyClick = () => {
    onApply();
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const {
        data: { results },
      } = await api.getIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });
      setIngredients(results);
    }, 3000);

    return () => clearTimeout(delayDebounce);
  }, [ingredientSearch]);

  return (
    <Container component="main" maxWidth="lg" sx={{ pt: 5 }}>
      <CssBaseline />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Type</Typography>
        {types.map((type) => (
          <Button variant="text">{type}</Button>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Time</Typography>
        {times.map((time) => (
          <Button variant="text">{time}</Button>
        ))}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Ingredients</Typography>

        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={ingredients.map((ingredient) => ({ label: ingredient.name, id: ingredient.id }))}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Add Ingredient" />}
          inputValue={ingredientSearch}
          onInputChange={(event, newValue) => {
            setIngredientSearch(newValue);
          }}
        />

        {filters.ingredientIds.map((ingredientId) => {
          const ingredient = ingredients.find((x) => x.id === ingredientId);

          return <Chip label={ingredient.name} onDelete={() => removeIngredient(ingredient.id)} />;
        })}
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Rating</Typography>

        {/* <Stack direction="reverse-row" alignItems="center" gap={2}>
          {Array.from(Array(5).keys())
            .reverse()
            .map((value) => {
              const rating = value + 1;
              return <RatingFilter rating={rating} onClick={handleRatingClick} selected={filters.rating === rating} />;
            })}
        </Stack> */}

        <Grid container justifyContent="space-between" sx={{ mb: 1 }} spacing={2}>
          {Array.from(Array(4).keys())
            .reverse()
            .map((value) => {
              const rating = value + 2;
              return (
                <Grid item xs={3}>
                  <RatingFilter rating={rating} onClick={handleRatingClick} selected={filters.rating === rating} />
                </Grid>
              );
            })}
        </Grid>
      </Box>

      <Button fullWidth variant="contained" onClick={handleApplyClick}>
        Apply Filters
      </Button>
    </Container>
  );
};

Filters.propTypes = {
  onApply: PropTypes.func.isRequired,
};

Filters.defaultProps = {};

export default Filters;
