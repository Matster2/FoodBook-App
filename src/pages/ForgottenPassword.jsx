import React from 'react';
import { CssBaseline, Container, Typography, Grid, Link, TextField, Button, Box } from '@mui/material';

export default () => (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h5">
        Forgotten Password
      </Typography>
      <Box component="form" noValidate sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
        />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Reset Password
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="/sign-in" variant="body2">
              Sign in
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  </Container>
);
