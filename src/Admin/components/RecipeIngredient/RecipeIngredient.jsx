import { Clear as ClearIcon } from '@mui/icons-material';
import {
    Box,
    Checkbox,
    FormControl,
    FormControlLabel,
    IconButton,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useTranslation } from "react-i18next";
import { UnitOfMeasurementContext } from 'src/contexts/UnitOfMeasurementContext';

const RecipeIngredient = ({ recipeIngredient, onChange, onDelete, optionalDisabled }) => {
  const { t } = useTranslation();
  const { unitOfMeasurements } = useContext(UnitOfMeasurementContext);

  const handleChange = (e) => {
    onChange({
      ...recipeIngredient,
      [e.target.name]: e.target.value,
    });
  };

  const handleUnitOfMeasurementChange = (e) => {
    onChange({
      ...recipeIngredient,
      unitOfMeasurement: {
        id: e.target.value,
      }
    })
  }

  const handleCheckboxChange = (e) => {
    onChange({
      ...recipeIngredient,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box sx={{ py: 2 }}>
      <Stack display="flex" direction="row" justifyContent="center" gap={1} sx={{ mb: 1 }}>
        <TextField
          fullWidth
          required
          id="name"
          label={t("types.recipe.fields.ingredients.fields.name.name")}
          name="name"
          value={recipeIngredient.ingredient.name}
          disabled
        />
        
        <IconButton onClick={() => onDelete(recipeIngredient)}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Stack display="flex" direction="row" justifyContent="center" gap={1}>
        <TextField
          fullWidth
          required
          sx={{ flex: 1 }}
          id="amount"
          label={t("types.recipe.fields.ingredients.fields.amount.name")}
          name="amount"
          type="number"
          value={recipeIngredient.amount}
          onChange={handleChange}
          InputProps={{ 
            min: 0,
            step: "any"
          }}
        />
        <FormControl 
          fullWidth
          sx={{ flex: 2 }}
        >
          <InputLabel id="type-label">{t("types.recipe.fields.ingredients.fields.unitOfMeasurement.name")}</InputLabel>
          <Select
            id="id"
            name="unitOfMeasurement.id"
            labelId="type-label"
            label={t("types.recipe.fields.ingredients.fields.unitOfMeasurement.name")}
            onChange={handleUnitOfMeasurementChange}
            value={`${recipeIngredient.unitOfMeasurement.id}`}
          >
            {unitOfMeasurements.map((unitOfMeasurement) => (
              <MenuItem key={unitOfMeasurement.id} value={unitOfMeasurement.id}>{unitOfMeasurement.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControlLabel
          control={
            <Checkbox
              id="optional"
              name="optional"  
              checked={recipeIngredient.optional}              
              onChange={handleCheckboxChange}
              disabled={optionalDisabled}
            />
          }
          label={t("types.recipe.fields.ingredients.fields.optional.name")}
        />
      </Stack>
    </Box>
  );
};

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    ingredient: PropTypes.shape({
      name: PropTypes.string,
    }),
    amount: PropTypes.number,
    unitOfMeasurement: PropTypes.shape({
      id: PropTypes.string,
    })
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipeIngredient.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
  optionalDisabled: false
};

export default RecipeIngredient