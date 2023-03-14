import React from 'react';
import { CssBaseline, Container, Typography, Box } from '@mui/material';

export default () => (
  <Container component="main" maxWidth="lg">
    <CssBaseline />
    <Box>
      <Typography component="h3" variant="h5">
        Welcome, Matthew
      </Typography>
      <Typography component="h1" variant="h5">
        What would you like to cook today?
      </Typography>

      <Typography component="h2" variant="h5">
        Categories
      </Typography>

      <Typography component="h2" variant="h5">
        Recommendations
      </Typography>

      <Typography component="h2" variant="h5">
        Favourite Recipes
      </Typography>
    </Box>
  </Container>
);
