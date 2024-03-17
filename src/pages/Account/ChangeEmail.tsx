import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';
import ChangeEmailForm from "src/forms/account/ChangeEmailForm";
import useAuth from 'src/hooks/useAuth';
import PageLayout from 'src/layouts/PageLayout';

const ChangeEmail = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    claims: { userId },
  } = useAuth();

  const onSuccess = () => navigate('/account');

  /* Rendering */
  return (
    <PageLayout
      title={t('pages.changeEmail.title')}
    >
      <ChangeEmailForm
        user={{
          id: userId
        }}
        onSuccess={onSuccess}
      />
    </PageLayout>
  );
};

export default ChangeEmail;