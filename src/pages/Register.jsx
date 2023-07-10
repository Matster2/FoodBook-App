import NiceModal from '@ebay/nice-modal-react';
import { Box, Button, Container, CssBaseline, TextField, Typography } from '@mui/material';
import logo from 'assets/logo.svg';
import useAPI from 'hooks/useAPI';
import useInput from 'hooks/useInput';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { isEmptyOrWhiteSpace, isUndefined, isValidEmail } from 'utils/utils';
import styles from './Register.module.css';

const Register = ({ onSignInClick, onComplete }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const api = useAPI();

  const { value: email, onChange: onEmailChange } = useInput('');
  const { value: password, onChange: onPasswordChange } = useInput('');
  const { value: confirmPassword, onChange: onConfirmPasswordChange } = useInput('');

  const [registering, setRegistering] = useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);

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
          return t('forms.auth.register.inputs.email.validationMessages.empty');
        }

        if (!isValidEmail(email)) {
          return t('forms.auth.register.inputs.email.validationMessages.invalid');
        }

        return undefined;
      })(),
      password: (() => {
        if (isEmptyOrWhiteSpace(password)) {
          return t('forms.auth.register.inputs.password.validationMessages.empty');
        }

        return undefined;
      })(),

      confirmPassword: (() => {
        if (isEmptyOrWhiteSpace(confirmPassword)) {
          return t('forms.auth.register.inputs.confirmPassword.validationMessages.empty');
        }

        if (password !== confirmPassword) {
          return t('forms.auth.register.inputs.confirmPassword.validationMessages.notSame');
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
    setRegistering(true);

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
          newInputErrors.email = t('requests.auth.register.emailAlreadyUsed');
          setInputErrors(newInputErrors);
          return;
        }
      } catch (e) {
        return;
      }

      await api.register(email, password);

      setRegistrationComplete(true);
      toast.success(t('requests.auth.register.success'));
      onComplete();
    } catch {
      toast.error(t('requests.auth.register.error'));
    }

    setRegistering(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    NiceModal.hide('authentication-modal');
  }

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
          <img onClick={handleLogoClick} className={styles.logo} src={logo} alt="foodbook" />
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-start',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }} variant="h1">
          {t('forms.auth.register.title')}
        </Typography>
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
          label={t('forms.auth.register.inputs.email.label')}
          name="email"
          autoComplete="email"
          autoFocus
          disable={registering || registrationComplete}
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
          label={t('forms.auth.register.inputs.password.label')}
          type="password"
          id="password"
          autoComplete="current-password"
          disable={registering || registrationComplete}
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
          label={t('forms.auth.register.inputs.confirmPassword.label')}
          type="password"
          id="confirm-password"
          autoComplete="current-password"
          disable={registering || registrationComplete}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={!isUndefined(inputErrors.confirmPassword)}
          helperText={inputErrors.confirmPassword}
        />
        <Button
          disable={registering || registrationComplete}
          type="button"
          onClick={handleRegisterClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('forms.auth.register.buttons.submit.label')}
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">
          {t('pages.register.alreadyHaveAccount')}
          <Typography sx={{ ml: 0.5 }} display="inline" className="link" onClick={onSignInClick}>
            {t('pages.register.links.signIn')}
          </Typography>
        </Typography>
      </Box>
    </Container>
  );
};

Register.propTypes = {
  onSignInClick: PropTypes.func.isRequired,
  onComplete: PropTypes.func.isRequired,
};

export default Register;
