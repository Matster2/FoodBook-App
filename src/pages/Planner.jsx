import NiceModal from '@ebay/nice-modal-react';
import { Box, Button, CircularProgress, Container, Grid, IconButton, List, Slide, Stack, Typography } from '@mui/material';
import DatePickerOption from 'components/DatePickerOption/DatePickerOption';
import Header from 'components/Header';
import PlannedRecipe from 'components/PlannedRecipe';
import PlannedRecipeDialog from 'dialogs/PlannedRecipeDialog';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { getDayName, getMonthName } from 'utils/translations';
import { areDatesTheSameDay, isUndefined, toISOLocal } from 'utils/utils';

import { ReactComponent as IngredientsIcon } from 'assets/icons/ingredients.svg';
import styles from './Planner.module.css';

const Transition = React.forwardRef((props, ref) => {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="left" ref={ref} {...props} />;
});

const recipeTypes = ['breakfast', 'lunch', 'dinner', 'dessert', 'snack', 'drink'];

export default () => {
  const { t } = useTranslation();
  const api = useAPI();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    authenticated,
    claims: { userId },
  } = useAuth();

  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [planner, setPlanner] = useState();
  const [loadingPlanner, setLoadingPlanner] = useState(false);

  const [showEditPlannedRecipeModal, setShowEditPlannedRecipeModal] = useState(false);

  const [selectedPlannedRecipe, setSelectedPlannedRecipe] = useState();

  useEffect(() => {
    const dateToday = new Date();
    const startDate = new Date();

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

    const date = toISOLocal(selectedDate);

    try {
      const { data } = await api.getUserPlanner(userId, {
        dateFrom: date.split('T')[0],
        dateTo: date.split('T')[0],
      });
      setPlanner(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingPlanner(false);
  };

  useEffect(() => {
    if (authenticated) {
      fetchPlanner();
    }
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

  const handlePlannedRecipeEditClick = (plannedRecipe) => {
    setSelectedPlannedRecipe(plannedRecipe)
    setShowEditPlannedRecipeModal(true);
  }

  const handleViewIngredientListClick = (date) => {
    const formattedDate = toISOLocal(date);

    navigate(`/ingredient-list`, {
      state: {
        filters: {
          dateFrom: formattedDate.split('T')[0],
          dateTo: formattedDate.split('T')[0],
        }
      }
    });
  }

  const onPlannedRecipeUpdated = () => {
    fetchPlanner();
  }

  const getDateString = (date) => {
    return `${getDayName(date)}, ${date.getDate()} ${getMonthName(date)}`
  }

  if (!authenticated) {
    return (
      <Container>
        <Box textAlign="center" sx={{ marginTop: '30%' }}>
          <Typography>{t('pages.planner.authenticationRequired')}</Typography>

          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={() => {
              NiceModal.show('authentication-modal');
            }}
          >
            {t('pages.planner.components.buttons.signIn.label')}
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container sx={{ pb: 10 }}>
      {selectedPlannedRecipe && (
        <PlannedRecipeDialog
          open={showEditPlannedRecipeModal}
          onClose={() => {
            setShowEditPlannedRecipeModal(false);
          }}
          TransitionComponent={Transition}
          plannedRecipe={selectedPlannedRecipe}
          onComplete={onPlannedRecipeUpdated}
        />
      )}


      <Header title={t("pages.planner.title")} onBackClick={() => navigate(-1)} />

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
            <Typography variant="h5" sx={{ mb: 2 }} className={styles.date}>{getDateString(selectedDate)}</Typography>
          </Grid>

          {!isUndefined(planner) && planner.plannedRecipes.length > 0 && (
            <Grid item alignItems="center" justifyContent="center">
              <IconButton className={styles.ingredientsButton} onClick={() => handleViewIngredientListClick(selectedDate)}>
                <IngredientsIcon className={styles.ingredientsIcon} />
              </IconButton>
            </Grid>
          )}
        </Grid>
      </Box>

      {!isUndefined(planner) && planner.plannedRecipes.length === 0 && (
        <Box>
          <Typography>{t('pages.planner.noRecipes')}</Typography>
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
                <Typography variant='h6'>{t(`types.recipe.types.${recipeType}.displayName`)}</Typography>

                <Stack direction="column" gap={1}>
                  {plannedRecipes.map((plannedRecipe) => (
                    <PlannedRecipe
                      plannedRecipe={plannedRecipe}
                      onClick={() => handlePlannedRecipeClick(plannedRecipe)}
                      onEditClick={() => handlePlannedRecipeEditClick(plannedRecipe)}
                    />
                  ))}
                </Stack>
              </Box>
            )
          })}
        </>
      )}

      {loadingPlanner && (
        <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Container>
  );
};
