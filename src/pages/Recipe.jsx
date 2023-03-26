import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  AccordionDetails,
  Accordion,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Stack,
  Dialog,
  Slide,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  ChevronLeft as ChevronLeftIcon,
  AccessTime as AccessTimeIcon,
  Star as StarIcon,
} from '@mui/icons-material';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
import CookingTime from '../components/CookingTime';
import RatingFilter from '../components/RatingFilter';
import styles from './Recipe.module.css';
import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { isUndefined, isNull } from '../utils/utils';
import Fraction from '../utils/fraction';
import FavouriteHeart from '../components/FavouriteHeart';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    authenticated,
    claims: { userId },
  } = useAuth();

  const api = useAPI();

  const [recipe, setRecipe] = useState();
  const [loadingRecipe, setLoadingRecipe] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [rating, setRating] = useState(undefined);

  const [showRatingModal, setShowRatingModal] = useState(false);

  const handleFavoriteClick = async () => {
    try {
      if (isNull(recipe.favourited)) {
        return;
      }

      if (!recipe.favourited) {
        await api.favouriteRecipe(recipe.id);
        setRecipe({
          ...recipe,
          favourited: true,
        });

        toast.success('Recipe favourited!');
      } else {
        await api.unfavouriteRecipe(recipe.id);
        setRecipe({
          ...recipe,
          favourited: false,
        });

        toast.success('Recipe unfavourited!');
      }
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong. \n Please try again later');
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRatingClick = async (newRating) => {
    try {
      await api.rateRecipe(recipe.id, newRating);
      setRating(newRating);
      toast.success('Recipe rated!');

      try {
        const { data } = await api.getRecipeRating(id);
        setRecipe((state) => ({
          ...state,
          rating: data.rating,
        }));
      } catch {
        console.log('error fetching recipe rating');
      }

      setShowRatingModal(false);
    } catch {
      toast.error('Unable to rate recipe. \n Please try again later');
    }
  };

  const fetchRecipe = async () => {
    setLoadingRecipe(true);
    try {
      setLoadingRecipe(true);
      const { data } = await api.getRecipe(id);
      setRecipe(data);
    } catch {
      console.log('error fetching recipe');
    }
    setLoadingRecipe(false);
  };

  const fetchRecipeRating = async () => {
    try {
      const { data } = await api.getUserRecipeRating(id, userId);
      setRating(data.rating);
    } catch {
      console.log('error fetching recipe rating');
    }
  };

  // useEffect(() => {
  //   fetchRecipe();
  // }, []);

  useEffect(() => {
    if (authenticated) {
      fetchRecipeRating();
    }
    fetchRecipe();
  }, [authenticated]);

  const truncateText = (value, maxLength) => {
    const trimmedString = value.substr(0, maxLength);
    return trimmedString.substr(0, Math.min(trimmedString.length, trimmedString.lastIndexOf(' ')));
  };

  const renderIngredientText = (ingredient) => {
    const fraction = Fraction(ingredient.amount);
    const isWholeNumber = fraction.denominator === 1;

    if (fraction.numerator === 33 && fraction.denominator === 100) {
      fraction.numerator = 1;
      fraction.denominator = 3;
    }

    const amount = isWholeNumber ? `${ingredient.amount}` : `${fraction.numerator}/${fraction.denominator}`;

    let unit = '';
    if (ingredient.unitOfMeasurement.name.toLowerCase() !== 'unit') {
      unit = amount > 1 ? `${ingredient.unitOfMeasurement.pluralName} ` : `${ingredient.unitOfMeasurement.name} `;
    }

    return (
      <span>
        {amount} {unit}
        <span className={styles.ingredientName}>{ingredient.name}</span>
      </span>
    );
  };

  const renderDescriptionText = (description) => {
    const maxLength = 100;

    const text = showFullDescription ? description : truncateText(description, maxLength);

    return (
      <>
        <Typography variant="body2">
          {text}
          {showFullDescription ? ' ' : '...  '}
          {!showFullDescription && (
            <Typography
              display="inline"
              onClick={() => setShowFullDescription(true)}
              className={styles.showMoreLink}
              variant="body2"
            >
              Show More
            </Typography>
          )}
        </Typography>
        {showFullDescription && (
          <Typography
            sx={{ mt: 1 }}
            onClick={() => setShowFullDescription(false)}
            className={styles.showLessLink}
            variant="body2"
          >
            Show less
          </Typography>
        )}
      </>
    );
  };

  if (isUndefined(recipe)) {
    return <div />;
  }

  return (
    <>
      {authenticated && (
        <Dialog
          open={showRatingModal}
          onClose={() => {
            setShowRatingModal(false);
          }}
          TransitionComponent={Transition}
          PaperProps={{
            style: {
              backgroundColor: '#F6F6F6',
            },
          }}
        >
          <Box sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 1 }}>
              Rate
            </Typography>

            <Grid container justifyContent="space-between" sx={{ mb: 1 }} spacing={1}>
              {Array.from(Array(5).keys()).map((value) => {
                const ratingValue = value + 1;
                return (
                  <Grid item xs={2}>
                    <RatingFilter
                      style={{ background: 'none' }}
                      rating={ratingValue}
                      onClick={() => handleRatingClick(ratingValue)}
                      selected={rating === ratingValue}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Dialog>
      )}

      <Grid
        className={styles.header}
        container
        justifyContent="space-between"
        alignItems="center"
        sx={{ mt: 4, mb: 2 }}
      >
        <Grid
          item
          xs={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          <IconButton onClick={handleBackClick}>
            <ChevronLeftIcon />
          </IconButton>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h6" className={styles.title}>
            Recipe
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}
        >
          {authenticated && recipe.favourited != null && (
            <FavouriteHeart width={36} favourited={recipe.favourited} onClick={handleFavoriteClick} />
          )}
        </Grid>
      </Grid>

      <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.Swiper}>
        {recipe.images.map((image) => (
          <SwiperSlide>
            <img src={image} alt="recipe" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Container>
        <BottomSheet
          open
          blocking={false}
          defaultSnap={({ snapPoints, lastSnap }) => Math.max(...snapPoints)}
          snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 10, maxHeight * 0.1]}
        >
          <Container>
            <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
              <Grid item>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <AccessTimeIcon className={styles.icon} />
                  <Typography sx={{ fontSize: 15 }}>{recipe.totalTime} mins</Typography>
                </Stack>
              </Grid>
              <Grid
                item
                onClick={() => {
                  setShowRatingModal(true);
                }}
              >
                <Stack direction="row" alignItems="center" gap={0.2}>
                  <StarIcon
                    sx={{ width: 25, color: recipe.rating > 0 ? '#FFB900' : 'lightgrey' }}
                    className={styles.icon}
                  />
                  <Typography sx={{ fontSize: 15 }}>{recipe.rating}</Typography>
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ mb: 1 }}>
              <Typography variant="h6">{recipe.name}</Typography>
              {renderDescriptionText(recipe.description)}
            </Box>

            <Grid container justifyContent="space-between" sx={{ p: 1 }}>
              <Grid item xs={4} sx={{ p: 1 }}>
                <CookingTime type="prep" time={recipe.prepTime} />
              </Grid>
              <Grid item xs={4} sx={{ p: 1 }}>
                <CookingTime type="cook" time={recipe.cookTime} />
              </Grid>
              <Grid item xs={4} sx={{ p: 1 }}>
                <CookingTime type="total" time={recipe.totalTime} />
              </Grid>
            </Grid>

            <Box sx={{ mt: 2 }}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="h6">Ingredients</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ mt: -3 }}>
                  <ul className={styles.ingredientList}>
                    {recipe.ingredients.map((ingredient) => (
                      <li>
                        <span>{renderIngredientText(ingredient)}</span>
                      </li>
                    ))}
                  </ul>
                </AccordionDetails>
              </Accordion>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Accordion defaultExpanded sx={{ mt: 2 }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="h6">Directions</Typography>
                </AccordionSummary>
                <AccordionDetails sx={{ mt: -3 }}>
                  <Stepper orientation="vertical">
                    {recipe.instructions.map((instruction, index) => (
                      <Step>
                        <StepLabel>{instruction}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Container>
        </BottomSheet>
      </Container>
    </>
  );
};
