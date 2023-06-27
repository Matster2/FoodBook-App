import React from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { Field } from 'formik';
import {
  Box,
  TextField,
  Grid,
  Button,
  IconButton,
  Stack
} from '@mui/material';
import { Clear as ClearIcon } from '@mui/icons-material';

const RecipeStep = ({ step, onChange, onDelete }) => {
  const handleChange = (e) => {
    onChange({
      ...step,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddInstructionClick = () => {
    const newInstructions = [...step.instructions];
    newInstructions.push({
      id: uuid(),
      instruction: ""
    })

    onChange({
      ...step,
      instructions: newInstructions
    });
  };

  const handleInstructionChange = (id, value) => {
    const newInstructions = [...step.instructions];

    const index = newInstructions.findIndex((x) => x.id === id);

    newInstructions[index].instruction = value;

    onChange({
      ...step,
      instructions: newInstructions
    });
  }

  const handleRemoveInstruction = (id) => {
    const newInstructions = step.instructions.filter(x => x.id !== id);

    onChange({
      ...step,
      instructions: newInstructions
    });
  }

  return (
    <Box sx={{ border: 1, borderColor: 'grey.500', p: 2 }}>
      <Grid container spacing={1} justifyContent="space-between">
        <Grid item xs={9} sx={{ mb: 1 }}>
          <TextField
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoFocus
            value={step.name}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs="auto">
          <IconButton onClick={() => onDelete(step)}>
            <ClearIcon />
          </IconButton>
        </Grid>
      </Grid>

      {step.instructions.map((instruction) => (
        <Stack direction="row" gap={1}>
          <Field
            as={TextField}
            margin="normal"
            fullWidth
            multiline
            rows={2}
            required
            value={instruction.instruction}
            onChange={(e) => handleInstructionChange(instruction.id, e.target.value)}
            label="instruction"
            id="instruction"
          />

          <IconButton onClick={() => handleRemoveInstruction(instruction.id)}>
            <ClearIcon />
          </IconButton>
        </Stack>
      ))}

      <Button type="button" onClick={handleAddInstructionClick} variant="contained">
        Add Instruction
      </Button>
    </Box>
  );
};

RecipeStep.propTypes = {
  step: PropTypes.shape({
    name: PropTypes.string,
    instructions: PropTypes.arrayOf(PropTypes.shape({
      instruction: PropTypes.string
    })),
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

RecipeStep.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

export default RecipeStep