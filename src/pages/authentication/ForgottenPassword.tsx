import NiceModal from '@ebay/nice-modal-react';
import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import ForgotPasswordForm from 'src/forms/authentication/ForgotPasswordForm';
import AuthenticationPageLayout from 'src/layouts/AuthenticationPageLayout';

const ForgottenPassword = ({ onSignInClick, onComplete }) => {
  const { t } = useTranslation();
  var navigate = useNavigate();

  const onSuccess = () => {
    navigate('/');
    NiceModal.hide('authentication-modal');
  }

  /* Rendering */
  return (
    <AuthenticationPageLayout
      title={t('pages.forgotPassword.title')}
    >
      <ForgotPasswordForm
        onSuccess={onSuccess}
      />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography sx={{ ml: 0.5 }} className="link" onClick={onSignInClick}>
          {t('pages.forgotPassword.links.signIn')}
        </Typography>
      </Box>
    </AuthenticationPageLayout>
  );
};

ForgottenPassword.propTypes = {
  onSignInClick: PropTypes.func,
  onComplete: PropTypes.func,
};

ForgottenPassword.defaultProps = {
  onComplete: () => { }
};

export default ForgottenPassword;
