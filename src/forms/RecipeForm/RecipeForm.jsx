import { useModal } from '@ebay/nice-modal-react';
import { Clear as ClearIcon } from '@mui/icons-material';
import { LoadingButton } from "@mui/lab";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
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
import RecipeImage from 'components/RecipeImage';
import RecipeImageControl from 'components/RecipeImageControl';
import NewPersonalEquipmentDialog from 'dialogs/NewPersonalEquipmentDialog';
import NewPersonalIngredientDialog from 'dialogs/NewPersonalIngredientDialog';
import RecipeImageViewerDialog from 'dialogs/RecipeImageViewerDialog';
import { useFormik } from 'formik';
import useAPI from 'hooks/useAPI';
import useSearch from 'hooks/useSearch';
import useTags from 'hooks/useTags';
import useUnitOfMeasurements from 'hooks/useUnitOfMeasurements';
import isObject from "lodash/isObject";
import { useEffect, useMemo, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { isMobile } from 'react-device-detect';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { RecipeDifficulty, RecipeState, RecipeType } from 'types';
import { getRecipeScheme } from 'types/schemas';
import FormModes from 'utils/formModes';
import { includeResizeQueryParameters } from 'utils/imageUtils';
import { lowercaseFirstLetter } from 'utils/stringUtils';
import { isNullOrEmpty, isNullOrUndefined, isUndefined, reorder } from 'utils/utils';
import styles from './RecipeForm.module.css';

const getDefaultRecipe = () => {
  return {
    state: RecipeState.Draft,
    name: '',
    description: '',
    type: RecipeType.Breakfast,
    difficulty: RecipeDifficulty.Average,
    prepTime: 0,
    cookTime: 0,
    totalTime: 1,
    servings: 1,
    containsAlcohol: false,
    steps: [
      {
        id: uuid(),
        name: "",
        instructions: [{
          id: uuid(),
          instruction: ""
        }]
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
    personal: false,
    tags: [],
    images: [],
    isVariant: false
  }
}

export default ({ recipe: initialValues, onSubmit, admin }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const api = useAPI();

  const [updating, setUpdating] = useState(false);

  const { fetch: fetchUnitOfMeasurements } = useUnitOfMeasurements();
  const { tags, fetch: fetchTags } = useTags();

  const mode = !initialValues?.id ? FormModes.Create : FormModes.Update;

  const [showAddIngredientButton, setShowAddIngredientButton] = useState(false);
  const [showAddEquipmentButton, setShowAddEquipmentButton] = useState(false);

  const typeOptions = Object.entries(RecipeType).map(( [k, v] ) => ({
    label: t(`types.recipe.types.${lowercaseFirstLetter(k)}.name`),
    value: v
  }));

  const difficultyOptions = Object.entries(RecipeDifficulty).map(( [k, v] ) => ({
    label: t(`types.recipe.difficulty.${lowercaseFirstLetter(k)}`),
    value: v
  }));
  
  const [ingredientSearch, setIngredientSearch, ingredientSearchResults, searchingIngredients] = useSearch(async () => {
    const { data: { results, totalResults } } = await api.getIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });
    
    if (!isNullOrEmpty(ingredientSearch) && (totalResults === 0 || !results.some(x => x.name.toLowerCase() === ingredientSearch.toLowerCase() || x.pluralName.toLowerCase() === ingredientSearch.toLowerCase()))) {
      setShowAddIngredientButton(true);
    }
    
    return results;
  }, { delay: 2000 })

  const [equipmentSearch, setEquipmentSearch, equipmentSearchResults, searchingEquipment] = useSearch(async () => {
    const { data: { results, totalResults } } = await api.getEquipment({ search: equipmentSearch, pageSize: 50, sortBy: 'name' });

    if (!isNullOrEmpty(equipmentSearch) && (totalResults === 0 || !results.some(x => x.name.toLowerCase() === equipmentSearch.toLowerCase() || x.pluralName.toLowerCase() === equipmentSearch.toLowerCase()))) {
      setShowAddEquipmentButton(true);
    }

    return results;
  }, { delay: 2000 })

  const [authorSearch, setAuthorSearch, authorSearchResults, searchingAuthors] = useSearch(async () => {
    if (!admin) {
      return [];
    }

    const { data: { results } } = await api.getAuthors({ search: authorSearch, pageSize: 50, sortBy: 'name' });
    return results;
  }, { delay: 2000 })

  const [filesToUpload, setFilesToUpload] = useState([]);
  
  const [showRecipeImageViewerDialog, setShowRecipeImageViewerDialog] = useState(false);
  const [showDeleteRecipeImageDialog, setShowDeleteRecipeImageDialog] = useState(false);
  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const newPersonalIngredientDialog = useModal(NewPersonalIngredientDialog);
  const newPersonalEquipmentDialog = useModal(NewPersonalEquipmentDialog);

  const [selectedRecipeImage, setSelectedRecipeImage] = useState();

  const [loadingDescendantRecipe, setLoadingDescendantRecipe] = useState();
  const [descendantRecipe, setDescendantRecipe] = useState();

  const [originalRecipe] = useState({
    ...getDefaultRecipe(),
    ...initialValues,
    languageCode: i18n.resolvedLanguage
  });
  
  const fetchDescendantRecipe = async () => {
    setLoadingDescendantRecipe(true);
    try {
      const { data } = await api.getRecipe(recipe?.descendantOfRecipeId);
      setDescendantRecipe({
        ...data,
        images: data.images.map((image) => ({
          ...image,
          url: includeResizeQueryParameters(image.url, 300, 0)
        }))
      });
    } catch (e) {
      console.log(e);
    }
    setLoadingDescendantRecipe(false);
  }

  const handleCreateRecipe = async (newRecipe, filesToUpload) => {
    setUpdating(true);

    try {
      const {
        data: { id },
      } = await api.createRecipe({
        ...newRecipe,
        ingredients: newRecipe.ingredients.map(x => ({
          ingredientId: x.id,
          unitOfMeasurementId: x.unitOfMeasurement.id,
          amount: x.amount,
          optional: x.optional
        })),
        equipment: newRecipe.equipment.map(x => ({
          equipmentId: x.id,
          amount: x.amount,
          dependsOnServings: x.dependsOnServings
        })),
      });

      filesToUpload.forEach(async (imageFile, index) => {
        try {
          await api.uploadRecipeImage(id, imageFile.file, index);
        } catch {}
      });

      if (!isUndefined(descendantRecipe) && recipe.isVariant) {
        try {
          await api.addRecipeVariantRelationship(descendantRecipe.id, id);
        } catch {}
      }

      toast.success(t("requests.recipes.create.success"));
      onSubmit({
        ...newRecipe,
        id,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.recipes.create.error"));
    }

    setUpdating(false);
  }

  const handleUpdateRecipe = async (newRecipe) => {
    setUpdating(true);

    try {
      await api.updateRecipe(newRecipe.id, {
        ...newRecipe,
        ingredients: newRecipe.ingredients.map(x => ({
          ingredientId: x.id,
          unitOfMeasurementId: x.unitOfMeasurement.id,
          amount: x.amount,
          optional: x.optional
        })),
        equipment: newRecipe.equipment.map(x => ({
          equipmentId: x.id,
          amount: x.amount,
          dependsOnServings: x.dependsOnServings
        })),
      });

      // handle images
      const imagesToRemove = originalRecipe.images.filter(x => !newRecipe.images.some(image => x.id === image.id));
      imagesToRemove.forEach(async (image) => {
        try {
          await api.removeRecipeImage(image.id);
        } catch {}
      })

      recipe.images.forEach(async (image, index) => {
        try {
          if (originalRecipe.images.some(x => x.id === image.id)) {
            var oldIndex = originalRecipe.images.findIndex(x => x.id === image.id);
  
            if (oldIndex !== index) {
              await api.updateRecipeImageIndex(image.id, index);
            }
          } else {
            var imageFile = filesToUpload.find(x => x.id === image.id);            
            await api.uploadRecipeImage(recipe.id, imageFile.file, index);
          }
        } catch (e) {
          console.log(e)
        }
      });

      // handle tags
      const tagsToAdd = newRecipe.tags.filter(x => !originalRecipe.tags.some(tag => x.id === tag.id));
      tagsToAdd.forEach(async (tag) => {
        try {
          await api.addTagToRecipe(recipe.id, tag.id);
        } catch {}
      })

      const tagsToRemove = originalRecipe.tags.filter(x => !newRecipe.tags.some(tag => x.id === tag.id));
      tagsToRemove.forEach(async (tag) => {
        try {
          await api.removeTagFromRecipe(recipe.id, tag.id);
        } catch {}
      })
      
      toast.success(t("requests.recipes.update.success"));
      onSubmit({
        ...newRecipe,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.recipes.update.error"));
    }

    setUpdating(false);
  }

  const formik = useFormik({
    initialValues: {
      ...originalRecipe
    },
    enableReinitialize: true,
    validationSchema: getRecipeScheme(),
    onSubmit: async (values) => {
      if (!recipe.id) {
        await handleCreateRecipe(values, filesToUpload);
      } else {
        await handleUpdateRecipe(values, filesToUpload);
      }
    },
  });
  
  const { handleSubmit, values: recipe, setValues: setRecipe, handleChange, errors, touched } = formik;

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
    var existingIngredient = recipe.ingredients.find(x => x.id === ingredient.id)

    const recipeIngredient = {
      ...ingredient,
      amount: undefined,
      optional: existingIngredient ? !existingIngredient.optional: false,
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

  const handleRecipeIngredientChange = (newRecipeIngredient) => {
    const newRecipeIngredients = [ ...recipe.ingredients];

    const index = newRecipeIngredients.findIndex((x) => x.id === newRecipeIngredient.id && x.optional === newRecipeIngredient.optional);

    newRecipeIngredients[index] = newRecipeIngredient;

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleDeleteRecipeIngredient = (newRecipeIngredient) => {
    const newRecipeIngredients = recipe.ingredients.filter(
      (x) => !(x.id === newRecipeIngredient.id && x.optional === newRecipeIngredient.optional)
    );

    setRecipe((state) => ({
      ...state,
      ingredients: newRecipeIngredients,
    }));
  };

  const handleRecipePieceOfEquipmentChange = (newRecipePieceOfEquipment) => {
    const newRecipeEquipment = [...recipe.equipment];

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
    const newSteps = [...recipe.steps];

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

  const handleStepDragEnd = (result) => { 
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newSteps = reorder(
      recipe.steps,
      result.source.index,
      result.destination.index
    );

    setRecipe((state) => ({
      ...state,
      steps: newSteps,
    }));
  }
  
  /* Image Handlers */
  const handleUploadImage = (e) => {
    const file = e.target.files[0];

    const fileExtension = "." + file.name.split(".").at(-1).toLowerCase();
    console.log(fileExtension)
    const allowedFileTypes = [".jpg", ".jpeg", ".jfif", ".png", ".tiff", ".avif", ".webp"];
    if (!allowedFileTypes.includes(fileExtension)) {
      toast.error(`${t("forms.recipe.invalidRecipeImage")}`);
      return false;
    }


    const url = URL.createObjectURL(file);
    const newImage = {
      id: uuid(),
      url
    }

    setRecipe((state) => ({
      ...state,
      images: [
        ...recipe.images, 
        newImage       
      ],
    }));
    setFilesToUpload((state) => [...state, {
      id: newImage.id,
      file,
    }]);
  };

  const handleDeleteImage = (image) => {
    const images = recipe.images.filter((x) => x.id !== image.id);

    setRecipe((state) => ({
      ...state,
      images,
    }));

    setShowDeleteRecipeImageDialog(false);
    setSelectedRecipeImage(undefined);
  };

  const handleImageClick = (image) => {
    setShowRecipeImageViewerDialog(true);
  };  
  
  const handleImageDeleteClick = (image) => {
    setSelectedRecipeImage(image)
    setShowDeleteRecipeImageDialog(true);
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
  
  const handlePublishRecipe = async () => {    
    try {
      await api.publishRecipe(recipe.id);
      setRecipe({
        ...recipe,
        state: RecipeState.Published
      })
      toast.success(t("requests.recipes.publish.success"));
    } catch (e) {
      toast.error(`${t("requests.recipes.publish.error")}. \n ${e.response.data}`);
    }

    setShowPublishDialog(false);
  }

  const handleDeleteRecipe = async () => {    
    try {
      await api.deleteRecipe(recipe.id);

      toast.success(t("requests.recipes.delete.success"));
      navigate('/')
    } catch (e) {
      console.log(e)
      toast.error(t("requests.recipes.delete.error"));
    }
  }

  const handleAddingNewIngredient = (name) => {
    newPersonalIngredientDialog.show({ 
        open: true,
        ingredient: {
          name,
          pluralName: name
        },
        onClose: () => newPersonalIngredientDialog.remove(),
        onComplete: (newIngredient) => {
          newPersonalIngredientDialog.remove();
          onNewIngredientAdded(newIngredient);
        }
      });
  }

  const onNewIngredientAdded = (ingredient) => {
    handleAddIngredient(ingredient);
  }
  
  const handleAddingNewPieceOfEquipment = (name) => {
    newPersonalEquipmentDialog.show({ 
        open: true,
        pieceOfEquipment: {
          name,
          pluralName: name
        },
        onClose: () => newPersonalEquipmentDialog.remove(),
        onComplete: (newPieceOfEquipment) => {
          newPersonalEquipmentDialog.remove();
          onNewPieceOfEquipmentAdded(newPieceOfEquipment);
        }
      });
  }

  const onNewPieceOfEquipmentAdded = (pieceOfEquipment) => {
    handleAddPieceOfEquipment(pieceOfEquipment);
  }

  /* Effects */
  useEffect(() => {
    fetchUnitOfMeasurements();
    fetchTags();

    if (recipe?.descendantOfRecipeId) {
      fetchDescendantRecipe();
    }
  }, []);

  
  const getFirstErrorKey = (object, keys = []) => {
    const firstErrorKey = Object.keys(object)[0];
    if (isObject(object[firstErrorKey])) {
      return getFirstErrorKey(object[firstErrorKey], [...keys, firstErrorKey]);
    }
    return [...keys, firstErrorKey].join(".");
  };

  useEffect(() => {
    if (!formik.isValid && formik.submitCount !== 0 && formik.isSubmitting) {
      const firstErrorKey = getFirstErrorKey(formik.errors);
      if (global.window.document.getElementsByName(firstErrorKey).length) {
        global.window.document.getElementsByName(firstErrorKey)[0].focus();
      }
    }
  }, [formik.submitCount, formik.isValid, formik.errors, formik.isSubmitting]);
  
  const ImageList = useMemo(() => (
    <List sx={{ overflow: "auto" }}>
      <DragDropContext onDragEnd={handleImageDragEnd}>
        <Droppable droppableId="droppable-images" direction="horizontal">
          {(provided, snapshot) => (
            <Stack direction="row" gap={2} alignItems="center"
              ref={provided.innerRef}
              style={{ maxWidth: 'fit-content' }}
              {...provided.droppableProps}
            >
              {recipe.images.map((image, index) => (
                <Draggable key={image.id} draggableId={image.id} index={index}>
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
                        alwaysShowDelete={isMobile}
                        onClick={() => handleImageClick(image)}
                        onDeleteClick={() => handleImageDeleteClick(image)}
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
  ), [recipe.images, filesToUpload])

  /* Rendering */
  return (
    <>
      <RecipeImageViewerDialog
        open={showRecipeImageViewerDialog}
        onClose={() => setShowRecipeImageViewerDialog(false)}
        images={recipe.images.map((image) => image.url)}
      />

      <Dialog
        open={showDeleteDialog}
        onClose={() => setShowDeleteDialog(false)}
        aria-labelledby="delete-recipe-dialog-title"
        aria-describedby="delete-recipe-dialog-description"
      >
        <DialogTitle sx={{ mt: 2 }} id="delete-recipe-dialog-title">
          {t("dialogs.deleteRecipe.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-recipe-dialog-description">
            {t("dialogs.deleteRecipe.description")}            
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            {t('common.words.no')}
          </Button>
          <Button onClick={handleDeleteRecipe} autoFocus>
            {t('common.words.yes')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showPublishDialog}
        onClose={() => setShowPublishDialog(false)}
        aria-labelledby="publish-recipe-dialog-title"
        aria-describedby="publish-recipe-dialog-description"
      >
        <DialogTitle sx={{ mt: 2 }} id="publish-recipe-dialog-title">
          {t("dialogs.publishRecipe.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="publish-recipe-dialog-description">
          {t("dialogs.publishRecipe.description")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteDialog(false)}>
            {t('common.words.no')}
          </Button>
          <Button onClick={handlePublishRecipe} autoFocus>
            {t('common.words.yes')}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={showDeleteRecipeImageDialog}
        onClose={() => setShowDeleteRecipeImageDialog(false)}
        aria-labelledby="delete-recipe-image-dialog-title"
        aria-describedby="delete-recipe-image-dialog-description"
      >
        <DialogTitle sx={{ mt: 2 }} id="delete-recipe-image-dialog-title">
          {t("dialogs.deleteRecipeImage.title")}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-recipe-image-dialog-description">
          {t("dialogs.deleteRecipeImage.description")}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteRecipeImageDialog(false)}>
            {t('common.words.no')}
          </Button>
          <Button onClick={() => handleDeleteImage(selectedRecipeImage)} autoFocus>
            {t('common.words.yes')}
          </Button>
        </DialogActions>
      </Dialog>

      {(mode === FormModes.Create && !isUndefined(descendantRecipe)) && (
        <Box sx={{ mt: 2 }}> 
          <Typography sx={{ fontSize: 12, fontWeight: 'bold', mb: 1 }}>{`${t('forms.recipe.copiedFrom')}:`}</Typography>

          <Stack display="flex" direction="row" alignItems="center" gap={2}>
            <Box className={styles.imageContainer}>
              <RecipeImage
                src={descendantRecipe?.images && descendantRecipe.images.length > 0 ? descendantRecipe.images[0].url : undefined}
              />
            </Box>

            <Typography sx={{ fontWeight: 'bold' }}>{descendantRecipe.name}</Typography>
          </Stack>

          <FormControlLabel
            control={<Checkbox
              value={recipe.isVariant}
              onChange={handleChange}  
            />}            
            name="isVariant"
            label={`${t('forms.recipe.inputs.isVariant.label')} ${descendantRecipe.name}`}
          />
        </Box>
      )}
      
      {(!recipe.personal && mode === FormModes.Update) && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ color: 'var(--primary-colour)', fontWeight: 'bold' }}>{recipe.state}</Typography>
        </Box>
      )}

      <Stack display="flex" direction="row" justifyContent="end" gap={1} sx={{ mb: 2}}>
        {(mode === FormModes.Update && !recipe.personal && recipe.state === RecipeState.Draft) && (
          <Button
            type="button"
            variant="contained"
            onClick={() => setShowPublishDialog(true)}
          >
          {t("types.recipe.actions.publish")}
          </Button>
        )}
        {(mode === FormModes.Update && (recipe.personal || recipe.state === RecipeState.Draft)) && (
          <Button
            type="button"
            variant="contained"
            onClick={() => setShowDeleteDialog(true)}
          >
            {t("types.recipe.actions.delete")}
          </Button>
        )}
      </Stack>

      <Box>
        <Typography variant="body2">{recipe.images.length} {recipe.images.length === 1 ? t("common.words.image") : t("common.words.images")}</Typography>
        {ImageList}
        <input type="file" onChange={handleUploadImage} accept="image/jpg,image/jpeg,image/jfif,image/png,image/tiff,image/webp" />
      </Box>

      <Box sx={{ mt: 1, mb: 2 }}>
        <form onSubmit={handleSubmit}>          
          <Box>
            <TextField
              required
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label={t("types.recipe.fields.name.name")}
              value={recipe.name}
              onChange={handleChange}
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
              autoFocus
            />
            
            <TextField
              fullWidth
              margin="normal"
              id="description"
              name="description"
              multiline
              rows={2}
              label={t("types.recipe.fields.description.name")}
              value={recipe.description}
              onChange={handleChange}
              error={errors.description && touched.description}
              helperText={touched.description && errors.description}
            />

            <FormControl
              fullWidth
              sx={{ mt: 2, mb: 1 }} 
              required
              error={errors.type && touched.type}
            >
              <InputLabel id="type-label">{t('types.recipe.fields.type.name')}</InputLabel>
              <Select
                id="id"
                name="type"
                labelId="type-label"
                label={t("types.recipe.fields.type.name")}
                value={`${recipe.type}`}
                onChange={handleChange}
              >
                {typeOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.type && errors.type}</FormHelperText>
            </FormControl>


            <FormControl
              fullWidth
              sx={{ mt: 2, mb: 1 }} 
              required
              error={errors.difficulty && touched.difficulty}
            >
              <InputLabel id="difficulty-label">{t('types.recipe.fields.difficulty.name')}</InputLabel>
              <Select
                id="id"
                name="difficulty"
                labelId="difficulty-label"
                label={t("types.recipe.fields.difficulty.name")}
                value={`${recipe.difficulty}`}
                onChange={handleChange}
              >
                {difficultyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
                ))}
              </Select>
              <FormHelperText>{touched.difficulty && errors.difficulty}</FormHelperText>
            </FormControl>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} md={3} lg={2}>
                <TextField
                  fullWidth
                  type="number"
                  required
                  id="prepTime"
                  name="prepTime"
                  label={t("types.recipe.fields.prepTime.name")}
                  value={recipe.prepTime}
                  onChange={handleChange}
                  error={errors.prepTime && touched.prepTime}
                  helperText={touched.prepTime && errors.prepTime}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={6} md={3} lg={2}>
                <TextField
                  fullWidth
                  type="number"
                  required
                  id="cookTime"
                  name="cookTime"
                  label={t("types.recipe.fields.cookTime.name")}
                  value={recipe.cookTime}
                  onChange={handleChange}
                  error={!isUndefined(errors.cookTime)}
                  helperText={errors.cookTime?.message}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>

              <Grid item xs={6} md={3} lg={2}>
                <TextField
                  fullWidth
                  type="number"
                  required
                  id="totalTime"
                  name="totalTime"
                  label={t("types.recipe.fields.totalTime.name")}
                  value={recipe.totalTime}
                  onChange={handleChange}
                  error={!isUndefined(errors.totalTime)}
                  helperText={errors.totalTime?.message}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Grid>
            </Grid>

            <Grid container spacing={2} sx={{ mt: 1 }}>
              <Grid item xs={6} md={3} lg={2}>
                <TextField
                  fullWidth
                  type="number"
                  required
                  id="servings"
                  name="servings"
                  label={t("types.recipe.fields.servings.name")}
                  value={recipe.servings}
                  onChange={handleChange}
                  error={!isUndefined(errors.servings)}
                  helperText={errors.servings?.message}
                  InputLabelProps={{ shrink: true }}
                  InputProps={{ inputProps: { min: 1 } }}
                />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>              
              <FormControlLabel
                control={<Checkbox
                  value={recipe.containsAlcohol}
                  onChange={handleChange}  
                />}   
                name="containsAlcohol"
                label={t("types.recipe.fields.containsAlcohol.name")}
              />
            </Box>

            {admin && (
              <Box sx={{ mt: 5 }}>
                <Typography variant="h6">{t("types.author.name")}</Typography>

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
                    loading={searchingAuthors}
                    options={authorSearchResults.map((author) => ({ label: author.name, author }))}
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    renderInput={(params) => <TextField {...params} label={t("types.author.name")} />}
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
            )}

            <Box sx={{ mt: 5 }}>
              <Typography variant="h6">{t("types.ingredient.pluralName")}</Typography>

              <Box>
                {recipe.ingredients.map((recipeIngredient) => (
                  <RecipeIngredient
                    key={recipeIngredient.id}
                    recipeIngredient={recipeIngredient}
                    onChange={handleRecipeIngredientChange}
                    onDelete={handleDeleteRecipeIngredient}
                    optionalDisabled={recipe.ingredients.filter(x => x.id === recipeIngredient.id).length > 1}
                  />
                ))}
              </Box>

              <Stack sx={{ mt: 3 }} direction="row" gap={1}>
                <Autocomplete
                  fullWidth
                  loading={searchingIngredients}
                  options={ingredientSearchResults}
                  filterOptions={(options, params) => {
                    const newOptions = options
                      .filter(
                        (ingredient) =>
                          recipe.ingredients.filter(
                            (recipeIngredient) => recipeIngredient.id === ingredient.id
                          ).length < 2
                      )
                      .map((ingredient) => ({ label: ingredient.name, ingredient }))

                    if (showAddIngredientButton) {
                      newOptions.push({ label: `${t("common.words.actions.add")} ${t("types.ingredient.name")} "${ingredientSearch}"`, ingredient: undefined, name: ingredientSearch })
                    }

                    return newOptions;
                  }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  renderInput={(params) => <TextField {...params} label={`${t("common.words.actions.add")} ${t("types.ingredient.name")}`} />}
                  value={ingredientSearch}
                  inputValue={ingredientSearch}
                  onInputChange={(event, newValue) => {
                    setIngredientSearch(newValue);
                    setShowAddIngredientButton(false);
                  }}
                  onChange={(event, value) => {
                    setIngredientSearch('');
                    if (value) {
                      if (!isUndefined(value.ingredient)) {
                        handleAddIngredient(value.ingredient);
                      } else {
                        handleAddingNewIngredient(value.name)
                      }
                    }
                  }}
                />
              </Stack>
            </Box>

            
            <Box sx={{ mt: 5 }}>
              <Typography variant="h6">{t("types.equipment.pluralName")}</Typography>

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
              
              <Stack sx={{ mt: 3 }} direction="row" gap={1}>
                <Autocomplete
                  fullWidth
                  loading={searchingEquipment}
                  options={equipmentSearchResults}
                  filterOptions={(options, params) => {
                    const newOptions = options
                      .filter(
                        (pieceOfEquipment) =>
                          !recipe.equipment.some(
                            (recipePieceOfEquipment) => recipePieceOfEquipment.id === pieceOfEquipment.id
                          )
                      )
                      .map((pieceOfEquipment) => ({ label: pieceOfEquipment.name, pieceOfEquipment }))

                    if (showAddEquipmentButton) {
                      newOptions.push({ label: `${t("common.words.actions.add")} ${t("types.equipment.name")} "${equipmentSearch}"`, pieceOfEquipment: undefined, name: equipmentSearch })
                    }

                    return newOptions;
                  }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  renderInput={(params) => <TextField {...params} label={`${t("common.words.actions.add")} ${t("types.equipment.name")}`}  />}
                  value={equipmentSearch}
                  inputValue={equipmentSearch}
                  onInputChange={(event, newValue) => {
                    setEquipmentSearch(newValue);
                    setShowAddEquipmentButton(false);
                  }}
                  onChange={(event, value) => {
                    setEquipmentSearch('');
                    if (value) {
                      if (!isUndefined(value.pieceOfEquipment)) {
                        handleAddPieceOfEquipment(value.pieceOfEquipment);
                      } else {
                        handleAddingNewPieceOfEquipment(value.name)
                      }
                    }
                  }}
                />
              </Stack>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Typography sx={{ mb: 2 }} variant="h6">{t("types.recipe.fields.steps.instructions.name")}</Typography>

              <DragDropContext onDragEnd={handleStepDragEnd}>
                <Droppable droppableId="droppable-steps" direction="vertical">
                  {(provided, snapshot) => (
                    <Stack sx={{ mt: 2 }} direction="column" gap={2}
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      {recipe.steps.map((step, index) => (
                        <Draggable key={step.id} draggableId={step.id} index={index}>
                          {(provided, snapshot) => (
                            <RecipeStep
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              dragHandleProps={provided.dragHandleProps}
                              key={step.id}
                              step={step}
                              onChange={handleStepChange}
                              onDelete={handleDeleteStep}
                            />
                            )}
                          </Draggable>
                        ))}
        
                        {provided.placeholder}
                      </Stack>
                  )}
                </Droppable>
              </DragDropContext> 

              <Button sx={{ mt: 2 }} type="button" onClick={handleAddStepClick} variant="contained">
                {`${t("common.words.actions.add")} ${t("types.recipe.fields.steps.singularName")}`}
              </Button>
            </Box>

            <Box sx={{ mt: 5 }}>
              <Typography sx={{ mb: 2 }} variant="h6">{t("types.recipe.fields.nutrition.name")}</Typography>

              <Grid container spacing={2}>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="calories"
                    name="nutrition.calories"
                    label={t("types.recipe.fields.nutrition.calories.name")}
                    value={recipe.nutrition.calories}
                    onChange={handleChange}
                    error={errors.nutrition?.calories && touched.nutrition?.calories}
                    helperText={touched.nutrition?.calories && errors.nutrition?.calories}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="nutrition.sugar"
                    name="nutrition.sugar"
                    label={t("types.recipe.fields.nutrition.sugar.name")}
                    value={recipe.nutrition.sugar}
                    onChange={handleChange}
                    error={errors.nutrition?.sugar && touched.nutrition?.sugar}
                    helperText={touched.nutrition?.sugar && errors.nutrition?.sugar}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="fat"
                    name="nutrition.fat"
                    label={t("types.recipe.fields.nutrition.fat.name")}
                    value={recipe.nutrition.fat}
                    onChange={handleChange}
                    error={errors.nutrition?.fat && touched.nutrition?.fat}
                    helperText={touched.nutrition?.fat && errors.nutrition?.fat}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="saturatedFat"
                    name="nutrition.saturatedFat"
                    label={t("types.recipe.fields.nutrition.saturatedFat.name")}
                    value={recipe.nutrition.saturatedFat}
                    onChange={handleChange}
                    error={errors.nutrition?.saturatedFat && touched.nutrition?.saturatedFat}
                    helperText={touched.nutrition?.saturatedFat && errors.nutrition?.saturatedFat}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="sodium"
                    name="nutrition.sodium"
                    label={t("types.recipe.fields.nutrition.sodium.name")}
                    value={recipe.nutrition.sodium}
                    onChange={handleChange}
                    error={errors.nutrition?.sodium && touched.nutrition?.sodium}
                    helperText={touched.nutrition?.sodium && errors.nutrition?.sodium}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="protein"
                    name="nutrition.protein"
                    label={t("types.recipe.fields.nutrition.protein.name")}
                    value={recipe.nutrition.protein}
                    onChange={handleChange}
                    error={errors.nutrition?.protein && touched.nutrition?.protein}
                    helperText={touched.nutrition?.protein && errors.nutrition?.protein}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="carbohydrates"
                    name="nutrition.carbohydrates"
                    label={t("types.recipe.fields.nutrition.carbohydrates.name")}
                    value={recipe.nutrition.carbohydrates}
                    onChange={handleChange}
                    error={errors.nutrition?.carbohydrates && touched.nutrition?.carbohydrates}
                    helperText={touched.nutrition?.carbohydrates && errors.nutrition?.carbohydrates}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
                <Grid item xs={6} md={3} lg={2}>
                  <TextField
                    fullWidth
                    type="number"
                    id="fiber"
                    name="nutrition.fiber"
                    label={t("types.recipe.fields.nutrition.fiber.name")}
                    value={recipe.nutrition.fiber}
                    onChange={handleChange}
                    error={errors.nutrition?.fiber && touched.nutrition?.fiber}
                    helperText={touched.nutrition?.fiber && errors.nutrition?.fiber}
                    InputLabelProps={{ shrink: true }}
                    InputProps={{ inputProps: { min: 0 } }}
                  />
                </Grid>
              </Grid>
            </Box>

            {tags.length > 0 && (
              <Box sx={{ mt: 5 }}>
                <Typography sx={{ mb: 2 }} variant="h6">{t("types.tag.pluralName")}</Typography>
  
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
            )}

            <Box sx={{ mt: 5 }}>
              <TextField
                fullWidth
                margin="normal"
                id="referenceUrl"
                name="referenceUrl"
                label={t("types.recipe.fields.referenceUrl.name")}
                value={recipe.referenceUrl}
                onChange={handleChange}
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
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained" 
                sx={{ mt: 3, mb: 2 }}
                loading={updating}  
              >
                {mode === FormModes.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
              </LoadingButton>
            </Box>
          </Box>
        </form>
      </Box>
    </>
  );
};