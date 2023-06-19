import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { CssBaseline, Container, Typography, TextField, Button, Box } from '@mui/material';
import Header from '../../components/Header';
import useAuth from '../../hooks/useAuth';
import useInput from '../../hooks/useInput';
import useAPI from '../../hooks/useAPI';
import { isUndefined, isEmptyOrWhiteSpace, isValidEmail } from '../../utils/utils';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const api = useAPI();

  const {
    claims: { userId },
  } = useAuth();

  const { value: currentPassword, onChange: onCurrentPasswordChange } = useInput('');
  const { value: newPassword, onChange: onNewPasswordChange } = useInput('');
  const { value: confirmPassword, onChange: onConfirmPasswordChange } = useInput('');

  const [changingPassword, setChangingPassword] = useState(false);
  const [changePasswordComplete, setChangePasswordComplete] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    currentPassword: undefined,
    newPassword: undefined,
    confirmPassword: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      currentPassword: undefined,
      newPassword: undefined,
      confirmPassword: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      currentPassword: (() => {
        if (isEmptyOrWhiteSpace(currentPassword)) {
          return t('forms.auth.changePassword.inputs.currentPassword.validationMessages.empty');
        }

        return undefined;
      })(),
      newPassword: (() => {
        if (isEmptyOrWhiteSpace(newPassword)) {
          return t('forms.auth.changePassword.inputs.newPassword.validationMessages.empty');
        }

        if (currentPassword === newPassword) {
          return t('forms.auth.changePassword.inputs.newPassword.validationMessages.sameAsCurrent');
        }

        return undefined;
      })(),
      confirmPassword: (() => {
        if (isEmptyOrWhiteSpace(confirmPassword)) {
          return t('forms.auth.changePassword.inputs.confirmPassword.validationMessages.empty');
        }

        if (newPassword !== confirmPassword) {
          return t('forms.auth.changePassword.inputs.confirmPassword.validationMessages.notSame');
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return (
      isUndefined(newInputErrors.currentPassword) &&
      isUndefined(newInputErrors.newPassword) &&
      isUndefined(newInputErrors.confirmPassword)
    );
  };

  const handleChangePasswordClick = async () => {
    setChangingPassword(true);

    if (!validateInputs()) {
      setChangingPassword(false);
      return;
    }

    try {
      await api.changePassword(userId, currentPassword, newPassword);
      setChangePasswordComplete(true);
      toast.success(t('requests.auth.changePassword.success'));
      navigate('/account')
    } catch (e) {
      if (!isUndefined(e.response) && e.response.status === 400) {
        toast.error(t('requests.auth.changePassword.invalid'));
      } else {
        toast.error(t('requests.auth.changePassword.error'));
      }
    }

    setChangingPassword(false);
  };

  useEffect(() => {
    clearErrors();
  }, [currentPassword, newPassword, confirmPassword]);

  return (
    <Container>
      <Header title={t('pages.changePassword.title')} onBackClick={() => navigate(-1)} />

      <Box
        sx={{
          marginBottom: 5,
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          type="password"
          id="currentPassword"
          label={t('forms.auth.changePassword.inputs.currentPassword.label')}
          name="currentPassword"
          autoFocus
          disable={changingPassword || changePasswordComplete}
          value={currentPassword}
          onChange={onCurrentPasswordChange}
          error={!isUndefined(inputErrors.currentPassword)}
          helperText={inputErrors.currentPassword}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="newPassword"
          label={t('forms.auth.changePassword.inputs.newPassword.label')}
          type="password"
          id="newPassword"
          disable={changingPassword || changePasswordComplete}
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
          label={t('forms.auth.changePassword.inputs.confirmPassword.label')}
          type="password"
          id="confirm-password"
          disable={changingPassword || changePasswordComplete}
          value={confirmPassword}
          onChange={onConfirmPasswordChange}
          error={!isUndefined(inputErrors.confirmPassword)}
          helperText={inputErrors.confirmPassword}
        />
        <Button
          disable={changingPassword || changePasswordComplete}
          type="button"
          onClick={handleChangePasswordClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('forms.auth.changePassword.buttons.submit.label')}
        </Button>
      </Box>
    </Container>
  );
};
