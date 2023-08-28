import { AccessTime as AccessTimeIcon, Edit as EditIcon } from '@mui/icons-material';
import { Box, Card, Grid, Stack, Typography } from '@mui/material';
import RecipeImage from 'components/RecipeImage';
import useLongPress from 'hooks/useLongPress';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { capitalizeFirstLetter } from 'utils/stringUtils';
import { getFormattedTimeString } from 'utils/translations';
import styles from './PlannedRecipe.module.css';

const defaultOptions = {
  shouldPreventDefault: false,
  delay: 500,
};

const PlannedRecipe = ({ plannedRecipe, onClick, onEditClick }) => {
  const { t } = useTranslation();

  const handleClick = () => {
    onClick(plannedRecipe.id);
  };

  const handleLongClick = () => {
    onEditClick(plannedRecipe.id);
  };

  const handleEditClick = () => {
    onEditClick(plannedRecipe.id);
  };

  const dummyPress = () => { }

  const longPressEvent = useLongPress(handleLongClick, dummyPress, defaultOptions);

  return (
    <Card sx={{ p: 1 }} className={styles.card} {...longPressEvent}>
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
            <RecipeImage />
          )}
        </Grid>
        <Grid item xs display="flex" alignItems="center">
          <Box display="flex" flexDirection="column" width="100%">
            <Typography className={styles.name} sx={{ mb: 0.5 }} onClick={handleClick}>{plannedRecipe.recipe.name}</Typography>

            <Grid container justifyContent="space-between" sx={{ mb: 1 }} display="flex" alignItems="center">
              <Grid item xs={6}>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <Typography>{plannedRecipe.servings} {capitalizeFirstLetter(t('types.recipe.fields.servings.name'))}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <AccessTimeIcon className={styles.icon} />
                  <Typography>{getFormattedTimeString(plannedRecipe.recipe.totalTime)}</Typography>
                </Stack>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={1} display="flex" alignItems="center" justifyContent="center">
          <EditIcon className={styles.editIcon} onClick={handleEditClick} />
        </Grid>
      </Grid>
    </Card >
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
  onLongClick: PropTypes.func,
};

PlannedRecipe.defaultProps = {
  onClick: () => { },
  onLongClick: () => { }
};

export default PlannedRecipe;
