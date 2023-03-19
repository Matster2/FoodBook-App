import React, { useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { Close as CloseIcon } from '@mui/icons-material';
import { Dialog, DialogTitle, IconButton } from '@mui/material';

import SignIn from '../../pages/SignIn';
import Register from '../../pages/Register';
import ForgottenPassword from '../../pages/ForgottenPassword';

import styles from './AuthenticationModal.module.css';

const pages = {
  signIn: 'sign-in',
  register: 'register',
  forgottenPassword: 'forgotten-password',
};

export default NiceModal.create(() => {
  const [page, setPage] = useState(pages.signIn);
  const modal = useModal();

  const handleModalClose = () => {
    setPage(pages.signIn);
    modal.hide();
  };

  const renderPage = () => {
    if (page === pages.register) {
      return <Register onSignInClick={() => setPage(pages.signIn)} onComplete={() => setPage(pages.signIn)} />;
    }

    if (page === pages.forgottenPassword) {
      return <ForgottenPassword onSignInClick={() => setPage(pages.signIn)} onComplete={() => setPage(pages.signIn)} />;
    }

    return (
      <SignIn
        onSignUpClick={() => setPage(pages.register)}
        onForgottenPasswordClick={() => setPage(pages.forgottenPassword)}
        onComplete={handleModalClose}
      />
    );
  };

  return (
    <Dialog
      fullScreen
      open={modal.visible}
      onClose={() => {}}
      // TransitionComponent={Transition}
      PaperProps={{
        style: {
          backgroundColor: '#F6F6F6',
        },
      }}
    >
      <DialogTitle disableTypography className={styles.dialogTitle}>
        <IconButton onClick={handleModalClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      {renderPage()}
    </Dialog>
  );
});
