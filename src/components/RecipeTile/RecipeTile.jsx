import React from 'react';
import PropTypes from 'prop-types';
import { Grid, Card, Typography, Stack, Box } from '@mui/material';
import { AccessTime as AccessTimeIcon, Star as StarIcon } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './RecipeTile.module.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import FavouriteHeart from '../FavouriteHeart';

const RecipeTile = ({ recipe, onClick }) => {
  const handleClick = () => {
    onClick(recipe.id);
  };

  return (
    <Card sx={{ p: 1 }} className={styles.card} onClick={handleClick}>
      {recipe?.favourited && (
        <div className={styles.favourite}>
          <FavouriteHeart width={25} favourited={recipe.favourited} />
        </div>
      )}

      <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.swiper}>
        {recipe.images.map((image) => (
          <SwiperSlide className={styles.imageContainer}>
            <img className={styles.image} src={image} alt="recipe" />
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
              <Typography>{recipe.totalTime} mins</Typography>
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
