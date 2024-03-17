import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import ResetPasswordForm from 'src/forms/authentication/ResetPasswordForm';
import AuthenticationPageLayout from 'src/layouts/AuthenticationPageLayout';
import { isNull } from 'src/utils/utils';

export default () => {
  const { t } = useTranslation();
  const { search } = useLocation();
  const navigate = useNavigate();
  const searchParams = useMemo(() => new URLSearchParams(search), [search]);

  const [email, setEmail] = useState<string | null>();
  const [resetToken, setResetToken] = useState<string | null>();

  /* Effects */
  useEffect(() => {
    const _email = searchParams.get('email');
    const _token = searchParams.get('token');

    if (isNull(_email) || isNull(_token)) {
      navigate('/');
      return
    }

    setEmail(_email);
    setResetToken(_token);
  }, [])

  const onSuccess = () => navigate('/');

  /* Rendering */
  return (
    <AuthenticationPageLayout
      title={t('pages.resetPassword.title')}
    >
      <ResetPasswordForm
        email={email!}
        resetToken={resetToken!}
        onSuccess={onSuccess}
      />
    </AuthenticationPageLayout >
  );
};
