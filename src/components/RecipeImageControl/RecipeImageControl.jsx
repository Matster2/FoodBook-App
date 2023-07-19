import { Cancel as DeleteIcon } from '@mui/icons-material';
import { Paper } from '@mui/material';
import useLongPress from 'hooks/useLongPress';
import PropTypes from 'prop-types';
import styles from './RecipeImageControl.module.css';

const RecipeImageControl = ({ src, onClick, onLongClick, onDeleteClick, alwaysShowDelete, ...props }) => {
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  
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

      <img alt="recipe" className={styles.image} src={src} {...longPressEvent} />
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
