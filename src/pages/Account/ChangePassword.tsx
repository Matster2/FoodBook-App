import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import ChangePasswordForm from "src/forms/account/ChangePasswordForm";
import useAuth from 'src/hooks/useAuth';
import PageLayout from 'src/layouts/PageLayout';

const ChangePassword = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    claims: { userId },
  } = useAuth();

  const onSuccess = () => navigate('/account');

  /* Rendering */
  return (
    <PageLayout
      title={t('pages.changePassword.title')}
    >
      <ChangePasswordForm
        user={{
          id: userId
        }}
        onSuccess={onSuccess}
      />
    </PageLayout>
  );
};

export default ChangePassword;