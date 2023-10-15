import { useModal } from '@ebay/nice-modal-react';
import {
  Clear as ClearIcon,
  DragIndicator as DragIcon
} from '@mui/icons-material';
import {
  Autocomplete,
  Box,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import RecipeIngredient from 'Admin/components/RecipeIngredient';
import NewPersonalIngredientDialog from 'dialogs/NewPersonalIngredientDialog';
import useAPI from 'hooks/useAPI';
import useSearch from 'hooks/useSearch';
import PropTypes from 'prop-types';
import { forwardRef, useState } from 'react';
import { useTranslation } from "react-i18next";
import uuid from 'react-uuid';
import { isNullOrEmpty, isUndefined } from 'utils/utils';
import styles from './RecipePart.module.css';

const RecipePart = forwardRef(({ recipePart, onChange, onDelete, dragHandleProps, ...props }, ref) => {
  const { t } = useTranslation();
  const api = useAPI();
  
  const newPersonalIngredientDialog = useModal(NewPersonalIngredientDialog);
  
  const [showAddIngredientButton, setShowAddIngredientButton] = useState(false);
  
  const [ingredientSearch, setIngredientSearch, ingredientSearchResults, searchingIngredients] = useSearch(async () => {
    const { data: { results, totalResults } } = await api.getIngredients({ search: ingredientSearch, pageSize: 50, sortBy: 'name' });
    
    if (!isNullOrEmpty(ingredientSearch) && (totalResults === 0 || !results.some(x => x.name.toLowerCase() === ingredientSearch.toLowerCase() || x.pluralName.toLowerCase() === ingredientSearch.toLowerCase()))) {
      setShowAddIngredientButton(true);
    }
    
    return results;
  }, { delay: 2000 })

  const handleChange = (e) => {
    onChange({
      ...recipePart,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleAddIngredient = (ingredient) => {
    var existingIngredient = recipePart.ingredients.find(x => x.ingredient.id === ingredient.id)

    const recipeIngredient = {
      id: uuid(),
      ingredient: ingredient,
      amount: undefined,
      optional: existingIngredient ? !existingIngredient.optional: false,
      unitOfMeasurement: {
        id: ingredient.defaultUnitOfMeasurement.id,
      },
    };

    const newRecipeIngredients = recipePart.ingredients.slice();
    newRecipeIngredients.push(recipeIngredient);

    onChange({
      ...recipePart,
      ingredients: newRecipeIngredients,
    });
  };
  
  const handleRecipeIngredientChange = (newRecipeIngredient) => {
    const newRecipeIngredients = [ ...recipePart.ingredients];

    const index = newRecipeIngredients.findIndex((x) => x.id === newRecipeIngredient.id && x.optional === newRecipeIngredient.optional);

    newRecipeIngredients[index] = newRecipeIngredient;

    onChange({
      ...recipePart,
      ingredients: newRecipeIngredients,
    });
  };

  const handleDeleteRecipeIngredient = (newRecipeIngredient) => {
    const newRecipeIngredients = recipePart.ingredients.filter(
      (x) => !(x.id === newRecipeIngredient.id && x.optional === newRecipeIngredient.optional)
    );

    onChange({
      ...recipePart,
      ingredients: newRecipeIngredients,
    });
  };

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
          handleAddIngredient(newIngredient);
        }
      });
  }

  return (
    <Box sx={{ py: 2 }} className={styles.part} ref={ref} {...props}>
      <Typography sx={{ mb: 1.5, ml: 1 }} className={styles.number}>{t("types.recipe.fields.parts.singularName")} {recipePart.number}</Typography>

      <Stack direction="row" alignItems="center" gap={1}>
        <Box
          display="flex"
          alignItems="center"
          {...dragHandleProps}
        >
          <DragIcon className={styles.dragIcon} />
        </Box>

        <Stack direction="row" gap={10} display="flex" justifyContent="space-between" alignItems="center">        
          <TextField
            fullWidth
            required
            id="name"
            label={t("types.recipe.fields.parts.fields.name.name")}
            name="name"
            value={recipePart.name}
            onChange={handleChange}
          />
          
          <IconButton onClick={() => onDelete(recipePart)}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </Stack>     

      <Box sx={{ mt: 1 }}>
        <Box>
          {recipePart.ingredients.map((recipeIngredient) => (
            <RecipeIngredient
              key={recipeIngredient.id}
              recipeIngredient={recipeIngredient}
              onChange={handleRecipeIngredientChange}
              onDelete={handleDeleteRecipeIngredient}
              optionalDisabled={recipePart.ingredients.filter(x => x.id === recipeIngredient.id).length > 1}
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
                  recipePart.ingredients.filter(
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
    </Box>
  );
});

RecipePart.propTypes = {
  recipePart: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipePart.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

export default RecipePart