import React from 'react';
import { CssBaseline, Container, Typography, Button, TextField } from '@mui/material';
import useFilters from '../hooks/useFilters';

export default () => {
  const { filters, setFilter } = useFilters({});

  const types = ['Breakfast', 'Lunch', 'Dinner', 'Snack'];
  const times = ['Fast', 'Medium', 'Long'];

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />

      <Typography variant="h6">Type</Typography>
      {types.map((type) => (
        <Button variant="text">{type}</Button>
      ))}

      <Typography variant="h6">Time</Typography>
      {times.map((time) => (
        <Button variant="text">{time}</Button>
      ))}

      <Typography variant="h6">Ingredients</Typography>
      <TextField margin="normal" fullWidth id="add-ingredient" label="+ Add Ingredients" name="add-ingredient" />

      <Typography variant="h6">Rating</Typography>

      <Button fullWidth variant="contained">
        Apply Filters
      </Button>
    </Container>
  );
};
