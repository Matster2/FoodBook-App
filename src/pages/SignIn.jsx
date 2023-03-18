import React, { useEffect, useState } from 'react';
import { CssBaseline, Container, Typography, Link, TextField, Button, Box } from '@mui/material';
import useInput from '../hooks/useInput';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
import { isUndefined, isEmptyOrWhiteSpace, isValidEmail } from '../utils/utils';
import styles from './SignIn.module.css';
import logo from '../assets/logo.svg';

export default () => {
  const api = useAPI();
  const auth = useAuth();

  const { value: email, onChange: onEmailChange } = useInput('');
  const { value: password, onChange: onPasswordChange } = useInput('');

  const [inputErrors, setInputErrors] = useState({
    email: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      email: undefined,
      password: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      email: (() => {
        if (isEmptyOrWhiteSpace(email)) {
          return 'Email is required';
        }

        if (!isValidEmail(email)) {
          return 'Invalid email';
        }

        return undefined;
      })(),
      password: (() => {
        if (isEmptyOrWhiteSpace(email)) {
          return 'Password is required';
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return isUndefined(newInputErrors.email) && isUndefined(newInputErrors.password);
  };

  const login = async () => {
    if (!validateInputs()) {
      return;
    }

    try {
      await auth.login(email, password);
    } catch (e) {
      if (!isUndefined(e.response) && e.response.status === 400) {
        setErrorMessage('invalid login');
      } else {
        // presentAlert({
        //   header: 'Alert',
        //   subHeader: 'Something went wrong',
        //   message: 'Please try again later',
        //   buttons: ['OK'],
        // });
      }
    }
  };

  useEffect(() => {
    clearErrors();
  }, [email, password]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img className={styles.logo} src={logo} alt="foodbook" />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Typography variant="h1">Sign In</Typography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onEmailChange}
          error={!isUndefined(inputErrors.email)}
          helperText={inputErrors.email}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={onPasswordChange}
          error={!isUndefined(inputErrors.password)}
          helperText={inputErrors.password}
        />

        <Box
          sx={{
            marginBottom: 4,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Link href="/forgotten-password" variant="body2">
            Forgot password?
          </Link>
        </Box>

        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign In
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2">
            Don&apos;t have an account?
            <Link sx={{ ml: 1 }} href="/register" variant="body2">
              Sign Up
            </Link>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};
