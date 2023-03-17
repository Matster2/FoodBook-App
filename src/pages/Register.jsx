import React, { useState, useEffect } from 'react';
import { CssBaseline, Container, Typography, Link, TextField, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import styles from './Register.module.css';
import useInput from '../hooks/useInput';
import useAPI from '../hooks/useAPI';
import { isUndefined, isEmptyOrWhiteSpace, isValidEmail } from '../utils/utils';
import logo from '../assets/logo.svg';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { value: email, onChange: onEmailChange } = useInput('');
  const { value: password, onChange: onPasswordChange } = useInput('');
  const { value: confirmPassword, onChange: onConfirmPasswordChange } = useInput('');

  const [inputErrors, setInputErrors] = useState({
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      email: undefined,
      password: undefined,
      confirmPassword: undefined,
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
          return 'Please enter a valid email';
        }

        return undefined;
      })(),
      password: (() => {
        if (isEmptyOrWhiteSpace(password)) {
          return 'Password is required';
        }

        return undefined;
      })(),

      confirmPassword: (() => {
        if (isEmptyOrWhiteSpace(confirmPassword)) {
          return 'Password is required';
        }

        if (isEmptyOrWhiteSpace(password)) {
          return 'Please confirm your password';
        }

        if (password !== confirmPassword) {
          return 'Passwords do not match';
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return (
      isUndefined(newInputErrors.email) &&
      isUndefined(newInputErrors.password) &&
      isUndefined(newInputErrors.confirmPassword)
    );
  };

  const handleRegisterClick = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      try {
        const {
          data: { isUsed },
        } = await api.queryEmail(email);

        if (isUsed) {
          const newInputErrors = inputErrors;
          newInputErrors.email = 'Email is already used';
          setInputErrors(newInputErrors);
          return;
        }
      } catch (e) {
        return;
      }

      await api.register(email, password);

      navigate('/sign-in');

      // addToast(translate('admin.requests.brands.update.success'), {
      //   appearance: 'success',
      //   autoDismiss: true,
      //   pauseOnHover: false,
      // });
    } catch {
      // addToast(translate('admin.requests.brands.update.failed'), {
      //   appearance: 'error',
      //   autoDismiss: true,
      //   pauseOnHover: false,
      // });
    }
  };

  useEffect(() => {
    clearErrors();
  }, [email, password, confirmPassword]);

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
        <Typography variant="h5">Create an account</Typography>
      </Box>

      <Box
        sx={{
          marginBottom: 5,
        }}
      >
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
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label="Confirm Password"
          type="password"
          id="confirm-password"
          autoComplete="current-password"
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={!isUndefined(inputErrors.confirmPassword)}
          helperText={inputErrors.confirmPassword}
        />
        <Button type="button" onClick={handleRegisterClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Sign Up
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">
          Already have an account?
          <Link sx={{ ml: 1 }} href="register" variant="body2">
            Sign In
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};
