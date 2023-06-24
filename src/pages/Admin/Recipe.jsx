import React, { useRef, useContext, useEffect, useState } from 'react';
import uuid from 'react-uuid';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik, Form, Field } from 'formik';
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
  List,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import { Clear as ClearIcon, HorizontalRule } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import FilterOption from '../../components/FilterOption';
import RecipeImageControl from '../../components/RecipeImageControl';
import { UnitOfMeasurementContext } from '../../contexts/UnitOfMeasurementContext';
import { TagContext } from '../../contexts/TagContext';
import { isUndefined } from '../../utils/utils';

const recipeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  prepTime: yup.number().integer().required(),
  cookTime: yup.number().integer().required(),
  totalTime: yup.number().integer().required(),
  servings: yup.number().integer().required(),
  containsAlcohol: yup.bool().required(),
  nutrition: yup.object({
    calories: yup.number().integer().required(),
    sugar: yup.number().integer(),
    fat: yup.number().integer(),
    saturatedFat: yup.number().integer(),
    sodium: yup.number().integer(),
    protein: yup.number().integer(),
    carbohydrates: yup.number().integer(),
    fiber: yup.number().integer(),
  }),
  steps: yup.array(yup.object({
    name: yup.string(),
    instructions: yup.array(yup.object({
      instruction: yup.string().required(),
    }))
  })),
});

const initialRecipeValue = {
  name: '',
  description: '',
  type: undefined,
  prepTime: undefined,
  cookTime: undefined,
  totalTime: undefined,
  servings: undefined,
  containsAlcohol: false,
  steps: [
    {
      id: uuid(),
      name: "",
      instructions: []
    }
  ],
  ingredients: [],
  referenceUrl: '',
  nutrition: {
    calories: undefined,
    sugar: undefined,
    fat: undefined,
    saturatedFat: undefined,
    sodium: undefined,
    protein: undefined,
    carbohydrates: undefined,
    fiber: undefined,
  },
  tags: [],
  images: [],
};


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
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              id="id"
              name="unitOfMeasurementId"
              labelId="type-label"
              label="Type"
              onChange={handleChange}
              value={`${recipeIngredient.unitOfMeasurementId}`}
            >
              {unitOfMeasurements.map((unitOfMeasurement) => (
                <MenuItem key={unitOfMeasurement.id} value={unitOfMeasurement.id}>{unitOfMeasurement.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
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
  onChange: () => { },
  onDelete: () => { },
};


const RecipeStep = ({ step, onChange, onDelete }) => {
  const handleChange = (e) => {
    onChange({
      ...step,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddInstructionClick = () => {
    const newInstructions = [...step.instructions];
    newInstructions.push({
      id: uuid(),
      instruction: ""
    })

    onChange({
      ...step,
      instructions: newInstructions
    });
  };

  const handleInstructionChange = (id, value) => {
    const newInstructions = [...step.instructions];

    const index = newInstructions.findIndex((x) => x.id === id);

    newInstructions[index].instruction = value;

    onChange({
      ...step,
      instructions: newInstructions
    });
  }

  return (
    <Box sx={{ border: 1, borderColor: 'grey.500', p: 2 }}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={9} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={step.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={() => onDelete(step)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>

      {step.instructions.map((instruction) => (
        <Stack direction="row" gap={1}>
          <Field
            as={TextField}
            margin="normal"
            fullWidth
            multiline
            rows={2}
            required
            value={instruction.instruction}
            onChange={(e) => handleInstructionChange(instruction.id, e.target.value)}
            label="instruction"
            id="instruction"
          />

          <IconButton>
            <ClearIcon />
          </IconButton>
        </Stack>
      ))}

      <Button type="button" onClick={handleAddInstructionClick} variant="contained">
        Add Instruction
      </Button>
    </Box>
  );
};

RecipeStep.propTypes = {
  step: PropTypes.shape({
    name: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.shape({
      instruction: PropTypes.string
    })),
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipeStep.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

export default () => {
  const formRef = useRef();

  const navigate = useNavigate();
  const api = useAPI();

  const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack', 'Drink'];

  const { setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);
  const { tags, setTags } = useContext(TagContext);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);

  const [authorSearch, setAuthorSearch] = useState('');
  const [searchAuthors, setSearchAuthors] = useState([]);

  const [filesToUpload, setFilesToUpload] = useState([]);

  const [recipe, setRecipe] = useState(initialRecipeValue);


  const handleSetAuthor = (author) => {
    setRecipe({
      ...recipe,
      author: author
    })
  }

  const handleRemoveAuthorClick = () => {
    setRecipe({
      ...recipe,
      author: undefined
    })
  }

  const handleAddIngredient = (ingredient) => {
    const recipeIngredient = {
      ingredient,
      unitOfMeasurementId: ingredient.defaultUnitOfMeasurement.id,
      amount: undefined,
      optional: false,
    };

    const newRecipeIngredients = recipe.ingredients.slice();
    newRecipeIngredients.push(recipeIngredient);

    console.log(newRecipeIngredients)

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleTagClick = (tagId) => {
    const newTags = recipe.tags.filter((x) => x.id !== tagId);

    if (!recipe.tags.some((x) => x.id === tagId)) {
      newTags.push({
        id: tagId,
      });
    }

    setRecipe((state) => ({
      ...state,
      tags: newTags,
    }));
  };

  const handleUploadFile = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setRecipe((state) => ({
      ...state,
      images: [...recipe.images, url],
    }));
    setFilesToUpload((state) => [...state, file]);
  };

  const handleSubmit = async (values) => {
    const data = {
      ...recipe,
      ...values,
      languageCode: "en",
      tags: recipe.tags,
      ingredients: recipe.ingredients.map((recipeIngredient) => ({
        ingredientId: recipeIngredient.ingredient.id,
        unitOfMeasurementId: recipeIngredient.unitOfMeasurementId,
        amount: recipeIngredient.amount,
        optional: recipeIngredient.optional,
      })),
      authorId: recipe?.author?.id,
      steps: recipe.steps.map((step) => ({
        name: step.name,
        instructions: step.instructions.map(instruction => ({
          instruction: instruction.instruction
        }))
      }))
    }

    try {
      const {
        data: { id },
      } = await api.createRecipe(data);

      filesToUpload.forEach(async (file) => {
        await api.uploadRecipeImage(id, file);
      });

      toast.success('Recipe successfully created');
      formRef.current?.resetForm();
    } catch (e) {
      toast.error('Unable to create recipe');
    }
  }


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

  const handleAddStepClick = () => {
    const newSteps = recipe.steps;

    newSteps.push({
      id: uuid(),
      name: "",
      instructions: []
    })

    setRecipe((state) => ({
      ...state,
      steps: newSteps,
    }));
  }

  const handleStepChange = (newStep) => {
    const newSteps = recipe.steps;

    const index = newSteps.findIndex((x) => x.id === newStep.id);

    newSteps[index] = newStep;

    setRecipe((state) => ({
      ...state,
      steps: newSteps,
    }));
  };

  const handleDeleteStep = (newStep) => {
    const newSteps = recipe.steps.filter(
      (x) => x.id !== newStep.id
    );

    setRecipe((state) => ({
      ...state,
      steps: newSteps,
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
      const { data } = await api.getUnitOfMeasurements({ sortBy: 'name' });
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
      } = await api.getAuthors({ search: authorSearch, pageSize: 50, sortBy: 'name' });
      setSearchAuthors(results);
    }, 3000);

    return () => clearTimeout(delayDebounce);
  }, [authorSearch]);

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

      <Box sx={{ mb: 1 }}>
        <Typography variant="body2">{recipe.images.length} {recipe.images.length === 1 ? "Image" : "Images"}</Typography>

        <List sx={{ overflow: "auto" }}>
          <Stack direction="row" gap={2} alignItems="center" >
            {recipe.images.map((image) => (
              <RecipeImageControl src={image} onDeleteClick={handleDeleteImageClick} />
            ))}
          </Stack>
        </List>

        <input type="file" onChange={handleUploadFile} />
      </Box>

      <Formik
        innerRef={formRef}
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
              <Box>
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
                  <Field as={Select} id="id" name="type" labelId="type-label" label="Type" defaultValue=''>
                    {types.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </Field>
                </FormControl>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} md={3} lg={2}>
                    <Field
                      as={TextField}
                      fullWidth
                      id="prepTime"
                      name="prepTime"
                      required
                      label="Prep Time"
                      type="number"
                      autoFocus
                      error={errors.prepTime && touched.prepTime}
                      helperText={touched.prepTime && errors.prepTime}
                    />
                  </Grid>

                  <Grid item xs={6} md={3} lg={2}>
                    <Field
                      as={TextField}
                      fullWidth
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

                  <Grid item xs={6} md={3} lg={2}>
                    <Field
                      as={TextField}
                      fullWidth
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

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} md={3} lg={2}>
                    <Field
                      as={TextField}
                      fullWidth
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

                <Box sx={{ mt: 2 }}>
                  <Field
                    type="checkbox"
                    name="containsAlcohol"
                    as={FormControlLabel}
                    control={<Checkbox />}
                    label="Contains Alcohol"
                  />
                </Box>

                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography variant="h6">Author</Typography>

                  {!isUndefined(recipe.author) && (
                    <Box>
                      <Stack direction="row" justifyContent="space-between">
                        <Typography>{recipe.author.name}</Typography>

                        <IconButton onClick={handleRemoveAuthorClick}>
                          <ClearIcon />
                        </IconButton>
                      </Stack>
                    </Box>
                  )}

                  {isUndefined(recipe.author) && (
                    <Autocomplete
                      options={searchAuthors.map((author) => ({ label: author.name, author }))}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      renderInput={(params) => <TextField {...params} label="Author" />}
                      value={authorSearch}
                      inputValue={authorSearch}
                      onInputChange={(event, newValue) => {
                        setAuthorSearch(newValue);
                      }}
                      onChange={(event, value) => {
                        setAuthorSearch('');
                        if (value) {
                          handleSetAuthor(value.author);
                        }
                      }}
                    />
                  )}
                </Box>

                <Box sx={{ mt: 3, mb: 3 }}>
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
                      if (value) {
                        handleAddIngredient(value.ingredient);
                      }
                    }}
                  />

                  <Box sx={{ mt: 3 }}>
                    {recipe.ingredients.map((recipeIngredient) => (
                      <RecipeIngredient
                        recipeIngredient={recipeIngredient}
                        onChange={handleRecipeIngredientChange}
                        onDelete={handleDeleteRecipeIngredient}
                      />
                    ))}
                  </Box>
                </Box>

                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography variant="h6">Instructions</Typography>


                  {recipe.steps.map((step) => (
                    <RecipeStep
                      step={step}
                      onChange={handleStepChange}
                      onDelete={handleDeleteStep}
                    />
                  ))}

                  <Button sx={{ mt: 2 }} type="button" onClick={handleAddStepClick} variant="contained">
                    Add Step
                  </Button>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6">Nutriton</Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="calories"
                        name="nutrition.calories"
                        value={recipe.nutrition.calories}
                        required
                        label="Calories"
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="sugar"
                        name="nutrition.sugar"
                        value={recipe.nutrition.sugar}
                        label="Sugar"
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="fat"
                        name="nutrition.fat"
                        value={recipe.nutrition.fat}
                        label="Fat"
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="saturatedFat"
                        name="nutrition.saturatedFat"
                        value={recipe.nutrition.saturatedFat}
                        label="Saturated Fat"
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="sodium"
                        name="nutrition.sodium"
                        value={recipe.nutrition.sodium}
                        label="Sodium"
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="protein"
                        name="nutrition.protein"
                        value={recipe.nutrition.protein}
                        label="Protein"
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="carbohydrates"
                        name="nutrition.carbohydrates"
                        value={recipe.nutrition.carbohydrates}
                        label="Carbohydrates"
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        id="fiber"
                        name="nutrition.fiber"
                        value={recipe.nutrition.fiber}
                        label="Fiber"
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="h6">Tags</Typography>

                  <Stack direction="row" alignItems="center" gap={2} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
                    {tags.map((tag) => (
                      <FilterOption
                        key={tag.id}
                        label={tag.name}
                        value={tag.id}
                        onClick={handleTagClick}
                        active={recipe.tags.some((x) => x.id === tag.id)}
                      />
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Field
                    as={TextField}
                    fullWidth
                    margin="normal"
                    id="referenceUrl"
                    name="referenceUrl"
                    label="Reference URL"
                    autoFocus
                    error={errors.referenceUrl && touched.referenceUrl}
                    helperText={touched.referenceUrl && errors.referenceUrl}
                  />
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
