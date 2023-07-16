import { Cancel as DeleteIcon } from '@mui/icons-material';
import { Paper } from '@mui/material';
import useLongPress from 'hooks/useLongPress';
import PropTypes from 'prop-types';
import styles from './RecipeImageControl.module.css';

const RecipeImageControl = ({ src, onDeleteClick, ...props }) => {
  const defaultOptions = {
    shouldPreventDefault: true,
    delay: 500,
  };
  
  const handleLongClick = () => {
  };

  const handleClick = () => { }

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    onDeleteClick();
  }

  const longPressEvent = useLongPress(handleLongClick, handleClick, defaultOptions);

  return (
    <Paper {...props} {...longPressEvent} sx={{ p: 0.5 }} className={styles.container}>
      <div className={styles.deleteButtonContainer}>
        <DeleteIcon
          onClick={handleDeleteClick}
        />
      </div>

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
