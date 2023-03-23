import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import NiceModal from '@ebay/nice-modal-react';
import { Container, List, ListItem, ListItemButton, ListItemText, Box, Typography } from '@mui/material';
import useAuth from '../hooks/useAuth';
import styles from './Settings.module.css';
import logo from '../assets/logo.svg';
import Header from '../components/Header';

export default () => {
  const navigate = useNavigate();

  const { authenticated } = useAuth();

  const handleSignInClick = () => {
    NiceModal.show('authentication-modal');
  };

  return (
    <Container>
      <Header title="" onBackClick={() => navigate(-1)} />

      <List>
        {!authenticated && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} onClick={handleSignInClick}>
              <ListItemText primary="Sign In" />
            </ListItemButton>
          </ListItem>
        )}

        <ListItem disablePadding>
          <ListItemButton component={Link} to="/contact-us">
            <ListItemText primary="Contact Us" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Privacy Policy" />
          </ListItemButton>
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton>
            <ListItemText primary="Terms of Service" />
          </ListItemButton>
        </ListItem>

        {authenticated && (
          <ListItem disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
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
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary="Delete account" />
            </ListItemButton>
          </ListItem>
        )}
      </List>
    </Container>
  );
};
