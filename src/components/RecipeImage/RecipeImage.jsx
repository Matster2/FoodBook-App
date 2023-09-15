import { RestaurantMenu as RecipeIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import classnames from 'classnames';
import { useState } from 'react';
import styles from './RecipeImage.module.css';

const RecipeImage = ({ src, className, ...props }) => {  
  const [errored, setErrored] = useState(false);
  
  const onError = () => {
    setErrored(true);
  }

  if (!src || errored) {
    return (
      <Box className={styles.noImages} display="flex" justifyContent="center" alignItems="center" {...props}>
        <RecipeIcon className={styles.noImagesIcon} />
      </Box>
    )
  }

  return (
    <Box className={classnames(styles.imageContainer, className)} {...props}>
      <img
        className={styles.image}
        src={src}
        alt="recipe" 
        onError={onError}
      />
    </Box>
  )
};

RecipeImage.defaultProps = {
  src: undefined,
  className: ''
}

export default RecipeImage;
