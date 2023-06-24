import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import {
  CircularProgress,
  Typography,
  Box,
  Grid,
  Stack,
  List,
} from '@mui/material';
import { Link } from 'react-router-dom';
import styles from './Section.module.css';

const Section = ({ title, loading, showSeeAllLink, onSeeAllClick, children, ...props }) => {

  const { t } = useTranslation();

  return (
    <Box sx={{ mb: 2 }} {...props}>
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        {showSeeAllLink && (
          <Grid item xs="auto">
            <Typography className={styles.seeAll} onClick={onSeeAllClick}>{t('components.section.seeAll')}</Typography>
          </Grid>
        )}
      </Grid>

      <List style={{ overflow: 'auto' }}>
        <Stack direction="row" alignItems="center" gap={2}>
          {loading && (
            <Box>
              <CircularProgress />
            </Box>
          )}

          {children}
        </Stack>
      </List>
    </Box>
  )
}

Section.propTypes = {
  title: PropTypes.string.isRequired,
  loading: PropTypes.bool,
  showSeeAllLink: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Section.defaultProps = {
  loading: false,
  showSeeAllLink: false,
  onSeeAllClick: () => { }
};

export default Section;
