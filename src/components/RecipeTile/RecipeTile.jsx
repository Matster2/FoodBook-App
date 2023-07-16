import { AccessTime as AccessTimeIcon, Star as StarIcon } from '@mui/icons-material';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import FavouriteHeart from 'components/FavouriteHeart';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './RecipeTile.module.css';

const RecipeTile = ({ recipe, onClick }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    onClick(recipe.id);
  };

  return (
    <Card sx={{ p: 1 }} className={styles.card} onClick={handleClick}>
      <Stack direction="row" gap={1} className={styles.attachments}>
        {recipe?.favourited && (
          <FavouriteHeart width={25} favourited={recipe.favourited} />
        )}
      </Stack>

      <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.swiper}>
        {recipe.images.map((image) => (
          <SwiperSlide className={styles.imageContainer}>
            <img className={styles.image} src={image.url} alt="recipe" />
          </SwiperSlide>
        ))}
      </Swiper>
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
              <Typography>{recipe.totalTime} {t('common.time.mins')}</Typography>
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

RecipeTile.propTypes = {
  recipe: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    totalTime: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string),
    servings: PropTypes.number.isRequired,
    favourited: PropTypes.bool,
  }).isRequired,
  onClick: PropTypes.func,
};

RecipeTile.defaultProps = {
  onClick: () => { },
};

export default RecipeTile;
