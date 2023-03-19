import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Container, Typography, TextField, Button, Box } from '@mui/material';
import useInput from '../hooks/useInput';
import useAPI from '../hooks/useAPI';
import { isUndefined, isEmptyOrWhiteSpace } from '../utils/utils';
import styles from './ForgottenPassword.module.css';
import logo from '../assets/logo.svg';

const ForgottenPassword = ({ onSignInClick, onComplete }) => {
  const navigate = useNavigate();
  const api = useAPI();

  const { value: email, onChange: onEmailChange } = useInput('');

  const [inputErrors, setInputErrors] = useState({
    email: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      email: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      email: (() => {
        if (isEmptyOrWhiteSpace(email)) {
          return 'Email is required';
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return isUndefined(newInputErrors.email);
  };

  const handleResetPasswordClick = async () => {
    try {
      if (!validateInputs()) {
        return;
      }

      await api.forgotPassword(email);

      onComplete();

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
  }, [email]);

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
        <Typography variant="h1">Forgotten Password</Typography>
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
        <Button type="button" onClick={handleResetPasswordClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          Reset Password
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">
          {/* <Link sx={{ ml: 1 }} href="/sign-in" variant="body2">
            Return to Sign In
          </Link> */}
          <Typography sx={{ ml: 0.5 }} display="inline" className="link" onClick={onSignInClick}>
            Sign In
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

ForgottenPassword.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default ForgottenPassword;
