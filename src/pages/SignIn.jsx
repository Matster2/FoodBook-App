import NiceModal from '@ebay/nice-modal-react';
import { LoadingButton } from "@mui/lab";
import { Box, Container, TextField, Typography } from '@mui/material';
import logo from 'assets/logo.svg';
import useAuth from 'hooks/useAuth';
import useInput from 'hooks/useInput';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import { isEmptyOrWhiteSpace, isUndefined, isValidEmail } from 'utils/utils';
import styles from './SignIn.module.css';

const SignIn = ({ onSignUpClick, onForgottenPasswordClick, onComplete }) => {
  const { t } = useTranslation();
  var navigate = useNavigate();
  const auth = useAuth();

  const { value: email, onChange: onEmailChange } = useInput('');
  const { value: password, onChange: onPasswordChange } = useInput('');

  const [signingIn, setSigningIn] = useState(false);
  const [signedIn, setSignedin] = useState(false);

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
          return t('forms.auth.signIn.inputs.email.validationMessages.empty');
        }

        if (!isValidEmail(email)) {
          return t('forms.auth.signIn.inputs.email.validationMessages.invalid');
        }

        return undefined;
      })(),
      password: (() => {
        if (isEmptyOrWhiteSpace(password)) {
          return t('forms.auth.signIn.inputs.password.validationMessages.empty');
        }

        return undefined;
      })(),
    };

    setInputErrors(newInputErrors);

    return isUndefined(newInputErrors.email) && isUndefined(newInputErrors.password);
  };

  const handleSignInClick = async () => {
    setSigningIn(true);

    if (!validateInputs()) {
      setSigningIn(false);
      return;
    }

    try {
      await auth.login(email, password);
      setSignedin(true);
      toast.success(t('requests.auth.signIn.success'));
      onComplete();
    } catch (e) {
      if (!isUndefined(e.response) && e.response.status === 400) {
        toast.error(t('requests.auth.signIn.invalid'));
      } else {
        toast.error(t('requests.auth.signIn.error'));
      }
    }

    setSigningIn(false);
  };

  const handleLogoClick = () => {
    navigate('/');
    NiceModal.hide('authentication-modal');
  }

  useEffect(() => {
    clearErrors();
  }, [email, password]);

  return (
    <Container component="main" maxWidth="xs">
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
        <Typography variant="h1">{t('pages.signIn.title')}</Typography>
      </Box>

      <Box sx={{ mt: 1 }}>
        <TextField
          margin="normal"
          required
          fullWidth
          id="email"
          label={t('forms.auth.signIn.inputs.email.label')}
          name="email"
          autoComplete="email"
          autoFocus
          disabled={signedIn || signingIn}
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
          label={t('forms.auth.signIn.inputs.password.label')}
          type="password"
          id="password"
          autoComplete="current-password"
          disabled={signedIn || signingIn}
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
          <Typography inline className="link" onClick={onForgottenPasswordClick}>
            {t('pages.signIn.links.forgottenPassword')}
          </Typography>
        </Box>

        <LoadingButton
          loading={signedIn || signingIn}
          type="button"
          onClick={handleSignInClick}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          {t('forms.auth.signIn.buttons.submit.label')}
        </LoadingButton>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Typography variant="body2">
            {t('pages.signIn.noAccount')}
            <Typography sx={{ ml: 0.5 }} display="inline" className="link" onClick={onSignUpClick}>
              {t('pages.signIn.links.signUp')}
            </Typography>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

SignIn.propTypes = {
  onSignUpClick: PropTypes.func,
  onForgottenPasswordClick: PropTypes.func,
  onComplete: PropTypes.func,
};

SignIn.defaultProps = {
  onComplete: () => {}
};

export default SignIn;
