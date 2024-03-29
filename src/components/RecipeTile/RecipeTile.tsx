import { AccessTime as AccessTimeIcon, Star as StarIcon } from '@mui/icons-material';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import RecipeImage from 'src/components/RecipeImage';
import RecipeTileAttachment from 'src/components/RecipeTileAttachment';
import useAuth from 'src/hooks/useAuth';
import { getFormattedTimeString } from 'src/utils/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './styles.module.css';

interface RecipeTileProps {
  recipe: {
    id: string;
    name: string;
    createdBy: {
      id: string;
    };
    personal: boolean;
    favourited?: boolean | null;
    images: {
      url: string;
    }[]
  };
  onClick: (id: string) => void;
}

const RecipeTile = ({
  recipe,
  onClick
}: RecipeTileProps) => {
  const { t } = useTranslation();
  const {
    claims: { userId },
  } = useAuth();

  const handleClick = () => {
    onClick(recipe.id);
  };

  if (!recipe) {
    return (<></>)
  }

  return (
    <Card sx={{ p: 1 }} className={styles.card} onClick={handleClick} {...props}>
      <Stack direction="row" gap={0.5} className={styles.attachments}>
        {(recipe.createdBy.id === userId && recipe?.personal) && (
          <RecipeTileAttachment type="personal" />
        )}
        {recipe?.favourited && (
          <RecipeTile Attachment type="favourite" />
        )}
      </Stack>

      <Box className={styles.imagesContainer}>
        {recipe.images.length > 0 && (
          <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.swiper}>
            {recipe.images.map((image) => (
              <SwiperSlide className={styles.imageContainer}>
                <RecipeImage src={image.url} alt="recipe" />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {recipe.images.length === 0 && (
          <RecipeImage />
        )}
      </Box>

      <Box>
        <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
          <Grid item>
            <Typography className={styles.name}>{recipe.name}</Typography>
          </Grid>
        </Grid>

        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Stack direction="row" alignItems="center" gap={0.4}>
              <AccessTimeIcon className={styles.icon} />
              <Typography>{getFormattedTimeString(recipe.totalTime)}</Typography>
            </Stack>
          </Grid>
          {/* <Grid item>
            <Stack direction="row" alignItems="center" gap={0.4}>
              <PeopleOutlineIcon className={styles.icon} />
              <Typography>{recipe.servings} servings</Typography>
            </Stack>
          </Grid> */}
          <Grid item>
            <Stack direction="row" alignItems="center" gap={0.4}>
              <StarIcon sx={{ color: recipe.rating > 0 ? '#FFB900' : 'lightgrey' }} className={styles.icon} />
              <Typography>{recipe.rating}</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

export default RecipeTile;
