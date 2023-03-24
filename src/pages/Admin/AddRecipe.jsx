import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CssBaseline,
  Container,
  Box,
  TextField,
  Button,
  FormControl,
  Select,
  InputLabel,
  Grid,
  MenuItem,
  Typography,
  Stack,
  Autocomplete,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useInput from '../../hooks/useInput';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import FilterOption from '../../components/FilterOption';
import { isUndefined, isEmptyOrWhiteSpace } from '../../utils/utils';
import { UnitOfMeasurementContext } from '../../contexts/UnitOfMeasurementContext';
import { TagContext } from '../../contexts/TagContext';

const RecipeIngredient = ({ recipeIngredient }) => {
  const { unitOfMeasurements } = useContext(UnitOfMeasurementContext);

  const [unitOfMeasurement, setUnitOfMeasurements] = useState();

  return (
    <div>
      <Stack direction="row" spacing={1}>
        <FormControl>
          <TextField
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={recipeIngredient.ingredient.name}
            disabled
          />
        </FormControl>

        <FormControl sx={{ pt: 2 }} width="auto">
          <InputLabel id="type-label">Type</InputLabel>
          <Select labelId="type-label" id="type" value={unitOfMeasurement} label="Type">
            {unitOfMeasurements.map((value) => (
              <MenuItem value={value.id}>{value.name}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <TextField
            margin="normal"
            required
            id="amount"
            label="Amount"
            name="amount"
            autoFocus
            // value={name}
            // onChange={onNameChange}
            // error={!isUndefined(inputErrors.name)}
            // helperText={inputErrors.name}
          />
        </FormControl>
      </Stack>
    </div>
  );
};

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    ingredient: PropTypes.shape({
      name: PropTypes.string,
    }),
  }).isRequired,
};

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];

  const { unitOfMeasurements, setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);
  const { tags, setTags } = useContext(TagContext);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);

  const { value: name, onChange: onNameChange } = useInput('');
  const { value: description, onChange: onDescriptionChange } = useInput('');
  const [type, setType] = useState();
  const [prepTime, setPrepTime] = useState();
  const [cookingTime, setCookingTime] = useState();
  const [totalTime, setTotalTime] = useState();
  const [recipeIngredients, setRecipeIngredients] = useState([]);
  const [instructions, setInstructions] = useState([]);

  const [inputErrors, setInputErrors] = useState({
    name: undefined,
    description: undefined,
    type: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      name: undefined,
      description: undefined,
      type: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      name: (() => {
        if (isEmptyOrWhiteSpace(name)) {
          return 'Name is required';
        }

        return undefined;
      })(),
      description: (() => {
        if (isEmptyOrWhiteSpace(description)) {
          return 'Description is required';
        }

        return undefined;
      })(),
      type: (() => {
        if (isUndefined(type)) {
          return 'Type is required';
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return isUndefined(newInputErrors.name) && isUndefined(newInputErrors.description);
  };

  const handleCreateClick = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      // await auth.login(email, password);
      // onComplete();
    } catch (e) {
      if (!isUndefined(e.response) && e.response.status === 400) {
        setErrorMessage('invalid login');
      } else {
        // presentAlert({
        //   header: 'Alert',
        //   subHeader: 'Something went wrong',
        //   message: 'Please try again later',
        //   buttons: ['OK'],
        // });
      }
    }
  };

  const handleTypeChange = (value) => {
    setType(value);
  };

  const handleAddIngredient = (ingredient) => {
    const recipeIngredient = {
      ingredient,
      unitOfMeasurement: undefined,
      amount: undefined,
      optional: false,
    };

    const newRecipeIngredients = recipeIngredients;
    newRecipeIngredients.push(recipeIngredient);
    setRecipeIngredients(newRecipeIngredients);
  };

  const handleAddIntructionClick = () => {
    const newInstructions = instructions.slice();
    newInstructions.push('');
    setInstructions(newInstructions);
  };

  const fetchUnitOfMeasurements = async () => {
    try {
      const { data } = await api.getUnitOfMeasurements();
      setUnitOfMeasurements(data.results);
    } catch {
      console.log('error fetching unit of measurements');
    }
  };

  const fetchTags = async () => {
    try {
      const { data } = await api.getTags();
      setTags(data.results);
    } catch {
      console.log('error fetching tags');
    }
  };

  useEffect(() => {
    fetchUnitOfMeasurements();
    fetchTags();
  }, []);

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
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Add Recipe" onBackClick={() => navigate(-1)} />

      {/* <Box>
        <FormControlLabel label="Add Multiple" control={<Checkbox defaultChecked />} />
      </Box> */}

      <Box>
        <FormControl fullWidth>
          <TextField
            margin="normal"
            required
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={name}
            onChange={onNameChange}
            error={!isUndefined(inputErrors.name)}
            helperText={inputErrors.name}
          />
        </FormControl>

        <FormControl fullWidth>
          <TextField
            multiline
            rows={2}
            margin="normal"
            required
            name="description"
            label="description"
            id="description"
            value={description}
            onChange={onDescriptionChange}
            error={!isUndefined(inputErrors.description)}
            helperText={inputErrors.description}
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
          <InputLabel id="type-label">Type</InputLabel>
          <Select labelId="type-label" id="type" value={type} label="Type" onChange={handleTypeChange}>
            {types.map((t) => (
              <MenuItem value={t}>{t}</MenuItem>
            ))}
          </Select>
        </FormControl>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                id="prep-time"
                label="Prep Time"
                name="prep-time"
                type="number"
                autoFocus
                value={prepTime}
                onChange={(e) => setPrepTime(e.target.value)}
                error={!isUndefined(inputErrors.prepTime)}
                helperText={inputErrors.prepTime}
              />
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                id="cooking-time"
                label="Cooking Time"
                name="cooking-time"
                type="number"
                autoFocus
                value={cookingTime}
                onChange={(e) => setCookingTime(e.target.value)}
                error={!isUndefined(inputErrors.cookingTime)}
                helperText={inputErrors.cookingTime}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                id="total-time"
                label="Total Time"
                name="total-time"
                type="number"
                autoFocus
                value={totalTime}
                onChange={(e) => setTotalTime(e.target.value)}
                error={!isUndefined(inputErrors.totalTime)}
                helperText={inputErrors.totalTime}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <TextField
                margin="normal"
                required
                id="servings"
                label="Servings"
                name="servings"
                type="number"
                autoFocus
                value={name}
                onChange={onNameChange}
                error={!isUndefined(inputErrors.name)}
                helperText={inputErrors.name}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="h6">Ingredients</Typography>

          <Autocomplete
            options={searchIngredients
              .filter(
                (ingredient) =>
                  !recipeIngredients.some((filteredIngredients) => filteredIngredients.id === ingredient.id)
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

          <Box sx={{ mt: 2 }}>
            {recipeIngredients.map((recipeIngredient) => (
              <RecipeIngredient recipeIngredient={recipeIngredient} />
            ))}
          </Box>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="h6">Tags</Typography>

          <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <FilterOption
                label={tag.name}
                value={tag.id}
                // onClick={handleTagClick}
                // active={filters.tagIds.some((x) => x === tag.id)}
              />
            ))}
          </Stack>
        </Box>

        <Box sx={{ mt: 2, mb: 3 }}>
          <Typography variant="h6">Instructions</Typography>

          {instructions.map((instruction) => (
            <FormControl fullWidth>
              <TextField
                multiline
                rows={2}
                margin="normal"
                required
                name="instruction"
                label="instruction"
                id="instruction"
                value={instruction}
              />
            </FormControl>
          ))}

          <Button type="button" onClick={handleAddIntructionClick} variant="contained">
            Add Instruction
          </Button>
        </Box>

        <Box sx={{ mt: 1 }}>
          <Typography variant="h6">Tags</Typography>

          <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
            {tags.map((tag) => (
              <FilterOption
                label={tag.name}
                value={tag.id}
                // onClick={handleTagClick}
                // active={filters.tagIds.some((x) => x === tag.id)}
              />
            ))}
          </Stack>
        </Box>

        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Button type="button" onClick={handleCreateClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Create
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
