
import {
  CalendarMonth as CalendarIcon,
  Scale as MeasurementIcon,
  RestaurantMenu as RecipesIcon, Done as TickIcon
} from '@mui/icons-material';
import { Box, CircularProgress, IconButton, Stack, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import classnames from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import api from 'src/api';
import IngredientBreakdownIcon from 'src/assets/icons/ingredient-breakdown.svg?react';
import IngredientOverviewIcon from 'src/assets/icons/ingredient-overview.svg?react';
import IngredientList from 'src/components/IngredientList';
import TogglablePlannedRecipe from 'src/components/TogglablePlannedRecipe';
import IngredientListDateDialog from 'src/dialogs/IngredientListDateDialog';
import useAuth from 'src/hooks/useAuth';
import useFilters from 'src/hooks/useFilters';
import PageLayout from 'src/layouts/PageLayout';
import { MeasurementSystem, RecipeType } from 'src/types';
import { includeResizeQueryParameters } from 'src/utils/imageUtils';
import { lowercaseFirstLetter } from 'src/utils/stringUtils';
import { getMeasurementSystemTranslation } from 'src/utils/translations';
import { areDatesTheSameDay, isUndefined, toISOLocal } from 'src/utils/utils';
import styles from './IngredientList.module.css';

const recipeTypes = Object.entries(RecipeType).map(([k, v]) => (v));

function compare(plannedRecipe1, plannedRecipe2) {
  const recipe1Date = dayjs(plannedRecipe1.date);
  const recipe2Date = dayjs(plannedRecipe2.date);

  if (recipe1Date.isBefore(recipe2Date)) {
    return -1;
  }

  if (recipe2Date.isBefore(recipe1Date)) {
    return 1;
  }

  if (recipeTypes.indexOf(plannedRecipe1.type, -1) < recipeTypes.indexOf(plannedRecipe2.type, -1)) {
    return -1
  }

  if (recipeTypes.indexOf(plannedRecipe2.type, -1) < recipeTypes.indexOf(plannedRecipe1.type, -1)) {
    return 1;
  }

  return 0;
}

const views = {
  ingredients: "ingredients",
  breakdown: "breakdown"
}

const PlannedRecipesView = ({ plannedRecipes, excludedPlannedRecipeIds, handlePlannedRecipeToggle, showDates }) => {
  const { t } = useTranslation();

  const days =
    [...new Set(plannedRecipes.map(x => x.date))]
      .map(x => new Date(x))
      .sort((a, b) => {
        return b - a;
      });

  return (
    <>
      {days.map((day) => (
        <>
          {showDates && (
            <Typography sx={{ mb: 1 }} className={styles.date}>{formatDate(day)}</Typography>
          )}

          {recipeTypes.map((recipeType) => {
            const recipes = plannedRecipes.filter(plannedRecipe => plannedRecipe.recipe.type.toLowerCase() === recipeType.toLowerCase());

            if (recipes.length === 0) {
              return;
            }

            return (
              <Box sx={{ mb: 2 }}>
                <Typography variant='h6'>{t(`types.recipe.types.${lowercaseFirstLetter(recipeType)}.displayName`)}</Typography>

                <Stack direction="column" gap={1}>
                  {recipes.map((plannedRecipe) => (
                    <TogglablePlannedRecipe
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
                      enabled={!excludedPlannedRecipeIds.includes(plannedRecipe.id)}
                      onChange={(value) => handlePlannedRecipeToggle(plannedRecipe.id, value)}
                    />
                  ))}
                </Stack>
              </Box>
            )
          })}
        </>
      ))}
    </>
  )
}

const IngredientView = ({ ingredients, checkboxesEnabled }) => {
  return (
    <IngredientList
      ingredients={ingredients}
      enableCheckboxes={checkboxesEnabled}
    />
  );
}

const BreakdownView = ({ breakdown, showDates }) => {
  return (
    <>
      {breakdown.plannedRecipes.sort(compare).map((plannedRecipe) => (
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 1 }}>
            {showDates && (
              <Typography className={styles.recipeDate}>{formatDate(new Date(plannedRecipe.date))}</Typography>
            )}
            <Typography className={styles.recipeName}>{plannedRecipe.recipe.name}</Typography>
            <Typography className={styles.recipeServings}>{plannedRecipe.servings} Servings</Typography>
          </Box>
          <IngredientList
            recipeIngredients={plannedRecipe.ingredients}
          />
        </Box>
      ))}
    </>
  )
}
export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    claims: { userId },
  } = useAuth();

  const { filters, setFilter } = useFilters({
    dateFrom: toISOLocal(new Date()).split('T')[0],
    dateTo: toISOLocal(new Date()).split('T')[0],
    excludedPlannedRecipeIds: [],
    ...location?.state?.filters,
  });

  const [excludedPlannedRecipeIds, setExcludedPlannedRecipeIds] = useState([]);

  const [currentView, setCurrentView] = useState(views.ingredients);
  const [showPlannedRecipesView, setShowPlannedRecipesView] = useState(false);
  const [checkboxesEnabled, setCheckboxesEnabled] = useState(false);

  const [showDateDialog, setShowDateDialog] = useState(false);

  var dateFrom = new Date(filters.dateFrom);
  var dateTo = new Date(filters.dateTo);

  const showDates = !areDatesTheSameDay(dateFrom, dateTo);

  const {
    isLoading: loadingPlannerIngredientList,
    data: plannerIngredientList
  } = useQuery({
    queryKey: ["planner", userId, { ...filters }],
    queryFn: () => api.users.getPlannerIngredientList(userId, {
      ...filters
    })
      .then(({ data }) => data)
  });

  /* Handlers */
  const handleShowRecipes = () => {
    setShowPlannedRecipesView((currentValue) => {
      if (currentValue) {
        setFilter("excludedPlannedRecipeIds", excludedPlannedRecipeIds)
      }

      return !currentValue;
    });
  }

  const handleToggleViewClick = () => {
    setCurrentView((currentView) => currentView === views.ingredients ? views.breakdown : views.ingredients);
  }

  const handleToggleCheckboxesClick = () => {
    setCheckboxesEnabled((currentValue) => !currentValue);
  }

  const handleDateSelectionChange = (dateFrom, dateTo) => {
    setFilter('dateFrom', toISOLocal(dateFrom).split('T')[0]);
    setFilter('dateTo', toISOLocal(dateTo).split('T')[0]);
    setShowDateDialog(false);
  }

  const handlePlannedRecipeToggle = (plannedRecipeId: string) => {
    const newExcludedPlannedRecipeIds = excludedPlannedRecipeIds.filter(x => x !== plannedRecipeId);

    if (!excludedPlannedRecipeIds.some(x => x === plannedRecipeId)) {
      newExcludedPlannedRecipeIds.push(plannedRecipeId);
    }

    setExcludedPlannedRecipeIds(newExcludedPlannedRecipeIds);
  }

  const handleMeasurementSystemClick = async () => {
    var measurementSystem = filters.measurementSystem;

    switch (measurementSystem) {
      case MeasurementSystem.Metric:
        measurementSystem = MeasurementSystem.Imperial;
        break;
      case MeasurementSystem.Imperial:
        measurementSystem = undefined;
        break;
      default:
        measurementSystem = MeasurementSystem.Metric;
    }
    setFilter("measurementSystem", measurementSystem)
  }

  /* Rendering */
  const getDateString = () => {
    var dateFrom = new Date(filters.dateFrom);
    var dateTo = new Date(filters.dateTo);

    if (areDatesTheSameDay(dateFrom, dateTo)) {
      return formatDate(dateFrom);
    }

    return `${formatDate(dateFrom)} - ${formatDate(dateTo)}`;
  }

  const getScopeString = () => {
    var recipesString = undefined;
    var excludedRecipesString = undefined;

    if (!isUndefined(originalPlannerIngredientList) && !isUndefined(plannerIngredientList)) {
      if (originalPlannerIngredientList.breakdown.plannedRecipes.length !== plannerIngredientList.breakdown.plannedRecipes.length) {
        const noOfExcludedPlannedRecipes = originalPlannerIngredientList.breakdown.plannedRecipes.length - plannerIngredientList.breakdown.plannedRecipes.length;

        excludedRecipesString = ` - ${noOfExcludedPlannedRecipes}  ${t('common.words.excluded')}`
      }

      recipesString = `(${plannerIngredientList.breakdown.plannedRecipes.length} ${plannerIngredientList.breakdown.plannedRecipes.length === 1 ? t('types.recipe.name') : t('types.recipe.pluralName')}${excludedRecipesString ?? ''})`;
    }

    var dateFrom = dayjs(filters.dateFrom);
    var dateTo = dayjs(filters.dateTo);
    var noOfDays = dateTo.diff(dateFrom, 'day', true) + 1;

    const datesString = `${noOfDays} ${noOfDays === 1 ? t('common.words.day') : t('common.words.days')}`

    return [datesString, recipesString].join(' ');
  }

  return (
    <>
      <IngredientListDateDialog
        open={showDateDialog}
        onClose={() => {
          setShowDateDialog(false);
        }}
        defaultValues={{
          from: new Date(filters.dateFrom),
          to: new Date(filters.dateTo)
        }}
        onSelected={handleDateSelectionChange}
      />

      <PageLayout
        title={t("pages.ingredientList.title")}
      >
        <Box>
          <Stack sx={{ mb: 2 }} direction="row" display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography className={styles.dates}>{getDateString()}</Typography>
              <Typography className={styles.scope}>{getScopeString()}</Typography>
            </Box>

            <CalendarIcon
              onClick={() => setShowDateDialog(true)}
            />
          </Stack>

          {!loadingPlannerIngredientList && plannerIngredientList && plannerIngredientList.breakdown.plannedRecipes.length === 0 && (
            <Box textAlign="center" sx={{ marginTop: '20%' }}>
              <Typography>
                {filters.dateFrom !== filters.dateTo
                  ? t('pages.ingredientList.noPlannedRecipesDays')
                  : t('pages.ingredientList.noPlannedRecipesDay')}
              </Typography>
            </Box>
          )}

          {(plannerIngredientList && plannerIngredientList.breakdown.plannedRecipes.length > 0) && (
            <>
              <Stack sx={{ mb: 2 }} direction="row" display="flex" justifyContent="space-between">
                <IconButton className={classnames(styles.optionButton, !showPlannedRecipesView && styles.optionButtonDisabled)} onClick={handleShowRecipes}>
                  <RecipesIcon className={styles.optionIcon} />
                </IconButton>

                {!showPlannedRecipesView && (
                  <Stack direction="row" gap={1}>
                    <Stack sx={{ marginLeft: 'auto' }} direction="row" alignItems="center" gap={1}>
                      {filters.measurementSystem && <Typography className={styles.measurementSystem}>{getMeasurementSystemTranslation(filters.measurementSystem)}</Typography>}

                      <IconButton className={styles.optionButton} onClick={handleMeasurementSystemClick}>
                        <MeasurementIcon className={styles.optionIcon} />
                      </IconButton>
                    </Stack>

                    {currentView === views.ingredients && (
                      <IconButton className={classnames(styles.optionButton, !checkboxesEnabled && styles.optionButtonDisabled)} onClick={handleToggleCheckboxesClick}>
                        <TickIcon className={styles.optionIcon} />
                      </IconButton>
                    )}

                    <IconButton className={styles.optionButton} onClick={handleToggleViewClick}>
                      {currentView === views.ingredients && <IngredientOverviewIcon className={styles.optionIcon} />}
                      {currentView === views.breakdown && <IngredientBreakdownIcon className={styles.optionIcon} />}
                    </IconButton>
                  </Stack>
                )}
              </Stack>

              {loadingPlannerIngredientList && (
                <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
                  <CircularProgress />
                </Box>
              )}

              {showPlannedRecipesView && (
                <PlannedRecipesView
                  plannedRecipes={originalPlannerIngredientList.breakdown.plannedRecipes}
                  excludedPlannedRecipeIds={excludedPlannedRecipeIds}
                  handlePlannedRecipeToggle={handlePlannedRecipeToggle}
                  showDates={showDates}
                />
              )}

              {!showPlannedRecipesView && (
                <>
                  {currentView === views.ingredients && (
                    <IngredientView
                      ingredients={plannerIngredientList.ingredients}
                      checkboxesEnabled={checkboxesEnabled}
                    />
                  )}
                  {currentView === views.breakdown && (
                    <BreakdownView
                      breakdown={plannerIngredientList.breakdown}
                      showDates={showDates}
                    />
                  )}
                </>
              )}
            </>
          )}
        </Box>
      </PageLayout>
    </>
  );
};