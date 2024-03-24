import { Clear as ClearIcon, DragIndicator as DragIcon } from '@mui/icons-material';
import { Autocomplete, Box, IconButton, Stack, TextField, Typography } from '@mui/material';
import { forwardRef, useState } from 'react';
import { DraggableProvidedDragHandleProps } from "react-beautiful-dnd";
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from "react-i18next";
import uuid from 'react-uuid';
import api from 'src/api';
import FormTextField from 'src/components/form-components/FormTextField';
import useSearchQuery from 'src/hooks/useSearchQuery';
import { isUndefined } from 'src/utils/utils';
import FormRecipeIngredient from '../FormRecipeIngredient';
import styles from './styles.module.css';

interface FormRecipePartProps {
  name: string;
  onDelete: () => void;
  dragHandleProps: DraggableProvidedDragHandleProps;
}

const FormRecipePart = forwardRef(({
  name,
  onDelete,
  dragHandleProps,
  ...props
}: FormRecipePartProps, ref) => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();
  const { fields: ingredients, append: addIngredient, remove: removeIngredient } = useFieldArray({ control, name: "ingredients", keyName: "key" });


  const [showAddIngredientButton, setShowAddIngredientButton] = useState<boolean>(false);

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

  /* Handlers */
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

  /* Rendering */
  return (
    <Box sx={{ py: 2 }} className={styles.part} ref={ref} {...props}>
      <Typography sx={{ mb: 1.5, ml: 1 }} className={styles.number}>{t("types.recipe.fields.parts.singularName")} {watch("number")}</Typography>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          display="flex"
          alignItems="center"
          {...dragHandleProps}
        >
          <DragIcon className={styles.dragIcon} />
        </Box>

        <Stack direction="row" alignItems="center" gap={1}>
          <FormTextField
            name={`${name}.name`}
            fullWidth
            label={t("types.recipe.fields.parts.fields.name.name")}
            disabled
          />

          <IconButton onClick={() => onDelete()}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </Stack>

      <Box sx={{ mt: 1 }}>
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
      </Box>
    </Box>
  );
});

export default FormRecipePart