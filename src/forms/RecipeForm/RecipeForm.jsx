import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
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
import RecipePieceOfEquipment from 'Admin/components/RecipePieceOfEquipment';
import RecipeStep from 'Admin/components/RecipeStep';
import FilterOption from 'components/FilterOption';
import RecipeImageControl from 'components/RecipeImageControl';
import { TagContext } from 'contexts/TagContext';
import { UnitOfMeasurementContext } from 'contexts/UnitOfMeasurementContext';
import RecipeImageActionDialog from 'dialogs/RecipeImageActionDialog';
import RecipeImageViewerDialog from 'dialogs/RecipeImageViewerDialog';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import useSearch from 'hooks/useSearch';
import { useContext, useEffect, useRef, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from 'react-router-dom';
import uuid from 'react-uuid';
import { RecipeDifficulty, RecipeTypes } from 'types';
import { recipeSchema } from 'types/schemas';
import FormModes from 'utils/formModes';
import { lowercaseFirstLetter } from 'utils/stringUtils';
import { isNullOrUndefined, isUndefined, reorder } from 'utils/utils';

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
  equipment: [],
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

// const NutritionField = ({ id, label, value, errors, touched }) => {
//   return (
//     <Field
//       as={TextField}
//       required
//       fullWidth
//       type="number"
//       id={id}
//       name={id}
//       label={label}
//       value={value}
//       error={errors.nutrition?.[id] && touched.nutrition?.[id]}
//       helperText={touched.nutrition?.[id] && errors.nutrition?.[id]}
//       InputLabelProps={{ shrink: true }}
//     />
//   )
// }

export default ({ recipe: initialState, onSubmit }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAPI();
  const formRef = useRef();
  
  const [recipe, setRecipe] = useState(initialRecipeValue);

  const mode = !id ? FormModes.Create : FormModes.Update;

  const typeOptions = Object.entries(RecipeTypes).map(( [k, v] ) => ({
    label: t(`types.recipe.types.${lowercaseFirstLetter(k)}.name`),
    value: v
  }));

  const difficultyOptions = Object.entries(RecipeDifficulty).map(( [k, v] ) => ({
    label: t(`types.recipe.difficulty.${lowercaseFirstLetter(k)}`),
    value: v
  }));

  const { setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);
  const { tags, setTags } = useContext(TagContext);

  const [ingredientSearch, setIngredientSearch, ingredientSearchResults] = useSearch(async () => {
    const { data: { results } } = await api.getIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });
    return results;
  }, { delay: 2000 })

  const [equipmentSearch, setEquipmentSearch, equipmentSearchResults] = useSearch(async () => {
    const { data: { results } } = await api.getEquipment({ search: equipmentSearch, pageSize: 50, sortBy: 'name' });
    return results;
  }, { delay: 2000 })

  const [authorSearch, setAuthorSearch, authorSearchResults] = useSearch(async () => {
    const { data: { results } } = await api.getAuthors({ search: authorSearch, pageSize: 50, sortBy: 'name' });
    return results;
  }, { delay: 2000 })

  const [filesToUpload, setFilesToUpload] = useState([]);
  
  const [showRecipeImageViewerDialog, setShowRecipeImageViewerDialog] = useState(false);
  const [showRecipeImageActionDialog, setShowRecipeImageActionDialog] = useState(false);

  const [selectedRecipeImageId, setSelectedRecipeImageId] = useState();

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
  
  const handleAddPieceOfEquipment = (pieceOfEquipment) => {
    const recipePieceOfEquipment = {
      ...pieceOfEquipment,
      amount: 1,
      dependsOnServings: false,
    };

    const newRecipeEquipment = recipe.equipment.slice();
    newRecipeEquipment.push(recipePieceOfEquipment);

    setRecipe((state) => ({
      ...state,
      equipment: newRecipeEquipment,
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

  const handleSubmit = async (values) => {
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

  const handleRecipePieceOfEquipmentChange = (newRecipePieceOfEquipment) => {
    const newRecipeEquipment = recipe.equipment;

    const index = newRecipeEquipment.findIndex((x) => x.id === newRecipePieceOfEquipment.id);

    newRecipeEquipment[index] = newRecipePieceOfEquipment;

    setRecipe((state) => ({
      ...state,
      equipment: newRecipeEquipment,
    }));
  };

  const handleDeleteRecipePieceOfEquipment = (newRecipePieceOfEquipment) => {
    const newRecipeEquipment = recipe.equipment.filter(
      (x) => x.id !== newRecipePieceOfEquipment.id
    );

    setRecipe((state) => ({
      ...state,
      equipment: newRecipeEquipment,
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
  
  /* Image Handlers */
  const handleUploadImage = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setRecipe((state) => ({
      ...state,
      images: [
        ...recipe.images, {
          id: uuid(),
          url
        }        
      ],
    }));
    setFilesToUpload((state) => [...state, file]);
  };

  const handleDeleteImage = (id) => {
    const images = recipe.images.filter((x) => x.id !== id);

    setRecipe((state) => ({
      ...state,
      images,
    }));
  };

  const handleImageClick = (url) => {
    setShowRecipeImageDialog(true);
  };  
  
  const handleImageLongClick = (id) => {
    setSelectedRecipeImageId(id)
    setShowImageActionDialog(true);
  };

  const handleImageDragEnd = (result) => {    
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const images = reorder(
      recipe.images,
      result.source.index,
      result.destination.index
    );

    setRecipe((state) => ({
      ...state,
      images: images,
    }));
  }

  /* Effects */
  useEffect(() => {
    setRecipe(initialState ?? initialRecipeValue);
  }, [initialState])

  useEffect(() => {
    fetchUnitOfMeasurements();
    fetchTags();
  }, []);

  /* Rendering */
  const formik = useFormik({
    innerRef: formRef,
    enableReinitialize: true,
    initialValues: recipe,
    validationSchema: recipeSchema,
    onSubmit: async (values, { resetForm }) => {
      onSubmit(recipe, filesToUpload);
    }
  });

  return (
    <>
      <RecipeImageViewerDialog
        open={showRecipeImageViewerDialog}
        onClose={() => setShowRecipeImageViewerDialog(false)}
        images={recipe.images.map((image) => image.url)}
      />

      <RecipeImageActionDialog
        open={showRecipeImageActionDialog}
        onClose={() => setShowRecipeImageActionDialog(false)}
      />

      <Box>
        {/* <Box>
          <FormControlLabel label="Add Multiple" control={<Checkbox defaultChecked />} />
        </Box> */}

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2">{recipe.images.length} {recipe.images.length === 1 ? "Image" : "Images"}</Typography>

          <List sx={{ overflow: "auto" }}>
            <DragDropContext onDragEnd={handleImageDragEnd}>
              <Droppable droppableId="droppable" direction="horizontal">
                {(provided, snapshot) => (
                  <Stack direction="row" gap={2} alignItems="center"
                    ref={provided.innerRef}
                    style={{ maxWidth: 'fit-content' }}
                    {...provided.droppableProps}
                  >
                    {recipe.images.map((image, index) => (
                      <Draggable key={image} draggableId={image} index={index}>
                        {(provided, snapshot) => (
                          <div
                            style={{ maxWidth: 'fit-content' }}
                            ref={provided.innerRef}
                            onClick={handleImageClick}
                          >
                            <RecipeImageControl
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              src={image.url}
                              onDeleteClick={() => handleDeleteImage(image.id)}
                              onLongClick={handleImageLongClick}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext> 
          </List>

          <input type="file" onChange={handleUploadImage} />
        </Box>

        <Formik
          innerRef={formRef}
          enableReinitialize={true}
          initialValues={recipe}
          validationSchema={recipeSchema}
          onSubmit={async (values, { resetForm }) => {
            onSubmit(recipe, filesToUpload);
          }}
        >
          {(formik) => {
            const { errors, touched, values } = formik;

            return (
              <Form>
                <Box>
                  <TextField
                    required
                    fullWidth
                    margin="normal"
                    id="name"
                    name="name"
                    label="Name"
                    error={errors.name && touched.name}
                    helperText={touched.name && errors.name}
                    autoFocus
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
                      {typeOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
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
                      {difficultyOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
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
                        error={errors.prepTime && touched.prepTime}
                        helperText={touched.prepTime && errors.prepTime}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: 0 } }}
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
                        error={!isUndefined(errors.cookTime)}
                        helperText={errors.cookTime?.message}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: 0 } }}
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
                        error={!isUndefined(errors.totalTime)}
                        helperText={errors.totalTime?.message}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: 0 } }}
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
                        error={!isUndefined(errors.servings)}
                        helperText={errors.servings?.message}
                        InputLabelProps={{ shrink: true }}
                        InputProps={{ inputProps: { min: 1 } }}
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

                    {!isNullOrUndefined(recipe.author) && (
                      <Box>
                        <Stack direction="row" justifyContent="space-between">
                          <Typography>{recipe.author.name}</Typography>

                          <IconButton onClick={handleRemoveAuthorClick}>
                            <ClearIcon />
                          </IconButton>
                        </Stack>
                      </Box>
                    )}

                    {isNullOrUndefined(recipe.author) && (
                      <Autocomplete
                        options={authorSearchResults.map((author) => ({ label: author.name, author }))}
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
                      options={ingredientSearchResults
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
                    <Typography variant="h6">Equipment</Typography>

                    <Box>
                      {recipe.equipment.map((recipePieceOfEquipment) => (
                        <RecipePieceOfEquipment
                          key={recipePieceOfEquipment.id}
                          recipePieceOfEquipment={recipePieceOfEquipment}
                          onChange={handleRecipePieceOfEquipmentChange}
                          onDelete={handleDeleteRecipePieceOfEquipment}
                        />
                      ))}
                    </Box>

                    <Autocomplete
                      sx={{ mt: 3 }}
                      options={equipmentSearchResults
                        .filter(
                          (pieceOfEquipment) =>
                            !recipe.equipment.some(
                              (recipePieceOfEquipment) => recipePieceOfEquipment.id === pieceOfEquipment.id
                            )
                        )
                        .map((pieceOfEquipment) => ({ label: pieceOfEquipment.name, pieceOfEquipment }))}
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      renderInput={(params) => <TextField {...params} label="Add Piece Of Equipment" />}
                      value={equipmentSearch}
                      inputValue={equipmentSearch}
                      onInputChange={(event, newValue) => {
                        setEquipmentSearch(newValue);
                      }}
                      onChange={(event, value) => {
                        setIngredientSearch('');
                        if (value) {
                          handleAddPieceOfEquipment(value.pieceOfEquipment);
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
                          InputProps={{ inputProps: { min: 0 } }}
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
                          InputProps={{ inputProps: { min: 0 } }}
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
                          InputProps={{ inputProps: { min: 0 } }}
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
                          InputProps={{ inputProps: { min: 0 } }}
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
                          InputProps={{ inputProps: { min: 0 } }}
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
                          InputProps={{ inputProps: { min: 0 } }}
                        />
                      </Grid>
                      <Grid item xs={6} md={3}>
                        <Field
                          as={TextField}
                          fullWidth
                          type="number"
                          id="carbohydrates"
                          name="nutrition.carbohydrates"
                          value={recipe.nutrition.carbohydrates}
                          label="Carbohydrates"
                          error={errors.nutrition?.carbohydrates && touched.nutrition?.carbohydrates}
                          helperText={touched.nutrition?.carbohydrates && errors.nutrition?.carbohydrates}
                          InputLabelProps={{ shrink: true }}
                          InputProps={{ inputProps: { min: 0 } }}
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
                          InputProps={{ inputProps: { min: 0 } }}
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
      </Box>
    </>
  );
};
