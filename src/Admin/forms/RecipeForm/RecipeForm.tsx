import { yupResolver } from "@hookform/resolvers/yup";
import { LoadingButton } from "@mui/lab";
import { Autocomplete, Button, Grid, Stack, TextField } from "@mui/material";
import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from "react";
import { DragDropContext, Draggable, DropResult, Droppable } from "react-beautiful-dnd";
import { FormProvider, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import uuid from "react-uuid";
import api from 'src/api';
import FilterOption from "src/components/FilterOption";
import Section from "src/components/Section";
import FormAutoComplete from "src/components/form-components/FormAutoComplete";
import FormCheckbox from "src/components/form-components/FormCheckbox";
import FormDropdown from "src/components/form-components/FormDropdown";
import FormNumberField from "src/components/form-components/FormNumberField";
import FormRecipeIngredient from "src/components/form-components/FormRecipeIngredient";
import FormRecipePart from "src/components/form-components/FormRecipePart";
import FormRecipePieceOfEquipment from "src/components/form-components/FormRecipePieceOfEquipment";
import FormRecipeStep from "src/components/form-components/FormRecipeStep";
import FormTextField from 'src/components/form-components/FormTextField';
import { AdminCreateRecipeDto, AdminIngredientDto, AdminPieceOfEquipmentDto, AdminTagDto, AdminUpdateRecipeDto, RecipeDifficulty, RecipeType } from "src/generatedAPI";
import { default as useSearchQuery } from "src/hooks/useSearchQuery";
import { Operation } from 'src/types';
import { isUndefined } from "src/utils/utils";
import * as yup from "yup";

interface FormValues {
  name: string;
  description: string;
  type?: RecipeType;
  difficulty: RecipeDifficulty;
  prepTime: number;
  cookTime: number;
  totalTime: number;
  servings: number;
  containsAlcohol: boolean;
  ingredients: [];
  parts: [];
  steps: [];
  nutrition: {
    calories?: number;
    sugar?: number;
    fat?: number;
    saturatedFat?: number;
    sodium?: number;
    protein?: number;
    carbohydrates?: number;
    fiber?: number;
  };
  tags: {
    id: string;
  }[];
  referenceUrl: string;
}

const defaultValues: FormValues = {
  name: '',
  description: '',
  type: undefined,
  difficulty: RecipeDifficulty.Average,
  prepTime: 0,
  cookTime: 0,
  totalTime: 0,
  servings: 1,
  containsAlcohol: false,
  ingredients: [],
  parts: [],
  steps: [],
  nutrition: {
    calories: undefined,
    sugar: undefined,
    fat: undefined,
    saturatedFat: undefined,
    sodium: undefined,
    protein: undefined,
    carbohydrates: undefined,
    fiber: undefined
  },
  tags: [],
  referenceUrl: "",
}

interface RecipeFormProps {
  recipe: any;
  onSuccess: () => void
}

const RecipeForm = ({
  recipe,
  onSuccess = () => { }
}: RecipeFormProps) => {
  const { t } = useTranslation();

  const {
    data: availableTags
  } = useQuery({
    queryKey: ["admin", "tags"],
    queryFn: () => api.admin.admin_GetTags()
      .then(({ data }) => data.results),
    initialData: []
  });
  const [showAddIngredientButton, setShowAddIngredientButton] = useState<boolean>(false);
  const [showAddEquipmentButton, setShowAddEquipmentButton] = useState<boolean>(false);

  const {
    search: authorSearch,
    setSearch: setAuthorSearch,
    loading: loadingAvailableAuthors,
    results: availableAuthors
  } = useSearchQuery({
    queryFn: async () => {
      const { data: { results } } = await api.admin.admin_GetAuthors({ search: authorSearch, pageSize: 50, sortBy: 'name' });
      return results;
    },
    delay: 1000
  });

  const {
    search: ingredientSearch,
    setSearch: setIngredientSearch,
    loading: loadingAvailableIngredients,
    results: availableIngredients
  } = useSearchQuery({
    queryFn: async () => {
      const { data: { results } } = await api.admin.admin_GetIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });
      return results;
    },
    delay: 1000
  });

  const {
    search: equipmentSearch,
    setSearch: setEquipmentSearch,
    loading: loadingAvailableEquipment,
    results: availableEquipment
  } = useSearchQuery({
    queryFn: async () => {
      const { data: { results } } = await api.admin.admin_GetEquipment({ search: equipmentSearch, pageSize: 50, sortBy: 'name' });
      return results;
    },
    delay: 1000
  });

  // const { search: ingredientSearch, setIngredientSearch, ingredientSearchResults, searchingIngredients] = useSearch(async () => {
  //   const { data: { results, totalResults } } = await api.admin.admin_GetIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });

  //   if (!isNullOrEmpty(ingredientSearch) && (totalResults === 0 || !results.some(x => x.name.toLowerCase() === ingredientSearch.toLowerCase() || x.pluralName.toLowerCase() === ingredientSearch.toLowerCase()))) {
  //     setShowAddIngredientButton(true);
  //   }

  //   return results;
  // }, { delay: 1000 })

  const mode = isUndefined(recipe?.id) ? Operation.Create : Operation.Update;

  const schema = yup.object().shape({
    name: yup.string().required(),
    icon: yup.string()
  });

  const methods = useForm({
    defaultValues: {
      ...defaultValues,
      ...recipe
    },
    resolver: yupResolver(schema),
  });
  const { handleSubmit, control, formState: { isDirty, isValid }, reset } = methods;
  const { fields: parts, append: addPart, remove: removePart, move: movePart } = useFieldArray({ control, name: "parts", keyName: "key" });
  const { fields: steps, append: addStep, remove: removeStep, move: moveStep } = useFieldArray({ control, name: "steps", keyName: "key" });
  const { fields: ingredients, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients", keyName: "key" });
  const { fields: equipment, append: addPieceOfEquipment, remove: removePieceOfEquipment } = useFieldArray({ control, name: "equipment", keyName: "key" });
  const { fields: tags, append: addTag, remove: removeTag } = useFieldArray({ control, name: "tags", keyName: "key" });
  const { fields: images, append: addImage, remove: removeImage } = useFieldArray({ control, name: "images", keyName: "key" });

  const {
    isPending: isCreatingTag,
    mutate: createTag,
  } = useMutation({
    mutationFn: async (data: {
      body: AdminCreateRecipeDto
    }) => {
      return api.admin.admin_CreateRecipe(data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.recipes.create.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.recipes.create.error"));
    }
  })

  const {
    isPending: isUpdatingRecipe,
    mutate: updateRecipe,
  } = useMutation({
    mutationFn: (data: {
      id: string,
      body: AdminUpdateRecipeDto
    }) => {
      return api.admin.admin_UpdateRecipe(data.id, data.body)
    },
    onSuccess: () => {
      toast.success(t("requests.recipes.update.success"));
      onSuccess();
      reset();
    },
    onError: () => {
      toast.error(t("requests.recipes.update.error"));
    }
  })

  const onSubmitHandler: SubmitHandler<FormValues> = async (data: FormValues) => {
    if (mode === Operation.Create) {
      createTag({
        body: {
          languageCode: "en",
          name: data.name,
        }
      })
    } else {
      updateRecipe({
        id: recipe.id,
        body: {
          name: data.name,
        }
      })
    }
  };

  /* Handlers */
  const handleStepDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    moveStep(result.source.index, result.destination.index);
  }

  const handleTagClick = (tag: AdminTagDto) => {
    const index = tags.findIndex(x => x.id === tag.id);

    (index > -1)
      ? removeTag(index)
      : addTag({
        id: tag.id,
        name: tag.name
      });
  }

  const handleAddPartClick = () => {
    addPart({
      id: uuid(),
      name: "",
      ingredients: []
    })
  }

  const handleAddStepClick = () => {
    addStep({
      id: uuid(),
      name: "",
      instructions: [{
        id: uuid(),
        instruction: ""
      }]
    })
  }

  const handleAddIngredient = (ingredient: AdminIngredientDto) => {
    var existingIngredient = ingredients.find(x => x.ingredient.id === ingredient.id);

    addIngredient({
      id: uuid(),
      ingredient,
      amount: undefined,
      optional: existingIngredient ? !existingIngredient.optional : false,
      unitOfMeasurement: {
        id: ingredient.defaultUnitOfMeasurement.id,
      },
    });
  }

  const handleAddPieceOfEquipment = (pieceOfEquipment: AdminPieceOfEquipmentDto) => {
    console.log(pieceOfEquipment)
    addPieceOfEquipment({
      id: uuid(),
      pieceOfEquipment,
      amount: undefined,
      dependsOnServings: false
    });
  }

  const handleAddingNewIngredient = (name) => {
    // newPersonalIngredientDialog.show({
    //   open: true,
    //   ingredient: {
    //     name,
    //     pluralName: name
    //   },
    //   onClose: () => newPersonalIngredientDialog.remove(),
    //   onComplete: (newIngredient) => {
    //     newPersonalIngredientDialog.remove();
    //     handleAddIngredient(newIngredient);
    //   }
    // });
  }

  const handleAddingNewIngredientPieceOfEquipment = (name) => {
  }

  /* Rendering */
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitHandler)}>
        <FormTextField
          required
          name="name"
          fullWidth
          label={t("types.recipe.fields.name.name")}
        />
        <FormTextField
          name="description"
          fullWidth
          label={t("types.recipe.fields.description.name")}
          multiline
          rows={2}
        />
        <FormDropdown
          required
          name="type"
          fullWidth
          label={t("types.recipe.fields.type.name")}
          options={Object.keys(RecipeType).map((type) => ({
            value: type,
            label: type
          }))}
        />
        <FormDropdown
          required
          name="type"
          fullWidth
          label={t("types.recipe.fields.difficulty.name")}
          options={Object.keys(RecipeDifficulty).map((difficulty) => ({
            value: difficulty,
            label: difficulty
          }))}
        />

        <Grid container spacing={2}>
          <Grid item xs={6} md={3} lg={2}>
            <FormNumberField
              required
              name="prepTime"
              fullWidth
              label={t("types.recipe.fields.prepTime.name")}
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <FormNumberField
              required
              name="cookTime"
              fullWidth
              label={t("types.recipe.fields.cookTime.name")}
              min={0}
            />
          </Grid>
          <Grid item xs={6} md={3} lg={2}>
            <FormNumberField
              required
              name="totalTime"
              fullWidth
              label={t("types.recipe.fields.totalTime.name")}
              min={0}
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={6} md={3} lg={2}>
            <FormNumberField
              required
              name="servings"
              fullWidth
              label={t("types.recipe.fields.servings.name")}
              min={0}
            />
          </Grid>
        </Grid>

        <FormCheckbox
          name="containsAlcohol"
          label={t("types.recipe.fields.containsAlcohol.name")}
        />

        <Section title={t("types.author.name")}>
          <FormAutoComplete
            name="author"
            fullWidth
            label={t("types.author.name")}
            loading={loadingAvailableAuthors}
            options={availableAuthors.map((author) => ({ label: author.name, author }))}
          />
        </Section>

        <Section title={t("types.ingredient.pluralName")}>
          <Stack gap={1}>
            {ingredients.map((recipeIngredient, index) => (
              <FormRecipeIngredient
                key={index}
                name={`ingredients.${index}`}
                onDelete={() => removeIngredient(index)}
              />
            ))}
          </Stack>

          <Autocomplete
            fullWidth
            sx={{ mt: 2 }}
            loading={loadingAvailableIngredients}
            options={availableIngredients.map((ingredient) => ({ label: ingredient.name, ingredient }))}
            filterOptions={(options, _state) => {
              let newOptions = options
                .filter((option) =>
                  ingredients
                    .filter((recipeIngredient) => recipeIngredient.ingredient.id === option.ingredient.id).length < 2);

              if (showAddIngredientButton) {
                newOptions.push({ label: `${t("common.words.actions.add")} ${t("types.ingredient.name")} "${ingredientSearch}"`, ingredient: undefined })
              }

              return newOptions;
            }}
            renderInput={(params) => <TextField {...params} label={`${t("common.words.actions.add")} ${t("types.ingredient.name")}`} />}
            inputValue={ingredientSearch}
            onInputChange={(event, newValue) => {
              setIngredientSearch(newValue);
              setShowAddIngredientButton(false);
            }}
            onChange={(event, value) => {
              setIngredientSearch('');

              if (value) {
                if (!isUndefined(value?.ingredient)) {
                  handleAddIngredient(value.ingredient);
                } else {
                  //handleAddingNewIngredient(value.name)
                }
              }
            }}
          />
        </Section>

        <Section>
          {parts.map((part, index) => (
            <FormRecipePart
              key={index}
              name={`parts.${index}`}
              onDelete={() => removePart(index)}
            />
          ))}

          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={handleAddPartClick}
          >
            {`${t("common.words.actions.add")} ${t("types.recipe.fields.parts.singularName")}`}
          </Button>
        </Section>

        <Section title={t("types.pieceOfEquipment.pluralName")}>
          {equipment.map((pieceOfEquipment, index) => (
            <FormRecipePieceOfEquipment
              key={index}
              name={`links.${index}`}
              onDelete={() => removePieceOfEquipment(index)}
            />
          ))}

          <Autocomplete
            fullWidth
            sx={{ mt: 2 }}
            loading={loadingAvailableEquipment}
            options={availableEquipment.map((pieceOfEquipment) => ({ label: pieceOfEquipment.name, pieceOfEquipment }))}
            filterOptions={(options, _state) => {
              let newOptions = options
                .filter((option) =>
                  !equipment.some((recipePieceOfEquipment) => recipePieceOfEquipment.pieceOfEquipment.id === option.pieceOfEquipment.id));

              if (showAddEquipmentButton) {
                newOptions.push({ label: `${t("common.words.actions.add")} ${t("types.pieceOfEquipment.name")} "${equipmentSearch}"`, pieceOfEquipment: undefined })
              }

              return newOptions;
            }}
            renderInput={(params) => <TextField {...params} label={`${t("common.words.actions.add")} ${t("types.pieceOfEquipment.name")}`} />}
            onInputChange={(event, newValue) => {
              setEquipmentSearch(newValue);
              setShowAddEquipmentButton(false);
            }}
            onChange={(event, value) => {
              setEquipmentSearch('');

              if (value) {
                if (!isUndefined(value?.pieceOfEquipment)) {
                  handleAddPieceOfEquipment(value.pieceOfEquipment);
                } else {
                  //NewPieceOfEquipment(value.name)
                }
              }
            }}
          />
        </Section>

        <Section title={t("types.recipe.fields.steps.instructions.name")}>
          <DragDropContext onDragEnd={handleStepDragEnd}>
            <Droppable droppableId="droppable-steps" direction="vertical">
              {(provided, snapshot) => (
                <Stack sx={{ mt: 2 }} direction="column" gap={2}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {steps.map((step, index) => (
                    <Draggable key={index} draggableId={index} index={index}>
                      {(provided, snapshot) => (
                        <FormRecipeStep
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          dragHandleProps={provided.dragHandleProps}
                          key={index}
                          name={`steps.${index}`}
                          onDelete={() => removeStep(index)}
                        />
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </Stack>
              )}
            </Droppable>
          </DragDropContext>

          <Button sx={{ mt: 2 }} variant="contained" onClick={handleAddStepClick}>
            {`${t("common.words.actions.add")} ${t("types.recipe.fields.steps.singularName")}`}
          </Button>
        </Section>

        <Section title={t("types.recipe.fields.nutrition.name")}>
          <Grid container spacing={2}>
            <Grid item xs={6} md={3} lg={2}>
              <FormNumberField
                required
                name={`nutrition.calories`}
                fullWidth
                label={t(`types.recipe.fields.nutrition.calories.name`)}
                min={0}
              />
            </Grid>
            {Object.keys(defaultValues.nutrition)
              .filter(x => x !== "calories")
              .map((key) => (
                <Grid item key={key} xs={6} md={3} lg={2}>
                  <FormNumberField
                    required
                    name={`nutrition.${key}`}
                    fullWidth
                    label={t(`types.recipe.fields.nutrition.${key}.name`)}
                    min={0}
                  />
                </Grid>
              ))}
          </Grid>
        </Section>

        {availableTags.length > 0 && (
          <Section title={t("types.tag.pluralName")}>
            <Stack direction="row" alignItems="center" gap={2} sx={{ mt: 1, flexWrap: 'wrap', gap: 1 }}>
              {availableTags.map((tag) => (
                <FilterOption
                  key={tag.id}
                  label={tag.name}
                  value={tag.id}
                  onClick={() => handleTagClick(tag)}
                  active={tags.some((x) => x.id === tag.id)}
                />
              ))}
            </Stack>
          </Section>
        )}

        <FormTextField
          name="referenceUrl"
          fullWidth
          label={t("types.recipe.fields.referenceUrl.name")}
        />

        <LoadingButton
          sx={{ mt: 5 }}
          type="submit"
          fullWidth
          variant="contained"
          disabled={!isDirty || !isValid}
          loading={isCreatingTag || isUpdatingRecipe}
        >
          {mode === Operation.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
        </LoadingButton>
      </form >
    </FormProvider >
  )
}

export default RecipeForm;