import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const RecipePieceOfEquipment = ({ recipePieceOfEquipment, onChange, onDelete }) => {
  const { t } = useTranslation();

  const handleChange = (e) => {
    onChange({
      ...recipePieceOfEquipment,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = (e) => {
    onChange({
      ...recipePieceOfEquipment,
      [e.target.name]: e.target.checked,
    });
  };

  return (
    <Box sx={{ py: 2 }}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={9} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            required
            id="name"
            label={t("types.recipe.fields.equipment.fields.name.name")}
            name="name"
            value={recipePieceOfEquipment.name}
            disabled
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={() => onDelete(recipePieceOfEquipment)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6} display="flex">
          <TextField
            fullWidth
            required
            id="amount"
            label={t("types.recipe.fields.equipment.fields.amount.name")}
            name="amount"
            type="number"
            value={recipePieceOfEquipment.amount}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 1 } }}
          />
        </Grid>
        <Grid item xs={6} display="flex" justifyContent="center" alignItems="center">
          
         <FormControlLabel
            control={
              <Checkbox
                id="dependsOnServings"
                name="dependsOnServings"  
                checked={recipePieceOfEquipment.dependsOnServings}              
                onChange={handleCheckboxChange}
              />
            }
            label={t("types.recipe.fields.equipment.fields.dependsOnServing.name")}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

RecipePieceOfEquipment.propTypes = {
  recipePieceOfEquipment: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    dependsOnServings: PropTypes.bool
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipePieceOfEquipment.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

export default RecipePieceOfEquipment