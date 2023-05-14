import React, { useEffect, useState } from 'react';
import { Container, CircularProgress, Grid, CssBaseline, Stack, List, Box, Button, Typography, IconButton, Slide } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PlannedRecipe from '../components/PlannedRecipe';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
import DatePickerOption from '../components/DatePickerOption/DatePickerOption';
import { areDatesTheSameDay, getDayName, getMonthName, isUndefined } from '../utils/utils';
import PlannerIngredientListDialog from '../dialogs/PlannerIngredientListDialog';

import { ReactComponent as IngredientsIcon } from '../assets/icons/ingredients.svg';
import styles from './Planner.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

export default () => {
  const api = useAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    claims: { userId },
  } = useAuth();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [planner, setPlanner] = useState();
  const [loadingPlanner, setLoadingPlanner] = useState(false);

  const [showIngredientListModal, setShowIngredientListModal] = useState(false);

  useEffect(() => {
    const dateToday = new Date();
    const startDate = new Date();
    // startDate.setDate(dateToday.getDate() - 7);

    const dates = [];

    for (let i = 0; i <= 14; i += 1) {
      const date = new Date();
      date.setDate(startDate.getDate() + i);
      dates.push(date);
    }

    setAvailableDates(dates);
  }, []);

  const fetchPlanner = async () => {
    setLoadingPlanner(true);

    try {
      const { data } = await api.getUserPlanner(userId, {
        dateFrom: selectedDate.toISOString().split('T')[0],
        dateTo: selectedDate.toISOString().split('T')[0],
      });
      setPlanner(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingPlanner(false);
  };

  useEffect(() => {
    fetchPlanner();
  }, [selectedDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePlannedRecipeClick = (plannedRecipe) => {
    navigate(`/recipes/${plannedRecipe.recipe.id}`, {
      state: {
        servings: plannedRecipe.servings
      }
    });
  };

  const recipeTypes = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drink"]

  const getDateString = () => {
    return `${getDayName(selectedDate)}, ${selectedDate.getDate()} ${getMonthName(selectedDate)}`
  }

  return (
    <Container sx={{ pb: 10 }}>
      <CssBaseline />

      <PlannerIngredientListDialog
        open={showIngredientListModal}
        onClose={() => {
          setShowIngredientListModal(false);
        }}
        TransitionComponent={Transition}
        userId={userId}
        filters={{
          dateFrom: selectedDate.toISOString().split('T')[0],
          dateTo: selectedDate.toISOString().split('T')[0],
        }}
      />

      <Header title="Planner" onBackClick={() => navigate(-1)} />

      <List sx={{ mb: 2 }} style={{ overflow: 'auto' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          {availableDates.map((date) => (
            <DatePickerOption date={date} active={areDatesTheSameDay(date, selectedDate)} onClick={handleDateClick} />
          ))}
        </Stack>
      </List>

      <Box>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item alignItems="flex-start">
            <Typography variant="h5" sx={{ mb: 2 }} className={styles.date}>{getDateString()}</Typography>
          </Grid>

          {!isUndefined(planner) && planner.plannedRecipe.length > 0 && (
            <Grid item alignItems="center" justifyContent="center">
              <IconButton className={styles.ingredientsButton} onClick={() => { setShowIngredientListModal(true) }}>
                <IngredientsIcon className={styles.ingredientsIcon} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Box>


      {loadingPlanner && (
        <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {isUndefined(planner) && !loadingPlanner && (
        <Box>
          <Typography>No recipes planned on this day.</Typography>
        </Box>
      )}

      {planner !== undefined && (
        <>
          {recipeTypes.map((recipeType) => {
            const plannedRecipes = planner.plannedRecipes.filter(plannedRecipe => plannedRecipe.recipe.type.toLowerCase() === recipeType.toLowerCase());

            if (plannedRecipes.length === 0) {
              return;
            }

            return (
              <Box sx={{ mb: 2 }}>
                <Typography variant='h6'>{recipeType}</Typography>

                <Stack direction="column" gap={1}>
                  {plannedRecipes.map((plannedRecipe) => (
                    <PlannedRecipe
                      plannedRecipe={plannedRecipe}
                      onClick={() => handlePlannedRecipeClick(plannedRecipe)}
                    />
                  ))}
                </Stack>
              </Box>
            )
          })}
        </>
      )}
    </Container>
  );
};
