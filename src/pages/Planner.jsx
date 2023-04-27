import React, { useEffect, useState } from 'react';
import { Container, CssBaseline, Stack, List, Box, Button, Typography, Slide } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import PlannedRecipe from '../components/PlannedRecipe';
import useAPI from '../hooks/useAPI';
import useAuth from '../hooks/useAuth';
import DatePickerOption from '../components/DatePickerOption/DatePickerOption';
import { areDatesTheSameDay, getDayName, getMonthName } from '../utils/utils';
import PlannerIngredientListDialog from '../dialogs/PlannerIngredientListDialog';

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
    try {
      const { data } = await api.getUserPlanner(userId, {
        dateFrom: selectedDate.toISOString().split('T')[0],
        dateTo: selectedDate.toISOString().split('T')[0],
      });
      setPlanner(data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchPlanner();
  }, [selectedDate]);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  const handlePlannedRecipeClick = (plannedRecipe) => {
    navigate(`/recipes/${plannedRecipe.recipe.id}`);
  };

  const recipeTypes = ["Breakfast", "Lunch", "Dinner", "Dessert", "Snack", "Drink"]

  const getDateString = () => {
    return `${getDayName(selectedDate)}, ${selectedDate.getDay()} ${getMonthName(selectedDate)}`
  }

  return (
    <Container>
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

      <List sx={{ mb: 4 }} style={{ overflow: 'auto' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          {availableDates.map((date) => (
            <DatePickerOption date={date} active={areDatesTheSameDay(date, selectedDate)} onClick={handleDateClick} />
          ))}
        </Stack>
      </List>

      <Button
        sx={{ mb: 1 }}
        variant='contained'
        onClick={() => { setShowIngredientListModal(true) }}
      >
        Show Ingredient List
      </Button>

      <Typography variant="h5" sx={{ mb: 2 }} className={styles.date}>{getDateString()}</Typography>

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
