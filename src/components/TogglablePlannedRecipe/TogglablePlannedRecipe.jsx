import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { Box, Card, Checkbox, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { capitalizeFirstLetter } from 'utils/stringUtils';
import styles from './TogglablePlannedRecipe.module.css';

const TogglablePlannedRecipe = ({ plannedRecipe, onChange, enabled }) => {
  const { t } = useTranslation();

  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  return (
    <Card sx={{ p: 1, pr: 2 }} className={styles.card}>
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

            <Grid container justifyContent="space-between" sx={{ mb: 1 }} display="flex" alignItems="center">
              <Grid item xs={6}>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <Typography>{plannedRecipe.servings} {capitalizeFirstLetter(t('types.recipe.fields.servings.name'))}</Typography>
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
        <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
          <Checkbox
            checked={enabled}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
    </Card >
  );
};

TogglablePlannedRecipe.propTypes = {
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

TogglablePlannedRecipe.defaultProps = {
  onChange: () => { },
};

export default TogglablePlannedRecipe;
