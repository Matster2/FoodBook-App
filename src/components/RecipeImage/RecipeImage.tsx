import { RestaurantMenu as RecipeIcon } from '@mui/icons-material';
import { Box } from '@mui/material';
import { useState } from 'react';
import Image from 'src/components/Image';
import styles from './styles.module.css';

interface RecipeImageProps {
  src?: string | undefined;
}

const RecipeImage = ({
  src
}: RecipeImageProps) => {
  const [errored, setErrored] = useState(false);

  const handleError = () => {
    setErrored(true);
  }

  if (!src || errored) {
    return (
      <Box className={styles.noImages} display="flex" justifyContent="center" alignItems="center">
        <RecipeIcon className={styles.noImagesIcon} />
      </Box>
    )
  }

  return (
    <Image
      className={styles.image}
      src={src}
      alt="recipe"
      onError={handleError}
    />
  )
};

export default RecipeImage;
