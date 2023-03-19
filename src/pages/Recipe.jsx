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

export default () => {
  const { id } = useParams();

  const api = useAPI();

  const [recipe, setRecipe] = useState();
  const [loadingRecipe, setLoadingRecipe] = useState();

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
          <Typography variant="h6">{recipe.name}</Typography>
          <Typography variant="body2">{recipe.description}</Typography>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Ingredients</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {recipe.ingredients.map((ingredient) => (
                  <li>{ingredient.name}</li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography>Directions</Typography>
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
        </Container>
      </BottomSheet>
    </Container>
  );
};
