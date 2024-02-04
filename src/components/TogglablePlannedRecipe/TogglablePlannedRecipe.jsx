import { AccessTime as AccessTimeIcon } from '@mui/icons-material';
import { Box, Card, Checkbox, Grid, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import RecipeImage from 'src/components/RecipeImage';
import { capitalizeFirstLetter } from 'src/utils/stringUtils';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import styles from './TogglablePlannedRecipe.module.css';

const TogglablePlannedRecipe = ({ plannedRecipe, onChange, onClick, enabled }) => {
  const { t } = useTranslation();

  const handleChange = (event) => {
    onChange(event.target.checked);
  };

  const handleClick = () => {
    onClick();
  }

  return (
    <Card sx={{ p: 1, pr: 2 }} className={styles.card}>
      {/* {recipe?.favourited && (
        <div className={styles.favourite}>
          <FavouriteHeart width={25} favourited={recipe.favourited} />
        </div>
      )} */}

      <Grid container gap={2}>
        <Grid item xs={3} justifyContent="center">
          {plannedRecipe.recipe.images.length > 0 && (
            <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.swiper} onClick={handleClick}>
              {plannedRecipe.recipe.images.map((image) => (
                <SwiperSlide className={styles.imageContainer}>
                  <RecipeImage src={image.url} alt="recipe" />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {plannedRecipe.recipe.images.length === 0 && (
            <RecipeImage src={undefined}  />
          )}
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
  onClick: () => { }
};

export default TogglablePlannedRecipe;
