import React, { useMemo, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import NiceModal from '@ebay/nice-modal-react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { CssBaseline, Container, Typography, TextField, Button, Box } from '@mui/material';
import Header from '../components/Header';
import useAuth from '../hooks/useAuth';
import useInput from '../hooks/useInput';
import useAPI from '../hooks/useAPI';
import styles from './ResetPassword.module.css';
import logo from '../assets/logo.svg';
import { isUndefined, isEmptyOrWhiteSpace, isValidEmail, isNull } from '../utils/utils';

export default () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);
  const api = useAPI();

  const [email, setEmail] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  const { value: newPassword, onChange: onNewPasswordChange } = useInput('');
  const { value: confirmPassword, onChange: onConfirmPasswordChange } = useInput('');

  const [resettingPassword, setResettingPassword] = useState(false);
  const [resetPasswordComplete, setResetPasswordComplete] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    newPassword: undefined,
    confirmPassword: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      newPassword: undefined,
      confirmPassword: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      newPassword: (() => {
        if (isEmptyOrWhiteSpace(newPassword)) {
          return t('forms.auth.resetPassword.inputs.newPassword.validationMessages.empty');
        }

        return undefined;
      })(),
      confirmPassword: (() => {
        if (isEmptyOrWhiteSpace(confirmPassword)) {
          return t('forms.auth.resetPassword.inputs.confirmPassword.validationMessages.empty');
        }

        if (newPassword !== confirmPassword) {
          return t('forms.auth.resetPassword.inputs.confirmPassword.validationMessages.notSame');
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return (
      isUndefined(newInputErrors.newPassword) &&
      isUndefined(newInputErrors.confirmPassword)
    );
  };

  /* Handlers */
  const handleResetPasswordClick = async () => {
    setResettingPassword(true);

    if (!validateInputs()) {
      setResettingPassword(false);
      return;
    }

    try {
      await api.resetPassword(email, resetToken, newPassword);
      setResetPasswordComplete(true);
      toast.success(t('requests.auth.resetPassword.success'));
      navigate('/account')
    } catch (e) {
      toast.error(t('requests.auth.resetPassword.error'));
    }

    setResettingPassword(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    NiceModal.hide('authentication-modal');
  }

  /* Effects */
  useEffect(() => {
    const _email = searchParams.get('email');
    const _token = searchParams.get('token');

    console.log(_email)

    if (isNull(_email) || isNull(_token)) {
      navigate('/');
      return
    }

    setEmail(_email);
    setResetToken(_token);

  }, [])

  useEffect(() => {
    clearErrors();
  }, [newPassword, confirmPassword]);

  if (isNull(email) || isNull(resetToken)) {
    return <Container />
  }

  /* Rendering */
  return (
    <Container>
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
        <Typography variant="h1">{t('pages.resetPassword.title')}</Typography>
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
          name="newPassword"
          label={t('forms.auth.resetPassword.inputs.newPassword.label')}
          type="password"
          id="newPassword"
          disable={resettingPassword || resetPasswordComplete}
          value={newPassword}
          onChange={onNewPasswordChange}
          error={!isUndefined(inputErrors.newPassword)}
          helperText={inputErrors.newPassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="confirm-password"
          label={t('forms.auth.resetPassword.inputs.confirmPassword.label')}
          type="password"
          id="confirm-password"
          disable={resettingPassword || resetPasswordComplete}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={!isUndefined(inputErrors.confirmPassword)}
          helperText={inputErrors.confirmPassword}
        />
        <Button
          disable={resettingPassword || resetPasswordComplete}
          type="button"
          onClick={handleResetPasswordClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('forms.auth.resetPassword.buttons.submit.label')}
        </Button>
      </Box>
    </Container>
  );
};
