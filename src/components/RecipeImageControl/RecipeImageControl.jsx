import { Cancel as DeleteIcon, RestaurantMenu as RecipeIcon } from '@mui/icons-material';
import { Box, Paper } from '@mui/material';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
import useLongPress from 'src/hooks/useLongPress';
import styles from './RecipeImageControl.module.css';

const RecipeImageControl = ({ src, onClick, onLongClick, onDeleteClick, alwaysShowDelete, ...props }) => {
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  
  const [errored, setErrored] = useState(false);
  
  const onError = () => {
    setErrored(true);
  }

  const handleLongClick = (e) => {
    onLongClick();
  };

  const handleClick = (e) => {
    onClick()
  }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteClick();
  }

  const longPressEvent = useLongPress(handleLongClick, handleClick, defaultOptions);

  const image = useMemo(() => {
    if (!src || errored) {
      return (
        <Box className={styles.noImages} display="flex" justifyContent="center" alignItems="center" {...props}>
          <RecipeIcon className={styles.noImagesIcon} />
        </Box>
      )
    }
  
    return (
      <img
        className={styles.image}
        src={src}
        alt="recipe" 
        onError={onError}
        {...longPressEvent}
      />
    )
  }, [src, errored]);

  return (
    <Paper {...props} sx={{ p: 0.5 }} className={styles.container}>
      <div
        className={styles.deleteButtonContainer}
        onClick={handleDeleteClick}
      >
        <DeleteIcon
          style={ alwaysShowDelete ? { visibility: 'visible' } : { visibility: 'hidden' }}
        />
      </div>

      {image}
    </Paper>
  );
};

RecipeImageControl.propTypes = {
  src: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onLongClick: PropTypes.func,
  onDeleteClick: PropTypes.func,
};

RecipeImageControl.defaultProps = {
  onClick: () => { },
  onLongClick: () => { },
  onDeleteClick: () => { },
};

export default RecipeImageControl;
