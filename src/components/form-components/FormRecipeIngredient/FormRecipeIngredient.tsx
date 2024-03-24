import { Clear as ClearIcon } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import { useTranslation } from "react-i18next";
import FormCheckbox from 'src/components/form-components/FormCheckbox';
import FormDropdown from 'src/components/form-components/FormDropdown';
import FormNumberField from 'src/components/form-components/FormNumberField';
import FormTextField from 'src/components/form-components/FormTextField';
import { UnitOfMeasurement } from 'src/generatedAPI';
import useUnitOfMeasurementsQuery from "src/hooks/queries/useUnitOfMeasurementsQuery";

interface FormRecipeIngredientProps {
  name: string;
  onDelete: () => void;
}

const FormRecipeIngredient = ({
  name,
  onDelete
}: FormRecipeIngredientProps) => {
  const { t } = useTranslation();

  const {
    data: unitOfMeasurements
  } = useUnitOfMeasurementsQuery();

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1}>
        <FormTextField
          name={`${name}.ingredient.name`}
          fullWidth
          label={t("types.recipe.fields.ingredients.fields.name.name")}
          disabled
        />

        <IconButton onClick={() => onDelete()}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Stack direction="row" alignItems="center" gap={1}>
        <FormNumberField
          required
          name={`${name}.amount`}
          fullWidth
          sx={{ flex: 1 }}
          label={t("types.recipe.fields.ingredients.fields.amount.name")}
          min={0}
        />
        <FormDropdown
          required
          name={`${name}.unitOfMeasurement.id`}
          fullWidth
          sx={{ flex: 2 }}
          label={t("types.recipe.fields.ingredients.fields.unitOfMeasurement.name")}
          options={unitOfMeasurements.map((unitOfMeasurements: UnitOfMeasurement) => ({
            value: unitOfMeasurements.id,
            label: unitOfMeasurements.name
          }))}
        />
        <FormCheckbox
          name={`${name}.optional`}
          label={t("types.recipe.fields.ingredients.fields.optional.name")}
        />
      </Stack>
    </Box>
  );
};

export default FormRecipeIngredient;