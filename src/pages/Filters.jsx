import React, { useState, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline,
  Container,
  Typography,
  Button,
  TextField,
  Autocomplete,
  Chip,
  Box,
  Grid,
  Stack,
} from '@mui/material';
import useFilters from '../hooks/useFilters';
import RatingFilter from '../components/RatingFilter';
import FilterOption from '../components/FilterOption';
import { TagContext } from '../contexts/TagContext';
import useAPI from '../hooks/useAPI';
import { isUndefined } from '../utils/utils';
import Header from '../components/Header';

const Filters = ({ filters: originalFilters, onApply, onClose }) => {
  const api = useAPI();

  const { tags } = useContext(TagContext);

  const { filters, setFilter } = useFilters({
    ingredientIds: [],
    rating: undefined,
    time: undefined,
    types: [],
    tagIds: [],
    ...originalFilters,
  });
  const [ingredients, setIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [selectedTime, setSelectedTime] = useState();

  const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];
  const timeOptions = [
    {
      label: 'Fast',
      minTotalTime: undefined,
      maxTotalTime: 15,
    },
    {
      label: 'Medium',
      minTotalTime: 15,
      maxTotalTime: 45,
    },
    {
      label: 'Slow',
      minTotalTime: 45,
      maxTotalTime: undefined,
    },
  ];

  const removeIngredient = (id) => {
    const ingredientIds = filters.ingredientIds.filter((x) => x !== id);
    setFilter('ingredientIds', ingredientIds);

    const newIngredients = ingredients.filter((x) => x.id !== id);
    setIngredients(newIngredients);
  };

  const handleTypeClick = (type) => {
    const newTypes = filters.types.filter((x) => x !== type);

    if (!filters.types.some((x) => x === type)) {
      newTypes.push(type);
    }

    setFilter('types', newTypes);
  };

  const handleTimeClick = (time) => {
    const selectedTimeOption = timeOptions.find((x) => x.label === time);
    const newTime = selectedTime !== selectedTimeOption.label ? selectedTimeOption.label : undefined;
    setSelectedTime(newTime);

    let newMinTotalTime;
    let newMaxTotalTime;

    if (!isUndefined(newTime)) {
      newMinTotalTime = selectedTimeOption.minTotalTime;
      newMaxTotalTime = selectedTimeOption.maxTotalTime;
    }

    setFilter('minTotalTime', newMinTotalTime);
    setFilter('maxTotalTime', newMaxTotalTime);
  };

  const handleTagClick = (tagId) => {
    const newTagIds = filters.tagIds.filter((x) => x !== tagId);

    if (!filters.tagIds.some((x) => x === tagId)) {
      newTagIds.push(tagId);
    }

    setFilter('tagIds', newTagIds);
  };

  const handleRatingClick = (rating) => {
    const newRating = filters.rating !== rating ? rating : undefined;
    setFilter('rating', newRating);
  };

  const handleAddIngredient = (ingredient) => {
    setIngredients([...ingredients, ingredient]);
    setFilter('ingredientIds', [...filters.ingredientIds, ingredient.id]);
  };

  const handleApplyClick = () => {
    onApply(filters);
  };

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      const {
        data: { results },
      } = await api.getIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });
      setSearchIngredients(results);
    }, 3000);

    return () => clearTimeout(delayDebounce);
  }, [ingredientSearch]);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />

      <Header title="Filters" onBackClick={onClose} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Type</Typography>

        <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {types.map((type) => (
            <FilterOption
              label={type}
              value={type}
              onClick={handleTypeClick}
              active={filters.types.some((x) => x === type)}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Time</Typography>

        <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {timeOptions.map((timeOption) => (
            <FilterOption
              label={timeOption.label}
              value={timeOption.label}
              onClick={handleTimeClick}
              active={selectedTime === timeOption.label}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Tags</Typography>

        <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {tags.map((tag) => (
            <FilterOption
              label={tag.name}
              value={tag.id}
              onClick={handleTagClick}
              active={filters.tagIds.some((x) => x === tag.id)}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">Ingredients</Typography>

        <Autocomplete
          options={searchIngredients
            .filter(
              (ingredient) => !ingredients.some((filteredIngredients) => filteredIngredients.id === ingredient.id)
            )
            .map((ingredient) => ({ label: ingredient.name, ingredient }))}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label="Add Ingredient" />}
          value={ingredientSearch}
          inputValue={ingredientSearch}
          onInputChange={(event, newValue) => {
            setIngredientSearch(newValue);
          }}
          onChange={(event, value) => {
            setIngredientSearch('');
            handleAddIngredient(value.ingredient);
          }}
        />

        <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {filters.ingredientIds.map((ingredientId) => {
            const ingredient = ingredients.find((x) => x.id === ingredientId);

            return <Chip label={ingredient.name} onDelete={() => removeIngredient(ingredient.id)} />;
          })}
        </Stack>
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
  // eslint-disable-next-line react/forbid-prop-types
  filters: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

Filters.defaultProps = {
  filters: {},
};

export default Filters;
