import { RestaurantMenu as RecipeIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './RecipeImage.module.css';

const RecipeImage = ({ src, ...props}) => {
  
  if (!src) {
    return (
      <Box className={styles.noImages} display="flex" justifyContent="center" alignItems="center">
        <RecipeIcon className={styles.noImagesIcon} />
      </Box>
    )
  }

  return <img className={styles.image} src={src} alt="recipe" />
};
export default RecipeImage;
