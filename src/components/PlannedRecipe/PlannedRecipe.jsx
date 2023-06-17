import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Grid, Card, Typography, Stack, Box } from '@mui/material';
import { AccessTime as AccessTimeIcon, Star as StarIcon } from '@mui/icons-material';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './PlannedRecipe.module.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import FavouriteHeart from '../FavouriteHeart';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

const PlannedRecipe = ({ plannedRecipe, onClick }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onClick(plannedRecipe.id);
  };

  return (
    <Card sx={{ p: 1, pr: 2 }} className={styles.card} onClick={handleClick}>
      {/* {recipe?.favourited && (
        <div className={styles.favourite}>
          <FavouriteHeart width={25} favourited={recipe.favourited} />
        </div>
      )} */}

      <Grid container gap={2}>
        <Grid item xs={3} justifyContent="center">
          <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.swiper}>
            {plannedRecipe.recipe.images.map((image) => (
              <SwiperSlide className={styles.imageContainer}>
                <img className={styles.image} src={image} alt="recipe" />
              </SwiperSlide>
            ))}
          </Swiper>
        </Grid>
        <Grid item xs display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" width="100%">
            <Typography className={styles.name} sx={{ mb: 0.5 }}>{plannedRecipe.recipe.name}</Typography>

            <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
              <Grid item xs={6}>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <Typography>{plannedRecipe.servings} {capitalizeFirstLetter(t('types.recipe.fields.servings'))}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <AccessTimeIcon className={styles.icon} />
                  <Typography>{plannedRecipe.recipe.totalTime} {t('common.time.mins')}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Grid>
    </Card>
  );
};

PlannedRecipe.propTypes = {
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

PlannedRecipe.defaultProps = {
  onClick: () => { },
};

export default PlannedRecipe;
