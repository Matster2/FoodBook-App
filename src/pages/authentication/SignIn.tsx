import { Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import SignInForm from 'src/forms/authentication/SignInForm';
import AuthenticationPageLayout from 'src/layouts/AuthenticationPageLayout';

const SignIn = ({ onSignUpClick, onComplete }) => {
  const { t } = useTranslation();
  var navigate = useNavigate();

  const onSuccess = () => onComplete();

  /* Rendering */
  return (
    <AuthenticationPageLayout
      title={t('pages.signIn.title')}
    >
      <SignInForm
        onSuccess={onSuccess}
      />

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Typography variant="body2">{t('pages.signIn.noAccount')}</Typography>
        <Typography sx={{ ml: 0.5 }} className="link" onClick={onSignUpClick}>
          {t('pages.signIn.links.signUp')}
        </Typography>
      </Stack>
    </AuthenticationPageLayout>
  );
};

export default SignIn;
