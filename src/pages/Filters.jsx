import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import FilterOption from 'components/FilterOption';
import Header from 'components/Header';
import RatingFilter from 'components/RatingFilter';
import useAPI from 'hooks/useAPI';
import useFilters from 'hooks/useFilters';
import useTags from 'hooks/useTags';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { RecipeDifficulty, RecipeTypes } from 'types';
import { lowercaseFirstLetter } from 'utils/stringUtils';
import { isUndefined } from 'utils/utils';

const Filters = ({ filters: originalFilters, onApply, onClose }) => {
  const { t } = useTranslation();
  const api = useAPI();

  const { tags } = useTags();

  const { filters, setFilter } = useFilters({
    ingredientIds: [],
    rating: undefined,
    time: undefined,
    types: [],
    difficulties: [],
    tagIds: [],
    ...originalFilters,
  });
  const [ingredients, setIngredients] = useState([]);
  const [searchIngredients, setSearchIngredients] = useState([]);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [selectedTime, setSelectedTime] = useState();

  console.log(filters)
  
  const typeOptions = Object.entries(RecipeTypes).map(( [k, v] ) => ({
    label: t(`types.recipe.types.${lowercaseFirstLetter(k)}.name`),
    value: v
  }));

  const difficultyOptions = Object.entries(RecipeDifficulty).map(( [k, v] ) => ({
    label: t(`types.recipe.difficulty.${lowercaseFirstLetter(k)}`),
    value: v
  }));

  const timeOptions = [
    {
      label: t('types.recipe.times.fast'),
      minTotalTime: undefined,
      maxTotalTime: 15,
    },
    {
      label: t('types.recipe.times.medium'),
      minTotalTime: 15,
      maxTotalTime: 45,
    },
    {
      label: t('types.recipe.times.slow'),
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

  const handleDifficultyClick = (difficulty) => {
    const newDifficulties = filters.difficulties.filter((x) => x !== difficulty);

    if (!filters.difficulties.some((x) => x === difficulty)) {
      newDifficulties.push(difficulty);
    }

    setFilter('difficulties', newDifficulties);
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
    <Container component="main" maxWidth="lg" sx={{ mb: 10 }}>
      <Header title={t('components.recipeFilters.title')} onBackClick={onClose} />

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{t('components.recipeFilters.filters.type')}</Typography>

        <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {typeOptions.map((type) => (
            <FilterOption
              label={type.label}
              value={type.value}
              onClick={handleTypeClick}
              active={filters.types.some((x) => x === type.value)}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{t('components.recipeFilters.filters.difficulty')}</Typography>

        <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
          {difficultyOptions.map((difficulty) => (
            <FilterOption
              label={difficulty.label}
              value={difficulty.value}
              onClick={handleDifficultyClick}
              active={filters.difficulties.some((x) => x === difficulty.value)}
            />
          ))}
        </Stack>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="h6">{t('components.recipeFilters.filters.time')}</Typography>

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
        <Typography variant="h6">{t('components.recipeFilters.filters.tag')}</Typography>

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
        <Typography variant="h6">{t('components.recipeFilters.filters.ingredient')}</Typography>

        <Autocomplete
          options={searchIngredients
            .filter(
              (ingredient) => !ingredients.some((filteredIngredients) => filteredIngredients.id === ingredient.id)
            )
            .map((ingredient) => ({ label: ingredient.name, ingredient }))}
          // eslint-disable-next-line react/jsx-props-no-spreading
          renderInput={(params) => <TextField {...params} label={t('components.recipeFilters.inputs.addIngredient.label')} />}
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
        <Typography variant="h6">{t('components.recipeFilters.filters.rating')}</Typography>

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
        {t('components.recipeFilters.buttons.submit.label')}
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
