import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import useAuth from '../../hooks/useAuth';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const api = useAPI();

  const { logout } = useAuth();

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  const handleDeleteAccountClick = async () => {
    setDeleteAccountDialogOpen(false);
    await api.deleteMyUser();
    logout();
    toast(t('requests.accounts.delete.success'));
    navigate('/');
  }

  return (
    <>
      <Dialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{t('forms.accounts.delete.title')}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {t('forms.accounts.delete.description')}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialogOpen(false)}>{t('forms.accounts.delete.buttons.cancel.label')}</Button>
          <Button onClick={handleDeleteAccountClick} autoFocus>
            {t('forms.accounts.delete.buttons.submit.label')}
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Header title={t('pages.accountSettings.title')} onBackClick={() => navigate(-1)} />
        <List sx={{ mt: 1 }}>
          <ListItem disablePadding>
            <ListItemButton component={Link} to="/change-password">
              <ListItemText primary={t('pages.accountSettings.options.changePassword')} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding sx={{ mt: 4 }}>
            <ListItemButton onClick={() => setDeleteAccountDialogOpen(true)}>
              <ListItemText primary={t('pages.accountSettings.options.deleteAccount')} />
            </ListItemButton>
          </ListItem>
        </List>
      </Container>
    </>
  );
};
