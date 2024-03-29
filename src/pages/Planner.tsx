import NiceModal from '@ebay/nice-modal-react';
import { Box, Button, CircularProgress, Container, Grid, IconButton, List, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import IngredientsIcon from 'src/assets/icons/ingredients.svg?react';
import DatePickerOption from 'src/components/DatePickerOption/DatePickerOption';
import Header from 'src/components/Header';
import PlannedRecipe from 'src/components/PlannedRecipe';
import PlannedRecipeDialog from 'src/dialogs/PlannedRecipeDialog';
import useAuth from 'src/hooks/useAuth';
import { RecipeType } from 'src/types';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import { lowercaseFirstLetter } from 'src/utils/stringUtils';
import { getDayName, getMonthName } from 'src/utils/translations';
import { areDatesTheSameDay, isUndefined, toISOLocal } from 'src/utils/utils';
import styles from './Planner.module.css';

const recipeTypes = Object.entries(RecipeType).map(([k, v]) => (v));

export default () => {
  const { t } = useTranslation();
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
          plannedRecipe={selectedPlannedRecipe}
          onComplete={onPlannedRecipeUpdated}
        />
      )}


      <Header title={t("pages.planner.title")} onBackClick={() => navigate(-1)} />

      <List sx={{ mb: 2 }} style={{ overflow: 'auto' }}>
        <Stack direction="row" alignItems="center" gap={1}>
          {availableDates.map((date) => (
            <DatePickerOption key={date} date={date} active={areDatesTheSameDay(date, selectedDate)} onClick={handleDateClick} />
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
              <Box key={recipeType} sx={{ mb: 2 }}>
                <Typography variant='h6'>{t(`types.recipe.types.${lowercaseFirstLetter(recipeType)}.displayName`)}</Typography>

                <Stack direction="column" gap={1}>
                  {plannedRecipes.map((plannedRecipe) => (
                    <PlannedRecipe
                      key={plannedRecipe.id}
                      plannedRecipe={{
                        ...plannedRecipe,
                        recipe: {
                          ...plannedRecipe.recipe,
                          images: plannedRecipe.recipe.images.map((image) => ({
                            ...image,
                            url: includeResizeQueryParameters(image.url, 300, 0)
                          }))
                        }
                      }}
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
