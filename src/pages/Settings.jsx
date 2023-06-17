import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { useNavigate, Link } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import {
  Container,
  List,
  ListItem,
  Select,
  MenuItem,
  ListItemIcon,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
  Dialog,
  Button,
  DialogContent,
  DialogTitle,
  DialogActions,
  DialogContentText,
} from '@mui/material';
import useAuth from '../hooks/useAuth';
import useAPI from '../hooks/useAPI';
import styles from './Settings.module.css';
import logo from '../assets/logo.svg';
import Header from '../components/Header';
import LanguageDropdown from '../components/LanguageDropdown';
import { LanguageContext } from '../contexts/LanguageContext';
import { capitalizeFirstLetter } from '../utils/stringUtils';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const api = useAPI();

  const { currentLanguage, supportedLanguages, setCurrentLanguage } = useContext(LanguageContext);
  const { logout, authenticated, claims } = useAuth();

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  const handleSignInClick = () => {
    NiceModal.show('authentication-modal');
  };

  const handleLogoutClick = () => {
    logout();
    localStorage.clear();
    toast(t('requests.auth.logout.success'));
  };

  const handleDeleteAccountClick = async () => {
    setDeleteAccountDialogOpen(false);
    await api.deleteMyUser();
    logout();
    toast(t('requests.accounts.delete.success'));
    navigate('/');
  };

  const handleLanguageChange = (code) => {
    setCurrentLanguage(code);
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
        <Header title={t('pages.settings.title')} onBackClick={() => navigate(-1)} />

        <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
          <LanguageDropdown
            fullWidth
            languages={supportedLanguages}
            value={currentLanguage}
            onChange={handleLanguageChange}
          />
        </Box>

        <List sx={{ mt: 1 }}>
          {!authenticated && (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleSignInClick}>
                <ListItemText primary={t('pages.settings.options.signIn')} />
              </ListItemButton>
            </ListItem>
          )}

          {authenticated && claims?.role === 'Administrator' && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/settings">
                <ListItemText primary={t('pages.settings.options.admin')} />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/contact-us">
              <ListItemText primary={t('pages.settings.options.contactUs')} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/privacy-policy">
              <ListItemText primary={t('pages.settings.options.privacyPolicy')} />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/terms-of-service">
              <ListItemText primary={t('pages.settings.options.termsOfService')} />
            </ListItemButton>
          </ListItem>

          <Box sx={{ mt: 2 }}>
            {authenticated && (
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogoutClick}>
                  <ListItemText primary={t('pages.settings.options.logOut')} />
                </ListItemButton>
              </ListItem>
            )}

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                m: 2,
              }}
            >
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  mb: 1,
                }}
              >
                <img className={styles.logo} src={logo} alt="foodbook" />
              </Box>
              <Typography variant="body2">{capitalizeFirstLetter(t('common.version'))} {process.env.REACT_APP_VERSION}</Typography>
            </Box>

            {authenticated && (
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setDeleteAccountDialogOpen(true)}>
                  <ListItemText primary={t('pages.settings.options.deleteAccount')} />
                </ListItemButton>
              </ListItem>
            )}
          </Box>
        </List>
      </Container>
    </>
  );
};
