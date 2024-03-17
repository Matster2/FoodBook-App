import { Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import RegisterForm from 'src/forms/authentication/RegisterForm';
import AuthenticationPageLayout from 'src/layouts/AuthenticationPageLayout';

const Register = ({ onSignInClick, onComplete }) => {
  const { t } = useTranslation();

  const onSuccess = () => onComplete();

  return (
    <AuthenticationPageLayout
      title={t('pages.register.title')}
    >
      <RegisterForm
        onSuccess={onSuccess}
      />

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="body2">
          {t('pages.register.alreadyHaveAccount')}
        </Typography>
        <Typography sx={{ ml: 0.5 }} className="link" onClick={onSignInClick}>
          {t('pages.register.links.signIn')}
        </Typography>
      </Stack>
    </AuthenticationPageLayout>
  );
};

export default Register;
