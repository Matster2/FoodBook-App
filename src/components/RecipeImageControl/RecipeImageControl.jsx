import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@mui/material';
import useLongPress from '../../hooks/useLongPress';
import styles from './RecipeImageControl.module.css';

const RecipeImageControl = ({ src, onDeleteClick }) => {
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };

  const onLongClick = () => {
    onDeleteClick();
  };

  const onClick = () => { }

  const longPressEvent = useLongPress(onLongClick, onClick, defaultOptions);

  return (
    <Paper {...longPressEvent} sx={{ p: 0.5 }} className={styles.container}>
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
