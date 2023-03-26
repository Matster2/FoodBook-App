import React, { useContext, useEffect, useState } from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
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
  IconButton,
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import FilterOption from '../../components/FilterOption';
import RecipeImageControl from '../../components/RecipeImageControl';
import { UnitOfMeasurementContext } from '../../contexts/UnitOfMeasurementContext';
import { TagContext } from '../../contexts/TagContext';

const RecipeIngredient = ({ recipeIngredient, onChange, onDelete }) => {
  const { unitOfMeasurements } = useContext(UnitOfMeasurementContext);

  const handleChange = (e) => {
    onChange({
      ...recipeIngredient,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.500', p: 2 }}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={9} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            required
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={recipeIngredient.ingredient.name}
            disabled
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={() => onDelete(recipeIngredient)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              margin="normal"
              id="id"
              name="unitOfMeasurementId"
              labelId="type-label"
              label="Type"
              onChange={handleChange}
            >
              {unitOfMeasurements.map((unitOfMeasurement) => (
                <MenuItem value={unitOfMeasurement.id}>{unitOfMeasurement.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            id="amount"
            label="Amount"
            name="amount"
            autoFocus
            value={recipeIngredient.amount}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    ingredient: PropTypes.shape({
      name: PropTypes.string,
    }),
    unitOfMeasurementId: PropTypes.string,
    amount: PropTypes.number,
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipeIngredient.defaultProps = {
  onChange: () => {},
  onDelete: () => {},
};

const initialRecipeValue = {
  name: '',
  description: '',
  type: undefined,
  prepTime: undefined,
  cookTime: undefined,
  totalTime: undefined,
  servings: undefined,
  instructions: [],
  ingredients: [],
  nutrition: {
    kcals: undefined,
    fats: undefined,
    saturates: undefined,
    carbs: undefined,
    sugars: undefined,
    fiber: undefined,
    protien: undefined,
    salt: undefined,
  },
  tagIds: [],
  images: [],
};

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];

  const { unitOfMeasurements, setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);
  const { tags, setTags } = useContext(TagContext);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);

  const [recipe, setRecipe] = useState(initialRecipeValue);

  const recipeSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    type: yup.string().required(),
    prepTime: yup.number().integer().required(),
    cookTime: yup.number().integer().required(),
    totalTime: yup.number().integer().required(),
    servings: yup.number().integer().required(),
    nutrition: yup.object({
      kcals: yup.number().integer().required(),
      fats: yup.number().integer(),
      saturates: yup.number().integer(),
      carbs: yup.number().integer(),
      sugars: yup.number().integer(),
      fiber: yup.number().integer(),
      protien: yup.number().integer(),
      salt: yup.number().integer(),
    }),
    instructions: yup.array(yup.string()),
  });

  const handleAddIngredient = (ingredient) => {
    const recipeIngredient = {
      ingredient,
      unitOfMeasurementId: undefined,
      amount: undefined,
      optional: false,
    };

    const newRecipeIngredients = recipe.ingredients.slice();
    newRecipeIngredients.push(recipeIngredient);

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleTagClick = (tagId) => {
    const newTagIds = recipe.tagIds.filter((x) => x !== tagId);

    if (!recipe.tagIds.some((x) => x === tagId)) {
      newTagIds.push(tagId);
    }

    setRecipe((state) => ({
      ...state,
      tagIds: newTagIds,
    }));
  };

  const handleUploadFile = (e) => {
    const newImages = recipe.images;
    const url = URL.createObjectURL(e.target.files[0]);
    newImages.push(url);

    setRecipe((state) => ({
      ...state,
      images: newImages,
    }));
  };

  const handleSubmit = async (values) => {
    console.log(recipe.ingredients);

    const data = {
      ...recipe,
      ...values,
      tagIds: recipe.tagIds,
      ingredients: recipe.ingredients.map((recipeIngredient) => ({
        ingredientId: recipeIngredient.ingredient.id,
        unitOfMeasurementId: recipeIngredient.unitOfMeasurementId,
        amount: recipeIngredient.amount,
        optional: recipeIngredient.optional,
      })),
    };

    console.log(data);
  };

  const handleRecipeIngredientChange = (newRecipeIngredient) => {
    const newRecipeIngredients = recipe.ingredients;

    const index = newRecipeIngredients.findIndex((x) => x.ingredient.id === newRecipeIngredient.ingredient.id);

    newRecipeIngredients[index] = newRecipeIngredient;

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleDeleteRecipeIngredient = (newRecipeIngredient) => {
    const newRecipeIngredients = recipe.ingredients.filter(
      (x) => x.ingredient.id !== newRecipeIngredient.ingredient.id
    );

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleDeleteImageClick = (src) => {
    const images = recipe.images.filter((x) => x !== src);

    setRecipe((state) => ({
      ...state,
      images,
    }));
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

      <Stack direction="row" gap={2} sx={{ mb: 2 }}>
        {recipe.images.map((image) => (
          <RecipeImageControl src={image} onDeleteClick={handleDeleteImageClick} />
        ))}
      </Stack>

      <input type="file" onChange={handleUploadFile} />

      <Formik
        initialValues={recipe}
        validationSchema={recipeSchema}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
        }}
      >
        {(formik) => {
          const { errors, touched, values } = formik;
          return (
            <Form>
              <Box fullWidth>
                <Field
                  as={TextField}
                  required
                  fullWidth
                  margin="normal"
                  id="name"
                  name="name"
                  label="Name"
                  autoFocus
                  error={errors.name && touched.name}
                  helperText={touched.name && errors.name}
                />

                <Field
                  as={TextField}
                  required
                  fullWidth
                  margin="normal"
                  id="description"
                  name="description"
                  multiline
                  rows={2}
                  label="description"
                  error={errors.description && touched.description}
                  helperText={touched.description && errors.description}
                />

                <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
                  <InputLabel id="type-label">Type</InputLabel>
                  <Field as={Select} margin="normal" id="id" name="type" labelId="type-label" label="Type">
                    {types.map((t) => (
                      <MenuItem value={t}>{t}</MenuItem>
                    ))}
                  </Field>
                </FormControl>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      id="prepTime"
                      name="prepTime"
                      required
                      label="Prep Time"
                      type="number"
                      autoFocus
                      error={errors.prepTime && touched.prepTime}
                      helperText={touched.description && errors.description}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      id="cookTime"
                      name="cookTime"
                      required
                      label="Cooking Time"
                      type="number"
                      autoFocus
                      // error={!isUndefined(errors.cookTime)}
                      // helperText={errors.cookTime?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      id="totalTime"
                      name="totalTime"
                      required
                      label="Total Time"
                      type="number"
                      autoFocus
                      // error={!isUndefined(errors.totalTime)}
                      // helperText={errors.totalTime?.message}
                    />
                  </Grid>
                </Grid>

                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Field
                      as={TextField}
                      margin="normal"
                      id="servings"
                      name="servings"
                      required
                      label="Servings"
                      type="number"
                      autoFocus
                      // error={!isUndefined(errors.servings)}
                      // helperText={errors.servings?.message}
                    />
                  </Grid>
                </Grid>

                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography variant="h6">Ingredients</Typography>

                  <Autocomplete
                    options={searchIngredients
                      .filter(
                        (ingredient) =>
                          !recipe.ingredients.some(
                            (recipeIngredient) => recipeIngredient.ingredient.id === ingredient.id
                          )
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
                    {recipe.ingredients.map((recipeIngredient) => (
                      <RecipeIngredient
                        recipeIngredient={recipeIngredient}
                        onChange={handleRecipeIngredientChange}
                        onDelete={handleDeleteRecipeIngredient}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 2, mb: 3 }}>
                  <Typography variant="h6">Instructions</Typography>

                  <FieldArray
                    name="instructions"
                    render={(arrayHelpers) => (
                      <div>
                        {values.instructions.map((_, index) => (
                          <Stack direction="row" gap={1}>
                            <Field
                              as={TextField}
                              margin="normal"
                              fullWidth
                              multiline
                              rows={2}
                              required
                              name={`instructions.${index}`}
                              label="instruction"
                              id="instruction"
                            />

                            <IconButton onClick={() => arrayHelpers.remove(index)}>
                              <ClearIcon />
                            </IconButton>
                          </Stack>
                        ))}
                        <Button type="button" onClick={() => arrayHelpers.push('')} variant="contained">
                          Add Instruction
                        </Button>
                      </div>
                    )}
                  />
                </Box>

                <Box sx={{ mt: 2 }}>
                  <Typography variant="h6">Nutriton</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        id="kcals"
                        name="nutrition.kcals"
                        value={recipe.nutrition.kcals}
                        required
                        label="kcals"
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        id="sugars"
                        name="nutrition.sugars"
                        value={recipe.nutrition.sugars}
                        label="sugars"
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        id="fats"
                        name="nutrition.fats"
                        value={recipe.nutrition.fats}
                        label="fats"
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        id="saturates"
                        name="nutrition.saturates"
                        value={recipe.nutrition.saturates}
                        label="saturates"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Field
                        as={TextField}
                        margin="normal"
                        id="carbs"
                        name="nutrition.carbs"
                        value={recipe.nutrition.carbs}
                        label="carbs"
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        id="fiber"
                        name="nutrition.fiber"
                        value={recipe.nutrition.fiber}
                        label="fiber"
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        id="protien"
                        name="nutrition.protien"
                        value={recipe.nutrition.protien}
                        label="protien"
                      />
                      <Field
                        as={TextField}
                        margin="normal"
                        id="salt"
                        name="nutrition.salt"
                        value={recipe.nutrition.salt}
                        label="salt"
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography variant="h6">Tags</Typography>

                  <Stack direction="row" alignItems="center" gap={2} sx={{ flexWrap: 'wrap', gap: 1 }}>
                    {tags.map((tag) => (
                      <FilterOption
                        label={tag.name}
                        value={tag.id}
                        onClick={handleTagClick}
                        active={recipe.tagIds.some((x) => x === tag.id)}
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
                  <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                    Create
                  </Button>
                </Box>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
