import React, { useState, useEffect } from 'react';
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
  Icon,
  Stack,
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

import styles from './Recipe.module.css';
import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { isUndefined, isNull } from '../utils/utils';
import Fraction from '../utils/fraction';
import HeartIcon from '../assets/icons/heart.svg';

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { authenticated } = useAuth();

  const api = useAPI();

  const [recipe, setRecipe] = useState();
  const [loadingRecipe, setLoadingRecipe] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [open, setOpen] = useState(false);

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
      } else {
        await api.unfavouriteRecipe(recipe.id);
        setRecipe({
          ...recipe,
          favourited: false,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
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

    fetchRecipe();
  }, []);

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
          {showFullDescription ? ' ' : '... '}
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
          {authenticated && (
            <IconButton onClick={handleFavoriteClick}>
              <Icon>
                <img className={styles.icon} alt="favourite" src={HeartIcon} height={22} width={22} />
              </Icon>
            </IconButton>
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
              <Grid item>
                <Stack direction="row" alignItems="center" gap={0.4}>
                  <StarIcon sx={{ color: recipe.rating > 0 ? '#FFB900' : 'lightgrey' }} className={styles.icon} />
                  <Typography sx={{ fontSize: 15 }}>{recipe.rating}</Typography>
                </Stack>
              </Grid>
            </Grid>
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6">{recipe.name}</Typography>
              {renderDescriptionText(recipe.description)}
            </Box>
            <Box sx={{ mt: 2 }}>
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                  <Typography variant="h6">Ingredients</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                <AccordionDetails>
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
