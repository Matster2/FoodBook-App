import { Clear as ClearIcon } from '@mui/icons-material';
import { Box, Grid, IconButton, Stack } from '@mui/material';
import { useTranslation } from "react-i18next";
import FormNumberField from 'src/components/form-components/FormNumberField';
import FormTextField from 'src/components/form-components/FormTextField';
import FormCheckbox from '../FormCheckbox';

interface FormRecipePieceOfEquipmentProps {
  name: string;
  onDelete: () => void;
}

const FormRecipePieceOfEquipment = ({
  name,
  onDelete
}: FormRecipePieceOfEquipmentProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1}>
        <FormTextField
          name={`${name}.name`}
          fullWidth
          label={t("types.recipe.fields.equipment.fields.name.name")}
          disabled
        />

        <IconButton onClick={() => onDelete()}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormNumberField
            name={`${name}.amount`}
            fullWidth
            label={t("types.recipe.fields.equipment.fields.amount.name")}
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
          <FormCheckbox
            name={`${name}.dependsOnServings`}
            label={t("types.recipe.fields.equipment.fields.dependsOnServing.name")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default FormRecipePieceOfEquipment;