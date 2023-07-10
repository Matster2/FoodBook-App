import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  List,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import RecipeIngredient from 'Admin/components/RecipeIngredient';
import RecipeStep from 'Admin/components/RecipeStep';
import FilterOption from 'components/FilterOption';
import Header from 'components/Header';
import RecipeImageControl from 'components/RecipeImageControl';
import { TagContext } from 'contexts/TagContext';
import { UnitOfMeasurementContext } from 'contexts/UnitOfMeasurementContext';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import React, { useContext, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { RecipeTypes } from 'types';
import FormModes from 'utils/formModes';
import { isUndefined } from 'utils/utils';
import * as yup from 'yup';


const NutritionField = ({ id, label, value, errors, touched }) => {
  return (
    <Field
      as={TextField}
      required
      fullWidth
      type="number"
      id={id}
      name={id}
      label={label}
      value={value}
      autoFocus
      error={errors.nutrition?.[id] && touched.nutrition?.[id]}
      helperText={touched.nutrition?.[id] && errors.nutrition?.[id]}
      InputLabelProps={{ shrink: true }}
    />
  )
}


const recipeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  difficulty: yup.string().required(),
  prepTime: yup.number().integer().required(),
  cookTime: yup.number().integer().required(),
  totalTime: yup.number().integer().required(),
  servings: yup.number().integer().required(),
  containsAlcohol: yup.bool().required(),
  nutrition: yup.object({
    calories: yup.number().integer().required(),
    sugar: yup.number(),
    fat: yup.number(),
    saturatedFat: yup.number(),
    sodium: yup.number(),
    protein: yup.number(),
    carbohydrates: yup.number(),
    fiber: yup.number(),
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
  difficulty: undefined,
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

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAPI();
  const formRef = useRef();

  const mode = !id ? FormModes.Create : FormModes.Update;

  const types = Object.entries(RecipeTypes).map(( [k, v] ) => (v));
  const difficulties = ['veryEasy', 'easy', 'average', 'hard', 'veryHard'];

  const { setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);
  const { tags, setTags } = useContext(TagContext);

  const [ingredientSearch, setIngredientSearch] = useState('');
  const [searchIngredients, setSearchIngredients] = useState([]);

  const [authorSearch, setAuthorSearch] = useState('');
  const [searchAuthors, setSearchAuthors] = useState([]);

  const [filesToUpload, setFilesToUpload] = useState([]);

  const [loadingRecipe, setLoadingRecipe] = useState(false);
  const [recipe, setRecipe] = useState(initialRecipeValue);

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

  const fetchRecipe = async () => {
    setLoadingRecipe(true);
    try {
      const { data } = await api.getRecipe(id);
      setRecipe(data);
    } catch (e) {
      console.log('error fetching recipe');
    }
    setLoadingRecipe(false);
  };

  /* Handlers */
  const handleSetAuthor = (author) => {
    setRecipe((state) => ({
      ...state,
      author: author
    }));
  }

  const handleRemoveAuthorClick = () => {
    setRecipe((state) => ({
      ...state,
      author: undefined
    }));
  }

  const handleAddIngredient = (ingredient) => {
    const recipeIngredient = {
      ...ingredient,
      amount: undefined,
      optional: false,
      unitOfMeasurement: {
        id: ingredient.defaultUnitOfMeasurement.id,
      },
    };

    const newRecipeIngredients = recipe.ingredients.slice();
    newRecipeIngredients.push(recipeIngredient);

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
        ingredientId: recipeIngredient.id,
        unitOfMeasurementId: recipeIngredient.unitOfMeasurement.id,
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

      filesToUpload.forEach(async (file, index) => {
        await api.uploadRecipeImage(id, file, index);
      });

      toast.success('Recipe successfully created');
      formRef.current?.resetForm();
    } catch (e) {
      toast.error('Unable to create recipe');
    }
  }

  const handleRecipeIngredientChange = (newRecipeIngredient) => {
    const newRecipeIngredients = recipe.ingredients;

    const index = newRecipeIngredients.findIndex((x) => x.id === newRecipeIngredient.id);

    newRecipeIngredients[index] = newRecipeIngredient;

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleDeleteRecipeIngredient = (newRecipeIngredient) => {
    const newRecipeIngredients = recipe.ingredients.filter(
      (x) => x.id !== newRecipeIngredient.id
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

  /* Effects */
  useEffect(() => {
    fetchUnitOfMeasurements();
    fetchTags();

    if (mode !== FormModes.Create) {
      fetchRecipe();
    }
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
                  <Field
                    as={Select}
                    id="id"
                    name="type"
                    labelId="type-label"
                    label="Type"
                    value={`${values.type}`}
                    error={errors.type && touched.type}
                    helperText={touched.type && errors.type}
                  >
                    {types.map((t) => (
                      <MenuItem key={t} value={t}>{t}</MenuItem>
                    ))}
                  </Field>
                </FormControl>

                <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Field
                    as={Select}
                    id="id"
                    name="difficulty"
                    labelId="difficulty-label"
                    label="Difficulty"
                    value={`${values.difficulty}`}
                    error={errors.difficulty && touched.difficulty}
                    helperText={touched.difficulty && errors.difficulty}
                  >
                    {difficulties.map((difficulty) => (
                      <MenuItem key={difficulty} value={difficulty}>{t(`types.recipe.difficulty.${difficulty}`)}</MenuItem>
                    ))}
                  </Field>
                </FormControl>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={6} md={3} lg={2}>
                    <Field
                      as={TextField}
                      required
                      fullWidth
                      type="number"
                      id="prepTime"
                      name="prepTime"
                      label="Prep Time"
                      autoFocus
                      error={errors.prepTime && touched.prepTime}
                      helperText={touched.prepTime && errors.prepTime}
                      InputLabelProps={{ shrink: true }}
                    />
                  </Grid>

                  <Grid item xs={6} md={3} lg={2}>
                    <Field
                      as={TextField}
                      fullWidth
                      type="number"
                      id="cookTime"
                      name="cookTime"
                      required
                      label="Cooking Time"
                      autoFocus
                      error={!isUndefined(errors.cookTime)}
                      helperText={errors.cookTime?.message}
                      InputLabelProps={{ shrink: true }}
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
                      error={!isUndefined(errors.totalTime)}
                      helperText={errors.totalTime?.message}
                      InputLabelProps={{ shrink: true }}
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
                      error={!isUndefined(errors.servings)}
                      helperText={errors.servings?.message}
                      InputLabelProps={{ shrink: true }}
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

                  <Box>
                    {recipe.ingredients.map((recipeIngredient) => (
                      <RecipeIngredient
                        key={recipeIngredient.id}
                        recipeIngredient={recipeIngredient}
                        onChange={handleRecipeIngredientChange}
                        onDelete={handleDeleteRecipeIngredient}
                      />
                    ))}
                  </Box>

                  <Autocomplete
                    sx={{ mt: 3 }}
                    options={searchIngredients
                      .filter(
                        (ingredient) =>
                          !recipe.ingredients.some(
                            (recipeIngredient) => recipeIngredient.id === ingredient.id
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
                </Box>

                <Box sx={{ mt: 3, mb: 3 }}>
                  <Typography variant="h6">Instructions</Typography>


                  {recipe.steps.map((step) => (
                    <RecipeStep
                      key={step.id}
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
                        type="number"
                        id="calories"
                        name="nutrition.calories"
                        value={recipe.nutrition.calories}
                        required
                        label="Calories"
                        error={errors.nutrition?.calories && touched.nutrition?.calories}
                        helperText={touched.nutrition?.calories && errors.nutrition?.calories}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      {/* <NutritionField
                        id="sugar"
                        label="Sugar"
                        value={recipe.nutrition.sugar}
                        errors={errors}
                        touched={touched}
                      /> */}

                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        id="nutrition.sugar"
                        name="nutrition.sugar"
                        value={recipe.nutrition.sugar}
                        label="Sugar"
                        error={errors.nutrition?.sugar && touched.nutrition?.sugar}
                        helperText={touched.nutrition?.sugar && errors.nutrition?.sugar}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        id="fat"
                        name="nutrition.fat"
                        value={recipe.nutrition.fat}
                        label="Fat"
                        error={errors.nutrition?.fat && touched.nutrition?.fat}
                        helperText={touched.nutrition?.fat && errors.nutrition?.fat}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        id="saturatedFat"
                        name="nutrition.saturatedFat"
                        value={recipe.nutrition.saturatedFat}
                        label="Saturated Fat"
                        error={errors.nutrition?.saturatedFat && touched.nutrition?.saturatedFat}
                        helperText={touched.nutrition?.saturatedFat && errors.nutrition?.saturatedFat}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        id="sodium"
                        name="nutrition.sodium"
                        value={recipe.nutrition.sodium}
                        label="Sodium"
                        error={errors.nutrition?.sodium && touched.nutrition?.sodium}
                        helperText={touched.nutrition?.sodium && errors.nutrition?.sodium}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        id="protein"
                        name="nutrition.protein"
                        value={recipe.nutrition.protein}
                        label="Protein"
                        error={errors.nutrition?.protein && touched.nutrition?.protein}
                        helperText={touched.nutrition?.protein && errors.nutrition?.protein}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3}>
                      <Field
                        as={TextField}
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        type="number"
                        id="carbohydrates"
                        name="nutrition.carbohydrates"
                        value={recipe.nutrition.carbohydrates}
                        label="Carbohydrates"
                        error={errors.nutrition?.carbohydrates && touched.nutrition?.carbohydrates}
                        helperText={touched.nutrition?.carbohydrates && errors.nutrition?.carbohydrates}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={6} md={3} lg={2}>
                      <Field
                        as={TextField}
                        fullWidth
                        type="number"
                        id="fiber"
                        name="nutrition.fiber"
                        label="Fiber"
                        error={errors.nutrition?.fiber && touched.nutrition?.fiber}
                        helperText={touched.nutrition?.fiber && errors.nutrition?.fiber}
                        InputLabelProps={{ shrink: true }}
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
                    {mode === FormModes.Create ? "Create" : "Update"}
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
