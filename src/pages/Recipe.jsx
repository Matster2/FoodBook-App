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
import PlanRecipeDialog from '../dialogs/PlanRecipeDialog';
import styles from './Recipe.module.css';
import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { isUndefined, isNull } from '../utils/utils';
import Fraction from '../utils/fraction';
import FavouriteHeart from '../components/FavouriteHeart';
import NutritionTable from '../components/NutritionTable';
import { ReactComponent as PlannerIcon } from '../assets/icons/planner.svg';

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

  const [showImageModal, setShowImageModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPlannerModal, setShowPlannerModal] = useState(false);

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

  const handleImageClick = (url) => {
    setShowImageModal(true);
  };

  const handlePlannerClick = () => {
    setShowPlannerModal(true);
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

  const getUnitName = (unitOfMeasurement, amount) => {
    if (unitOfMeasurement.name.toLowerCase() === 'unit') {
      return '';
    }

    return amount > 1 ? `${unitOfMeasurement.pluralName} ` : `${unitOfMeasurement.name} `;
  };

  const getAmountString = (amount) => {
    const isWholeNumber = amount % 1 === 0;

    if (isWholeNumber) {
      return amount;
    }

    const integer = Math.trunc(amount);
    const decimal = amount - Math.floor(amount);

    const fraction = Fraction(decimal);

    if (integer === 0) {
      return `${fraction.numerator}/${fraction.denominator}`;
    }

    if (decimal === 0.33) {
      fraction.numerator = 1;
      fraction.denominator = 3;
    }

    return `${integer} ${fraction.numerator}/${fraction.denominator}`;
  };

  const renderIngredientText = (ingredient) => {
    const amount = getAmountString(ingredient.amount);
    const unit = getUnitName(ingredient.unitOfMeasurement, ingredient.amount);

    const ingredientName = amount === 1 ? ingredient.name : ingredient.pluralName;

    return (
      <span>
        {`${amount} ${unit}`.trim()} <span className={styles.ingredientName}>{ingredientName}</span>
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
      <Dialog
        fullScreen
        open={showImageModal}
        onClose={() => {}}
        // TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Swiper className={styles.swiper}>
          {recipe.images.map((image) => (
            <SwiperSlide className={styles.swiperSlide} onDoubleClick={() => setShowImageModal(false)}>
              <img className={styles.slideImage} src={image} alt="recipe" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Dialog>

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

      {authenticated && (
        <PlanRecipeDialog
          open={showPlannerModal}
          onClose={() => {
            setShowPlannerModal(false);
          }}
          TransitionComponent={Transition}
        />
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
          <IconButton className={styles.backButton} onClick={handleBackClick}>
            <ChevronLeftIcon className={styles.backIcon} />
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

      <Swiper className={styles.swiper}>
        {recipe.images.map((image) => (
          <SwiperSlide className={styles.swiperSlide} onDoubleClick={() => handleImageClick(image)}>
            <img src={image} className={styles.slideImage} alt="recipe" />
          </SwiperSlide>
        ))}
      </Swiper>

      <Container>
        <BottomSheet
          open
          blocking={false}
          defaultSnap={({ snapPoints, lastSnap }) => Math.max(...snapPoints)}
          snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 10, maxHeight - maxHeight / 4, maxHeight / 2]}
        >
          <Container sx={{ pb: 5 }}>
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
              <Grid container justifyContent="space-between" alignItems="center">
                <Grid item>
                  <Typography variant="h6">{recipe.name}</Typography>
                </Grid>
                <Grid item>
                  <PlannerIcon onClick={handlePlannerClick} className={styles.plannerIcon} />
                </Grid>
              </Grid>

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
              <NutritionTable nutrition={recipe.nutrition} />
            </Box>

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
