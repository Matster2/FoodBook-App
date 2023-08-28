
import { Box, CircularProgress, Container, IconButton, Stack, Typography } from '@mui/material';
import classnames from 'classnames';
import Header from 'components/Header';
import IngredientList from 'components/IngredientList';
import TogglablePlannedRecipe from 'components/TogglablePlannedRecipe';
import dayjs from 'dayjs';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import useFilters from 'hooks/useFilters';
import { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from 'react-router-dom';
import { lowercaseFirstLetter } from 'utils/stringUtils';
import { getDayName, getMonthName } from 'utils/translations';
import { areDatesTheSameDay, isUndefined, toISOLocal } from 'utils/utils';

import { CalendarMonth as CalendarIcon, RestaurantMenu as RecipesIcon, Done as TickIcon } from '@mui/icons-material';
import { ReactComponent as IngredientBreakdownIcon } from 'assets/icons/ingredient-breakdown.svg';
import { ReactComponent as IngredientOverviewIcon } from 'assets/icons/ingredient-overview.svg';
import IngredientListDateDialog from 'dialogs/IngredientListDateDialog';
import { RecipeType } from 'types';
import styles from './IngredientList.module.css';

const formatDate = (date) => {
  return `${getDayName(date)}, ${date.getDate()} ${getMonthName(date)}`
}

const recipeTypes = Object.entries(RecipeType).map(( [k, v] ) => (v));

function compare(plannedRecipe1, plannedRecipe2) {
  const recipe1Date = dayjs(plannedRecipe1.date);
  const recipe2Date = dayjs(plannedRecipe2.date);

  if (recipe1Date.isBefore(recipe2Date)){
    return -1;
  }

  if (recipe2Date.isBefore(recipe1Date)){
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
  .sort((a,b) => {
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
                      plannedRecipe={plannedRecipe}
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
            ingredients={plannedRecipe.ingredients}
          />
        </Box>
      ))}
    </>
  )
} 
export default () => {
  const { t } = useTranslation();
  const api = useAPI();
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

  const [loadingPlannerIngredientList, setLoadingPlannerIngredientList] = useState(false);
  const [originalPlannerIngredientList, setOriginalPlannerIngredientList] = useState();
  const [plannerIngredientList, setPlannerIngredientList] = useState();

  const [showDateDialog, setShowDateDialog] = useState(false);

  var dateFrom = new Date(filters.dateFrom);
  var dateTo = new Date(filters.dateTo);

  const showDates = !areDatesTheSameDay(dateFrom, dateTo);

  const fetchPlannerIngredientList = async () => {
    setLoadingPlannerIngredientList(true);
    try {
      const { data: originalData } = await api.getPlannerIngredientList(userId, {
        ...filters,
        excludedPlannedRecipeIds: []
      });
      setOriginalPlannerIngredientList(originalData);

      const { data } = await api.getPlannerIngredientList(userId, filters);
      setPlannerIngredientList(data);
    } catch {
      console.log('error fetching planner ingredient list');
    }
    setLoadingPlannerIngredientList(false);
  };

  useEffect(() => {
    setPlannerIngredientList();
    fetchPlannerIngredientList();
  }, [filters]);

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

  const handlePlannedRecipeToggle = (plannedRecipeId) => {
    const newExcludedPlannedRecipeIds = excludedPlannedRecipeIds.filter(x => x !== plannedRecipeId);

    if (!excludedPlannedRecipeIds.some(x => x === plannedRecipeId)) {
      newExcludedPlannedRecipeIds.push(plannedRecipeId);
    }

    setExcludedPlannedRecipeIds(newExcludedPlannedRecipeIds);
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


      <Container sx={{ pb: 10 }}>
        <Header title={t("pages.ingredientList.title")} onBackClick={() => navigate(-1)} />

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

          {loadingPlannerIngredientList && (
            <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
              <CircularProgress />
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
      </Container>
    </>
  );
};
