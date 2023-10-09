import {
  AccessTime as AccessTimeIcon,
  ChevronLeft as ChevronLeftIcon,
  Edit as EditIcon,
  Scale as MeasurementIcon,
  Star as StarIcon
} from '@mui/icons-material';
import {
  Avatar,
  Box,
  CircularProgress,
  Container,
  Dialog,
  Grid,
  IconButton,
  Slide,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import classnames from 'classnames';
import EquipmentList from 'components/EquipmentList';
import FavouriteHeart from 'components/FavouriteHeart';
import IngredientList from 'components/IngredientList';
import NutritionList from 'components/NutritionList';
import RatingFilter from 'components/RatingFilter';
import RecipeAttributeWidget from 'components/RecipeAttributeWidget';
import RecipeTile from 'components/RecipeTile';
import Section from 'components/Section';
import ServingsIncrementor from 'components/ServingsIncrementor';
import PlanRecipeDialog from 'dialogs/PlanRecipeDialog';
import RecipeImageViewerDialog from 'dialogs/RecipeImageViewerDialog';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import usePagedFetch from 'hooks/usePagedFetch';
import _ from "lodash";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { BottomSheet } from 'react-spring-bottom-sheet';

import { ReactComponent as CookIcon } from 'assets/icons/cook.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as PlannerIcon } from 'assets/icons/planner.svg';
import { ReactComponent as PrepIcon } from 'assets/icons/prep.svg';
import { capitalizeFirstLetter, truncateText } from 'utils/stringUtils';
import { getFormattedTimeString, getMeasurementSystemTranslation } from 'utils/translations';
import { isNull, isUndefined } from 'utils/utils';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import 'react-spring-bottom-sheet/dist/style.css';
import { MeasurementSystem, RecipeState } from 'types';
import styles from './Recipe.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

const CollapsibleSection = ({ title, sx, collapse, renderEnd, children }) => (
  <Box sx={{ mb: 4, ...sx }}>
    <Stack direction="row" display="flex" alignItems="center" gap={1}>
      <Typography variant='h6'>{title}</Typography>
      {renderEnd && renderEnd}
    </Stack>

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
    claims: { userId, role },
  } = useAuth();

  const api = useAPI();
 
  const { results: variants, totalResults: totalVariants, loading: loadingVariants } = usePagedFetch(
    `${process.env.REACT_APP_API_URL
    }/recipes?random=true&pageSize=25&variantOfRecipeId=${id}`
  );

  const [loadingRecipe, setLoadingRecipe] = useState();
  const [recipe, setRecipe] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [loadingInstructions, setLoadingInstructions] = useState();
  const [instructions, setInstructions] = useState();

  const [loadingAuthor, setLoadingAuthor] = useState(false);
  const [author, setAuthor] = useState();

  const [rating, setRating] = useState(undefined);
  const [servings, setServings] = useState(location?.state?.servings);
  const [ingredients, setIngredients] = useState([]);

  const [showRecipeImageViewerDialog, setShowRecipeImageViewerDialog] = useState(false);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [showPlannerModal, setShowPlannerModal] = useState(false);

  const [isError, setIsError] = useState(false);

  const swiperRef = useRef(null)
  const headerRef = useRef(null)

  const [measurementSystem, setMeasurementSystem] = useState();

  const onServingsChange = (newServings) => {
    setServings(newServings);
  }

  const fetchRecipe = async () => {
    setLoadingRecipe(true);
    try {
      const { data: _recipeData } = await api.getRecipe(id);
      setRecipe(_recipeData);
      setMeasurementSystem(undefined);

      const { data } = await api.getRecipeIngredients(id);
      setIngredients(data.ingredients);   
    } catch (e) {
      setIsError(true)
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
      .catch(() => {
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
    setShowRecipeImageViewerDialog(true);
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
    if (recipe.author) {
      navigate(`/authors/${recipe.author.id}`);
    }
  };

  const handleEditClick = () => {
    const url = role === 'Administrator'
      ? `/admin/recipes/${recipe.id}`
      : `/recipes/${recipe.id}/edit`;

    navigate(url);
  }

  const handleCopyClick = () => {
    navigate(`/recipes/create`, {
      state: {
        personal: true,
        descendantOfRecipeId: id
      }
    })    
  }

  const handleRecipeClick = (id) => {
    navigate(`/recipes/${id}`);
  };

  const handleMeasurementSystemClick = async () => {
    var newMeasurementSystem = measurementSystem;
    
    switch (measurementSystem) {
      case MeasurementSystem.Metric:
        newMeasurementSystem = MeasurementSystem.Imperial;
        break;
      case MeasurementSystem.Imperial:
        newMeasurementSystem = undefined;
        break;
      default: 
        newMeasurementSystem = MeasurementSystem.Metric;
    }

    try {
      const { data } = await api.getRecipeIngredients(recipe.id, { measurementSystem: newMeasurementSystem });
      setIngredients(data.ingredients);
      setMeasurementSystem(newMeasurementSystem);      
    } catch (e) {
      toast.error(t('requests.recipes.ingredients.error'));
    }
  }

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
  const hasNutritionValues = useMemo(() => {
    if (!recipe) {
      return false;
    }

    return Object.keys(recipe.nutrition).some(key => {
      var val = recipe.nutrition[key];
      return val > 0
    });
  }, [recipe])

  function fixRounding(value, precision) {
    var power = Math.pow(10, precision || 0);
    return Math.round(value * power) / power;
  }

  const convertRecipeIngredients = (recipeIngredients) => {
    return recipeIngredients.map(recipeIngredients => {
      var amount = fixRounding(_.divide(recipeIngredients.amount, recipe.servings) * servings, 6);
      return ({
        ...recipeIngredients,
        amount,
      })
    })
  }

  const renderDescriptionText = (description) => {
    const maxLength = 90;

    if (description.length <= 90) {
      return (
        <Typography style={{ whiteSpace: "pre-wrap" }} variant="body2">
          {description}
        </Typography>
      );
    }

    const text = showFullDescription ? description : truncateText(description, maxLength);

    return (
      <>
        <Typography style={{ whiteSpace: "pre-wrap" }} variant="body2">
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

  const renderRecipeTile = (recipe) => (
    <Box
      sx={{
        maxWidth: 150,
      }}
    >
      <RecipeTile key={recipe.id} recipe={recipe} onClick={handleRecipeClick} />
    </Box>
  );  

  if (isUndefined(recipe)) {
    return <div />;
  }

  return (
    <div style={{ height: '100vh', width: '100%', backgroundColor: '#f5f5f5' }}>
      <RecipeImageViewerDialog
        open={showRecipeImageViewerDialog}
        onClose={() => setShowRecipeImageViewerDialog(false)}
        images={recipe.images.map((image) => image.url)}
      />

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
                  <Grid key={ratingValue} item xs={2}>
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
        sx={{ mt: 4, mb: 2 }}
        ref={headerRef}
      >
        <Grid
          item
          xs="auto"
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          <IconButton className={styles.backButton} onClick={handleBackClick}>
            <ChevronLeftIcon className={styles.backIcon} />
          </IconButton>
        </Grid>
        <Grid
          item
          display="flex"
          justifyContent="center"
          alignItems="center"
          style={{ flex: 1 }}>
          <Typography
            variant="h6"
            display="flex"
            textAlign="center"
            justifyContent="center"
            alignItems="center"
            style={{ wordWrap: "break-word" }}
          >
            {recipe.name}
          </Typography>
        </Grid>
        <Grid
          item
          xs="auto"
          sx={{
            justifyContent: 'flex-end',
          }}
        >
          {authenticated && recipe.favourited != null && (
            <FavouriteHeart width={36} favourited={recipe.favourited} onClick={handleFavoriteClick} />
          )}
        </Grid>
      </Grid>

      <Box ref={swiperRef}>
        <Swiper className={styles.swiper}>
          {recipe.images.map((image) => (
            <SwiperSlide className={styles.swiperSlide} onDoubleClick={() => handleImageClick(image)}>
              <img src={image.url} className={styles.slideImage} alt="recipe" />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <BottomSheet
        open
        skipInitialTransition
        scrollLocking={recipe.images.length === 0}
        blocking={false}
        defaultSnap={({ snapPoints, lastSnap }) => Math.max(...snapPoints)}
        snapPoints={({ maxHeight }) => recipe.images.length > 0 ? [maxHeight - (maxHeight / 10),  maxHeight - swiperRef.current.clientHeight] : [maxHeight - (maxHeight / 10)]}
      >
        <Container sx={{ mb: 12 }}>
          <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 1 }}>
            <Grid item>
              <Stack direction="row" alignItems="center" gap={0.4}>
                <AccessTimeIcon className={styles.icon} />
                <Typography sx={{ fontSize: 15 }}>{getFormattedTimeString(recipe.totalTime)}</Typography>
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

          <Stack direction="row" display="flex" justifyContent="space-between" alignItems="center">
            {(author || recipe.createdBy.id === userId) && (
              <Stack direction="row" display="flex" alignItems="center" onClick={handleAuthorClick}>
                <Typography className={styles.author} sx={{ mr: 1 }} style={{ fontWeight: 'bold' }}>{t('pages.recipe.author')}:</Typography>
                <Avatar sx={{ height: 21, width: 21, mr: 1, bgcolor: 'var(--primary-colour)' }} src={author?.profilePictureUrl} />
                
                <Stack direction="row" alignItems="center">
                  <Typography className={styles.author}>
                    {recipe?.author?.name ?? ""}
                  </Typography>
                  {(recipe.createdBy.id === userId) && (
                    <Typography className={styles.author} sx={{ fontWeight: 'bold'}}>
                      {`(${t('common.words.you')})`}
                    </Typography>
                  )}
                </Stack>
              </Stack>
            )}

            <Stack direction="row" display="flex" sx={{ marginLeft: 'auto' }} alignItems="center" gap={1}>
              {authenticated && (recipe.createdBy.id === userId || recipe.State !== RecipeState.Draft) && (
                <IconButton sx={{ marginLeft: 'auto' }} className={classnames(styles.optionButton, styles.personalOptionButton)} onClick={handleCopyClick}>
                  <CopyIcon className={styles.optionIcon} />
                </IconButton>
              )}

              {authenticated && (recipe.createdBy.id === userId || role === 'Administrator') && (
                <IconButton sx={{ marginLeft: 'auto' }} className={classnames(styles.optionButton, recipe.personal && styles.personalOptionButton)} onClick={handleEditClick}>
                  <EditIcon className={styles.optionIcon} />
                </IconButton>
              )}
            </Stack>
          </Stack>

          <Stack
            sx={{ my: 2 }}
            direction="row"
            justifyContent="center"
            gap={3}
          >
            {recipe.nutrition.calories && (
              <Box maxWidth={100} textAlign="center">
                <RecipeAttributeWidget
                  type="calories"
                  value={recipe.nutrition.calories}
                />
              </Box>
            )}

            {recipe.containsAlcohol && (
              <Box maxWidth={100} textAlign="center">
                <RecipeAttributeWidget
                  type="alcohol"
                />
              </Box>
            )}
          </Stack>

          <Stack direction="row" display="flex" justifyContent="center" sx={{ mt: 2, mb: 2 }} gap={2}>
            {recipe.prepTime > 0 && (
              <Box display="flex" alignItems="center" justifyContent="center">
                <PrepIcon className={styles.cookTimeIcon} />
                <Typography display="inline" className={styles.cookTimeHeading}>{t('pages.recipe.prepTime')}</Typography>
                <Typography display="inline" className={styles.cookTimeValue}>{getFormattedTimeString(recipe.prepTime)}</Typography>
              </Box>
            )}
            {recipe.cookTime > 0 && (
              <Box display="flex" alignItems="center" justifyContent="center">
                <CookIcon className={styles.cookTimeIcon} />
                <Typography display="inline" className={styles.cookTimeHeading}>{t('pages.recipe.cookingTime')}</Typography>
                <Typography display="inline" className={styles.cookTimeValue}>{getFormattedTimeString(recipe.cookTime)}</Typography>
              </Box>
            )}
          </Stack>

          {ingredients.length > 0 && (
            <>
              <Box sx={{ mt: 2, mb: 2 }} display="flex" alignItems="center" justifyContent="center">
                <ServingsIncrementor
                  recipeServings={recipe.servings}
                  defaultValue={servings}
                  onChange={onServingsChange}
                  suffixText={capitalizeFirstLetter(t('types.recipe.fields.servings.name'))}
                  min={1}
                  max={100}
                />
              </Box>
            
              <CollapsibleSection
                title={t('pages.recipe.sections.ingredients')}
                renderEnd={
                  <Stack sx={{ marginLeft: 'auto' }} direction="row" alignItems="center" gap={1}>
                    {measurementSystem && <Typography className={styles.measurementSystem}>{getMeasurementSystemTranslation(measurementSystem)}</Typography>}
                    
                    <IconButton className={styles.optionButton} onClick={handleMeasurementSystemClick}>
                      <MeasurementIcon className={styles.optionIcon} />
                    </IconButton>
                  </Stack>
                }
              >
                {!isUndefined(servings) && (
                  <>                  
                    <IngredientList
                      ingredients={convertRecipeIngredients(ingredients.filter(x => isNull(x.recipePart)))}
                    />

                    {recipe.parts.map((part) => (
                      <Box sx={{ mt: 1 }}>  
                        <Typography>{part.name}</Typography>
                                                               
                        <IngredientList
                          ingredients={convertRecipeIngredients(ingredients.filter(x => x.recipePart?.id === part.id))}
                        />
                      </Box>
                    ))}
                  </>
                )}
              </CollapsibleSection>
            </>
          )}

          {recipe.equipment.length > 0 && (
            <CollapsibleSection
              title={t('pages.recipe.sections.equipment')}
            >
              <EquipmentList
                equipment={recipe.equipment}
              />
            </CollapsibleSection>
          )}

          {recipe.steps.length > 0 && recipe.steps[0].instructions.length > 0 && (
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
          )}

          {recipe.referenceUrl && (
            <Box display="flex" justifyContent="center" sx={{ mb: 3 }}>
              <Link to={recipe.referenceUrl}><Typography variant="body2">{t('pages.recipe.seeFullRecipe')}</Typography></Link>
            </Box>
          )}

          {hasNutritionValues && (
            <CollapsibleSection
              title={t('pages.recipe.sections.nutrition')}
            >
              <Typography align="center" sx={{ mt: -0.5, mb: 0.1 }} className={styles.nutritionDisclaimer}>{t("pages.recipe.nutritionDisclaimer")}</Typography>
              <NutritionList
                nutrition={recipe.nutrition}
              />
            </CollapsibleSection>
          )}

          {variants.length > 0 && (
            <Section
              title={t('pages.recipe.sections.variants')}
              loading={loadingVariants}
            >
              {variants.map((recipe) => renderRecipeTile(recipe))}
            </Section>
          )}
        </Container>
      </BottomSheet>
    </div>
  );
};
