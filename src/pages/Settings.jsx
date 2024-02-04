import NiceModal from '@ebay/nice-modal-react';
import {
  Box,
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material';
import { useContext } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import logo from 'src/assets/logo.svg';
import Header from 'src/components/Header';
import LanguageDropdown from 'src/components/LanguageDropdown';
import { LanguageContext } from 'src/contexts/LanguageContext';
import useAPI from 'src/hooks/useAPI';
import useAuth from 'src/hooks/useAuth';
import styles from './Settings.module.css';

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const api = useAPI();

  const { currentLanguage, supportedLanguages, setCurrentLanguage } = useContext(LanguageContext);
  const { logout, authenticated, claims } = useAuth();

  const handleSignInClick = () => {
    NiceModal.show('authentication-modal');
  };

  const handleLogoutClick = () => {
    logout();
    localStorage.clear();
    toast(t('requests.auth.logout.success'));
  };

  const handleLanguageChange = (code) => {
    setCurrentLanguage(code);
  }

  return (
    <>
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

          {authenticated && (
            <ListItem disablePadding>
              <ListItemButton to="/account">
                <ListItemText primary={t('pages.settings.options.account')} />
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
              <Typography variant="body2">{t('common.version')} {import.meta.env.VITE_APP_VERSION}</Typography>
            </Box>

            {/* {authenticated && (
              <ListItem disablePadding>
                <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setDeleteAccountDialogOpen(true)}>
                  <ListItemText primary={t('pages.settings.options.deleteAccount')} />
                </ListItemButton>
              </ListItem>
            )} */}
          </Box>
        </List>
      </Container>
    </>
  );
};
