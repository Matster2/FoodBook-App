import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import styles from './RecipeImageControl.module.css';

const RecipeImageControl = ({ src, onDeleteClick }) => {
  return (
    <Paper onClick={() => onDeleteClick(src)} sx={{ p: 0.5 }} className={styles.container}>
      <img alt="recipe" className={styles.image} src={src} />
    </Paper>
  );
};

RecipeImageControl.propTypes = {
  src: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func,
};

RecipeImageControl.defaultProps = {
  onDeleteClick: () => { },
};

export default RecipeImageControl;
