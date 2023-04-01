import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import {
  Container,
  List,
  ListItem,
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

export default () => {
  const navigate = useNavigate();

  const api = useAPI();

  const { logout, authenticated, claims } = useAuth();

  const [deleteAccountDialogOpen, setDeleteAccountDialogOpen] = useState(false);

  const handleSignInClick = () => {
    NiceModal.show('authentication-modal');
  };

  const handleLogoutClick = () => {
    logout();
    localStorage.clear();
    toast('You have been logged out');
  };

  const handleDeleteAccountClick = async () => {
    setDeleteAccountDialogOpen(false);
    await api.deleteMyUser();
    logout();
    toast('Your account has been deleted');
    navigate('/');
  };

  return (
    <>
      <Dialog
        open={deleteAccountDialogOpen}
        onClose={() => setDeleteAccountDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Are you sure you want to delete your account?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action is irreversable. Once your account is deleted, it cannot be recovered.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteAccountDialogOpen(false)}>No</Button>
          <Button onClick={handleDeleteAccountClick} autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
      <Container>
        <Header title="Settings" onBackClick={() => navigate(-1)} />

        <List>
          {!authenticated && (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleSignInClick}>
                <ListItemText primary="Sign In" />
              </ListItemButton>
            </ListItem>
          )}

          {authenticated && claims?.role === 'Administrator' && (
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/settings">
                <ListItemText primary="Admin" />
              </ListItemButton>
            </ListItem>
          )}

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/contact-us">
              <ListItemText primary="Contact Us" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/privacy-policy">
              <ListItemText primary="Privacy Policy" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton component={Link} to="/terms-of-service">
              <ListItemText primary="Terms of Service" />
            </ListItemButton>
          </ListItem>

          {authenticated && (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={handleLogoutClick}>
                <ListItemText primary="Log Out" />
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
            <Typography variant="body2">Version {process.env.REACT_APP_VERSION}</Typography>
          </Box>

          {authenticated && (
            <ListItem disablePadding>
              <ListItemButton sx={{ textAlign: 'center' }} onClick={() => setDeleteAccountDialogOpen(true)}>
                <ListItemText primary="Delete account" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Container>
    </>
  );
};
