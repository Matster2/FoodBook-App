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
import React from 'react';

const RecipePieceOfEquipment = ({ recipePieceOfEquipment, onChange, onDelete }) => {
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
            label="Name"
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
            label="Amount"
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
            label="Depends On Serving"
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