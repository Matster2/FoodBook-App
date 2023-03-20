import React from 'react';
import { Grid, Typography, Icon, IconButton } from '@mui/material';
import { ChevronLeft as ChevronLeftIcon } from '@mui/icons-material';
import styles from './Header.module.css';
import HeartIcon from '../../assets/icons/heart.svg';

const Header = () => {
  return (
    <Grid container justifyContent="space-between" alignItems="center" sx={{ mt: 4 }}>
      <Grid
        item
        xs={1}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton>
          <ChevronLeftIcon />
        </IconButton>
      </Grid>
      <Grid item xs="auto">
        <Typography variant="h6" className={styles.title}>
          Recipe List
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
        <IconButton>
          <Icon style={{ fill: 'green' }} sx={{ color: 'black' }}>
            <img
              style={{ fill: 'green' }}
              className={styles.icon}
              alt="favourite"
              src={HeartIcon}
              height={22}
              width={22}
            />
          </Icon>
        </IconButton>
      </Grid>
    </Grid>
  );
};

Header.propTypes = {};

Header.defaultProps = {};

export default Header;
