import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Typography, IconButton } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import styles from './Header.module.css';

const Header = ({ title, onBackClick }) => {
  const handleBackClick = () => {
    onBackClick();
  };

  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4, mb: 2 }}>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={handleBackClick}>
          <ChevronLeftIcon />
        </IconButton>
      </Grid>
      <Grid item xs="auto">
        <Typography variant="h6" className={styles.title}>
          {title}
        </Typography>
      </Grid>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
      </Grid>
    </Grid>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  onBackClick: PropTypes.func.isRequired,
};

Header.defaultProps = {
  title: '',
};

export default Header;
