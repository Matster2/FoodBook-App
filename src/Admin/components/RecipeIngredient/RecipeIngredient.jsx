import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { UnitOfMeasurementContext } from 'contexts/UnitOfMeasurementContext';
import PropTypes from 'prop-types';
import React, { useContext } from 'react';

const RecipeIngredient = ({ recipeIngredient, onChange, onDelete }) => {
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
            autoFocus
            value={recipeIngredient.name}
            disabled
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={() => onDelete(recipeIngredient)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        <Grid item xs={6}>
          <TextField
            fullWidth
            required
            id="amount"
            label="Amount"
            name="amount"
            type="number"
            autoFocus
            value={recipeIngredient.amount}
            onChange={handleChange}
            InputProps={{ inputProps: { min: 0 } }}
          />
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              id="id"
              name="unitOfMeasurement.id"
              labelId="type-label"
              label="Type"
              onChange={handleUnitOfMeasurementChange}
              value={`${recipeIngredient.unitOfMeasurement.id}`}
            >
              {unitOfMeasurements.map((unitOfMeasurement) => (
                <MenuItem key={unitOfMeasurement.id} value={unitOfMeasurement.id}>{unitOfMeasurement.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

RecipeIngredient.propTypes = {
  recipeIngredient: PropTypes.shape({
    name: PropTypes.string,
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
};

export default RecipeIngredient