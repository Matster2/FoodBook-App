import { RestaurantMenu as RecipeIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import classnames from 'classnames';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './RecipeImage.module.css';

const RecipeImage = ({ src, className, ...props}) => {  
  if (!src) {
    return (
      <Box className={styles.noImages} display="flex" justifyContent="center" alignItems="center">
        <RecipeIcon className={styles.noImagesIcon} />
      </Box>
    )
  }

  return (
    <Box className={classnames(styles.imageContainer, className)}>
      <img className={styles.image} src={src} alt="recipe" />
    </Box>
  )
};

RecipeImage.defaultProps = {
  src: undefined,
  className: ''
}

export default RecipeImage;
