import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { BottomSheet } from 'react-spring-bottom-sheet';
import { Swiper, SwiperSlide } from 'swiper/react';
import useAPI from '../hooks/useAPI';

import styles from './Recipe.module.css';
import 'react-spring-bottom-sheet/dist/style.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { isUndefined } from '../utils/utils';
import Fraction from '../utils/fraction';

export default () => {
  const { id } = useParams();

  const api = useAPI();

  const [recipe, setRecipe] = useState();
  const [loadingRecipe, setLoadingRecipe] = useState();
  const [showFullDescription, setShowFullDescription] = useState(false);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

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
    <Container>
      <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.Swiper}>
        {recipe.images.map((image) => (
          <SwiperSlide>
            <img src={image} alt="recipe" />
          </SwiperSlide>
        ))}
      </Swiper>

      <BottomSheet
        open
        blocking={false}
        defaultSnap={({ snapPoints, lastSnap }) => Math.max(...snapPoints)}
        snapPoints={({ maxHeight }) => [maxHeight - maxHeight / 10, maxHeight * 0.1]}
      >
        <Container>
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
  );
};
