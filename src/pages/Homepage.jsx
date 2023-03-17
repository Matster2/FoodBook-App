import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Container, Typography, Box, TextField, InputAdornment, IconButton, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { AccountCircle, Alarm as AlarmIcon } from '@mui/icons-material';
import RecipeTile from '../components/RecipeTile';

const Section = ({ title, children }) => (
  <div>
    <Grid
      xs={12}
      container
      justifyContent="space-between"
      alignItems="center"
      flexDirection={{ xs: 'column', sm: 'row' }}
    >
      <Grid>
        <Typography variant="h6">{title}</Typography>
      </Grid>
      <Grid>
        <Link to="/recipes">See all</Link>
      </Grid>
    </Grid>

    {children}
  </div>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default () => (
  <Container component="main" maxWidth="lg">
    <CssBaseline />
    <Box>
      <Typography variant="subtitle1">Welcome, Matthew</Typography>
      <Typography variant="h6">What would you like to cook today?</Typography>

      <TextField
        id="input-with-icon-adornment"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
      />
      <IconButton>
        <AlarmIcon />
      </IconButton>

      <Section title="Recently Viewed" />
      <Section title="Categories" />
      <Section title="Recommendations" />
      <Section title="Favourite Recipes">
        <RecipeTile
          recipe={{
            title: 'Chicken Bowl',
            rating: 4.5,
            totalTime: 30,
          }}
        />
        <RecipeTile
          recipe={{
            title: 'Cream Pasta',
            rating: 4.1,
            totalTime: 30,
          }}
        />
        <RecipeTile
          recipe={{
            title: 'Red Pasta',
            rating: 4.2,
            totalTime: 30,
          }}
        />
        <RecipeTile
          recipe={{
            title: 'Chicken Curry',
            rating: 4.6,
            totalTime: 30,
          }}
        />
      </Section>
    </Box>
  </Container>
);
