import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import uuid from 'react-uuid';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Box,
  Grid,
  IconButton,
  Stack,
  Dialog,
  CircularProgress,
  Slide,
  Avatar,
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
import RatingFilter from '../components/RatingFilter';
import FavouriteHeart from '../components/FavouriteHeart';
import IngredientList from '../components/IngredientList';
import ServingsIncrementor from '../components/ServingsIncrementor';
import NutritionList from '../components/NutritionList';
import RecipeAttributeWidget from '../components/RecipeAttributeWidget';
import PlanRecipeDialog from '../dialogs/PlanRecipeDialog';

import { isUndefined, isNull } from '../utils/utils';
import { capitalizeFirstLetter, truncateText } from '../utils/stringUtils';
import { ReactComponent as PlannerIcon } from '../assets/icons/planner.svg';
import { ReactComponent as PrepIcon } from '../assets/icons/prep.svg';
import { ReactComponent as CookIcon } from '../assets/icons/cook.svg';

import styles from './Recipe.module.css';
import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

const CollapsibleSection = ({ title, collapse, children }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant='h6'>{title}</Typography>

    {children}
  </Box>
)

const RecipeStep = ({ step }) => {
  const [activeInstruction, setActiveInstruction] = useState(0);

  const handleInstructionClick = (index) => {
    setActiveInstruction(index + 1);
  }

  return (
    <Box sx={{ mb: 3 }}>
      <Typography>{step.name}</Typography>

      <Stepper orientation="vertical" activeStep={activeInstruction}>
        {step.instructions.map((instruction, index) => (
          <Step key={instruction.id} onClick={() => handleInstructionClick(index)}>
            <StepLabel>{instruction.instruction}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}

export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  const {
    authenticated,
    claims: { userId },
  } = useAuth();

  const api = useAPI();

  const [loadingRecipe, setLoadingRecipe] = useState();
  const [recipe, setRecipe] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [loadingInstructions, setLoadingInstructions] = useState();
  const [instructions, setInstructions] = useState();

  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [author, setAuthor] = useState();

  const [rating, setRating] = useState(undefined);
  const [servings, setServings] = useState(location?.state?.servings);

  const [showImageModal, setShowImageModal] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPlannerModal, setShowPlannerModal] = useState(false);

  const [isError, setIsError] = useState(false);

  const onServingsChange = (newServings) => {
    setServings(newServings);
  }

  const fetchRecipe = async () => {
    setLoadingRecipe(true);
    try {
      const { data } = await api.getRecipe(id);
      setRecipe(data);
    } catch (e) {
      console.log('error fetching recipe');
    }
    setLoadingRecipe(false);
  };

  const fetchInstructions = async () => {
    setLoadingInstructions(true);

    api.getRecipeInstructions(id)
      .then((reponse) => {
        setInstructions(reponse.data);
      })
      .catch((error) => {
        setIsError(true)
      });

    setLoadingInstructions(false);
  };

  useEffect(() => {
    if (isError) {
      navigate('/');
    }
  }, [isError])

  /* Handlers */
  const handleFavoriteClick = async () => {
    if (isNull(recipe.favourited)) {
      return;
    }

    if (!recipe.favourited) {
      favouriteRecipe();

    } else {
      unfavouriteRecipe();
    }
  };

  const favouriteRecipe = async () => {
    try {
      await api.favouriteRecipe(recipe.id);
      setRecipe({
        ...recipe,
        favourited: true,
      });
      toast.success(t('requests.favourites.favourite.success'));
    } catch (e) {
      console.log(e);
      toast.error(t('requests.favourites.favourite.error'));
    }
  }

  const fetchAuthor = async () => {
    setLoadingAuthor(true);
    try {
      const { data } = await api.getAuthor(recipe.author.id);
      setAuthor(data);
    } catch (e) {
      console.log('error fetching author');
    }
    setLoadingAuthor(false);
  };

  const unfavouriteRecipe = async () => {
    try {
      await api.unfavouriteRecipe(recipe.id);
      setRecipe({
        ...recipe,
        favourited: false,
      });
      toast.success(t('requests.favourites.unfavourite.success'));
    } catch (e) {
      console.log(e);
      toast.error(t('requests.favourites.unfavourite.error'));
    }
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleRatingClick = async (newRating) => {
    try {
      await api.rateRecipe(recipe.id, newRating);
      setRating(newRating);
      toast.success(t('requests.rating.rate.success'));

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
      toast.error(t('requests.rating.rate.error'));
    }
  };

  const handleImageClick = (url) => {
    setShowImageModal(true);
  };

  const handlePlannerClick = () => {
    setShowPlannerModal(true);
  };

  const fetchRecipeRating = async () => {
    try {
      const { data } = await api.getUserRecipeRating(id, userId);
      setRating(data.rating);
    } catch {
      console.log('error fetching recipe rating');
    }
  };

  const handleAuthorClick = () => {
    navigate(`/authors/${recipe.author.id}`);
  };

  /* Effects */
  useEffect(() => {
    if (authenticated) {
      fetchRecipeRating();
    }
    fetchRecipe();
    fetchInstructions();
  }, [authenticated]);

  useEffect(() => {
    if (!isUndefined(recipe) && !location?.state?.servings) {
      setServings(recipe.servings)
    }
    if (recipe?.author) {
      fetchAuthor();
    }
  }, [recipe]);

  /* Rendering */
  Number.prototype.countDecimals = function () {
    if (Math.floor(this.valueOf()) === this.valueOf()) return 0;
    return this.toString().split(".")[1].length || 0;
  }

  const getIngredients = () => {
    return recipe.ingredients.map(ingredient => {
      var amount = ((ingredient.amount / recipe.servings) * servings);

      return ({
        ...ingredient,
        amount,
      })
    })
  }

  const renderDescriptionText = (description) => {
    const maxLength = 90;

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
              {t('pages.recipe.description.showMore')}
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
            {t('pages.recipe.description.showLess')}
          </Typography>
        )}
      </>
    );
  };

  const renderTime = (totalMinutes) => {
    const hours = Math.floor(totalMinutes / 60);
    const mins = totalMinutes % 60;

    const parts = []

    if (hours > 0) {
      parts.push(`${hours} h`)
    }

    if (mins > 0) {
      parts.push(mins > 1 ? `${mins} ${t('common.time.mins')}` : `${mins} ${t('common.time.min')}`)
    }

    return parts.join(" ");
  }

  if (isUndefined(recipe)) {
    return <div />;
  }

  return (
    <>
      <Dialog
        fullScreen
        open={showImageModal}
        onClose={() => { }}
        // TransitionComponent={Transition}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Swiper className={styles.swiper}>
          {recipe.images.map((image) => (
            <SwiperSlide key={uuid()} className={styles.swiperSlide} onDoubleClick={() => setShowImageModal(false)}>
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
              {t('pages.recipe.rate')}
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
          recipe={{
            id: recipe.id,
            servings: recipe.servings
          }}
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
            justifyContent: 'flex-end',
          }}
        >
          <IconButton className={styles.backButton} onClick={handleBackClick}>
            <ChevronLeftIcon className={styles.backIcon} />
          </IconButton>
        </Grid>
        <Grid item xs="auto">
          <Typography variant="h6" className={styles.title}>
            {recipe.name}
          </Typography>
        </Grid>
        <Grid
          item
          xs={1}
          sx={{
            display: 'flex',
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

      <BottomSheet
        open
        blocking={false}
        defaultSnap={({ snapPoints, lastSnap }) => Math.max(...snapPoints)}
        snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 10, maxHeight - maxHeight / 4, maxHeight / 2]}
      >
        <Container sx={{ mb: 5 }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
              <Stack direction="row" alignItems="center" gap={0.4}>
                <AccessTimeIcon className={styles.icon} />
                <Typography sx={{ fontSize: 15 }}>{recipe.totalTime} {t('common.time.mins')}</Typography>
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

          {author && (
            <Stack direction="row" display="flex" alignItems="center" onClick={handleAuthorClick}>
              <Typography className={styles.author} sx={{ mr: 1 }} style={{ fontWeight: 'bold' }}>{t('pages.recipe.author')}:</Typography>
              <Avatar sx={{ height: 20, width: 20, mr: 1 }} src={author.profilePictureUrl} />
              <Typography className={styles.author}>
                {recipe.author.name}
              </Typography>
            </Stack>
          )}

          <Stack
            sx={{ my: 2 }}
            direction="row"
            alignItems="center"
            justifyContent="center"
          >
            <RecipeAttributeWidget
              type="calories"
              value={recipe.nutrition.calories}
            />
          </Stack>

          <Stack direction="row" display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }} gap={2}>
            {recipe.prepTime > 0 && (
              <Box display="flex" alignItems="center" justifyContent="center">
                <PrepIcon className={styles.cookTimeIcon} />
                <Typography display="inline" className={styles.cookTimeHeading}>{t('pages.recipe.prepTime')}</Typography>
                <Typography display="inline" className={styles.cookTimeValue}>{renderTime(recipe.prepTime)}</Typography>
              </Box>
            )}
            {recipe.cookTime > 0 && (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CookIcon className={styles.cookTimeIcon} />
                <Typography display="inline" className={styles.cookTimeHeading}>{t('pages.recipe.cookingTime')}</Typography>
                <Typography display="inline" className={styles.cookTimeValue}>{renderTime(recipe.cookTime)}</Typography>
              </Box>
            )}
          </Stack>

          <Box sx={{ mb: 1 }} display="flex" alignItems="center" justifyContent="center">
            <ServingsIncrementor
              recipeServings={recipe.servings}
              defaultValue={servings}
              onChange={onServingsChange}
              suffixText={capitalizeFirstLetter(t('types.recipe.fields.servings'))}
              min={1}
              max={100}
            />
          </Box>

          <CollapsibleSection
            title={t('pages.recipe.sections.ingredients')}
          >
            {!isUndefined(servings) && (
              <IngredientList
                ingredients={getIngredients()}
              />
            )}
          </CollapsibleSection>

          <CollapsibleSection
            title={t('pages.recipe.sections.directions')}
          >
            {loadingInstructions && (
              <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
                <CircularProgress />
              </Box>
            )}

            {instructions && instructions.steps.map((step) => (
              <RecipeStep
                key={step.id}
                step={step}
              />
            ))}
          </CollapsibleSection>

          <CollapsibleSection
            title={t('pages.recipe.sections.nutrition')}
          >
            <NutritionList
              nutrition={recipe.nutrition}
            />
          </CollapsibleSection>
        </Container>
      </BottomSheet>
    </>
  );
};
