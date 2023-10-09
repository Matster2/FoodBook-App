import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField } from '@mui/material';
import Header from 'components/Header';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import useInput from 'hooks/useInput';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { isEmptyOrWhiteSpace, isUndefined } from 'utils/utils';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const api = useAPI();

  const {
    claims: { userId },
  } = useAuth();

  const { value: newEmail, onChange: onNewEmailChange } = useInput('');
  const { value: password, onChange: onPasswordChange } = useInput('');

  const [changingEmail, setChangingEmail] = useState(false);
  const [changeEmailComplete, setChangeEmailComplete] = useState(false);

  const [inputErrors, setInputErrors] = useState({
    newEmail: undefined,
    password: undefined,
  });
  const [errorMessage, setErrorMessage] = useState(undefined);

  const clearErrors = () => {
    setInputErrors({
      newEmail: undefined,
      password: undefined,
    });
    setErrorMessage(undefined);
  };

  const validateInputs = () => {
    const newInputErrors = {
      newEmassword: (() => {
        if (isEmptyOrWhiteSpace(newEmail)) {
          return t('forms.auth.changeEmail.inputs.currentPassword.validationMessages.empty');
        }

        return undefined;
      })(),
      password: (() => {
        if (isEmptyOrWhiteSpace(password)) {
          return t('forms.auth.changeEmail.inputs.password.validationMessages.empty');
        }
        
        return undefined;
      })()
    };

    setInputErrors(newInputErrors);

    return (
      isUndefined(newInputErrors.newEmail) &&
      isUndefined(newInputErrors.password)
    );
  };

  const handleChangeEmailClick = async () => {
    setChangingEmail(true);

    if (!validateInputs()) {
      setChangingEmail(false);
      return;
    }

    try {
      await api.changeEmail(userId, newEmail, password);
      setChangeEmailComplete(true);
      toast.success(t('requests.auth.changeEmail.success'));
      navigate('/account')
    } catch (e) {
      if (e?.response?.status === 403) {
        toast.error(t('requests.auth.changeEmail.invalid'));
      } else if (e?.response?.status === 400) {
        toast.error(t('requests.auth.changeEmail.emailAlreadyTaken'));
      } else {
        toast.error(t('requests.auth.changeEmail.error'));
      }
    }

    setChangingEmail(false);
  };

  useEffect(() => {
    clearErrors();
  }, [newEmail, password]);

  return (
    <Container>
      <Header title={t('pages.changeEmail.title')} onBackClick={() => navigate(-1)} />

      <Box
        sx={{
          marginBottom: 5,
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="newEmail"
          label={t('forms.auth.changeEmail.inputs.newEmail.label')}
          name="newEmail"
          autoFocus
          disabled={changingEmail || changeEmailComplete}
          value={newEmail}
          onChange={onNewEmailChange}
          error={!isUndefined(inputErrors.newEmail)}
          helperText={inputErrors.newEmail}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="password"
          label={t('forms.auth.changeEmail.inputs.password.label')}
          type="password"
          id="password"
          disabled={changingEmail || changeEmailComplete}
          value={password}
          onChange={onPasswordChange}
          error={!isUndefined(inputErrors.password)}
          helperText={inputErrors.password}
        />
        <LoadingButton
          loading={changingEmail || changeEmailComplete}
          type="button"
          onClick={handleChangeEmailClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('forms.auth.changeEmail.buttons.submit.label')}
        </LoadingButton>
      </Box>
    </Container>
  );
};
