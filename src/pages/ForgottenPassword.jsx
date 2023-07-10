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
import { isEmptyOrWhiteSpace, isUndefined } from 'utils/utils';
import styles from './ForgottenPassword.module.css';

const ForgottenPassword = ({ onSignInClick, onComplete }) => {
  const { t } = useTranslation();
  var navigate = useNavigate();
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
          return t('forms.auth.forgotPassword.inputs.email.validationMessages.empty');
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
      toast.success(t('requests.auth.forgottenPassword.success'));
    } catch {
      toast.error(t('requests.auth.forgottenPassword.error'));
    }
  };

  const handleLogoClick = () => {
    navigate('/');
    NiceModal.hide('authentication-modal');
  }

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
        <Typography variant="h1">{t('pages.forgotPassword.title')}</Typography>
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
          label={t('forms.auth.forgotPassword.inputs.email.label')}
          name="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={onEmailChange}
          error={!isUndefined(inputErrors.email)}
          helperText={inputErrors.email}
        />
        <Button type="button" onClick={handleResetPasswordClick} fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
          {t('forms.auth.forgotPassword.buttons.submit.label')}
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography variant="body2">
          <Typography sx={{ ml: 0.5 }} display="inline" className="link" onClick={onSignInClick}>
            {t('pages.forgotPassword.links.signIn')}
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
