import React, { useState, useEffect } from 'react';
import { Dialog, CircularProgress, Box, Typography, IconButton, Grid } from '@mui/material';
import useAPI from '../../hooks/useAPI';
import IngredientList from '../../components/IngredientList';
import styles from './PlannerIngredientListDialog.module.css';
import { ReactComponent as IngredientOverviewIcon } from '../../assets/icons/ingredient-overview.svg';
import { ReactComponent as IngredientBreakdownIcon } from '../../assets/icons/ingredient-breakdown.svg';

const views = {
  ingredients: "ingredients",
  breakdown: "breakdown"
}

const PlannerIngredientListDialog = ({ open, onClose, userId, filters, transitionComponent }) => {
  const api = useAPI();

  const [currentView, setCurrentView] = useState(views.ingredients);

  const [loadingPlannerIngredientList, setLoadingPlannerIngredientList] = useState(false);
  const [plannerIngredientList, setPlannerIngredientList] = useState();

  const fetchPlannerIngredientList = async () => {
    setLoadingPlannerIngredientList(true);
    try {
      const { data } = await api.getPlannerIngredientList(userId, filters);
      setPlannerIngredientList(data);
    } catch {
      console.log('error fetching planner ingredient list');
    }
    setLoadingPlannerIngredientList(false);
  };

  useEffect(() => {
    if (open) {
      fetchPlannerIngredientList();
    }
  }, [open]);

  const handleToggleViewClick = () => {
    setCurrentView((currentView) => currentView === views.ingredients ? views.breakdown : views.ingredients);
  }

  const getIngredients = () => {
    return plannerIngredientList.ingredients;
  }

  const renderIngredientView = () => (
    <Box sx={{ mb: 4 }}>
      <IngredientList
        ingredients={getIngredients()}
      />
    </Box>
  )

  const renderBreakdownView = () => {
    return (
      <>
        {plannerIngredientList.breakdown.plannedRecipes.map((plannedRecipe) => (
          <Box sx={{ mb: 4 }}>
            <Typography className={styles.recipeName}>{plannedRecipe.recipe.name}</Typography>
            <Typography className={styles.recipeServings}>{plannedRecipe.servings} Servings</Typography>
            <IngredientList
              ingredients={plannedRecipe.ingredients}
            />
          </Box>
        ))}
      </>
    )
  }

  return (
    <Dialog
      fullWidth
      maxWidth="sm"
      open={open}
      onClose={onClose}
      TransitionComponent={transitionComponent}
      PaperProps={{
        style: {
          backgroundColor: '#F6F6F6',
          maxHeight: "80vh"
        },
      }}
    >
      <Box sx={{ p: 4, mb: 1 }} className={styles.header}>
        <Grid container justifyContent="space-between">
          <Grid item>
            <Typography className={styles.title} variant="h5">
              Ingredients
            </Typography>
          </Grid>
          <Grid item>
            <IconButton className={styles.viewButton} onClick={handleToggleViewClick}>
              {currentView === views.ingredients && <IngredientOverviewIcon className={styles.viewIcon} />}
              {currentView === views.breakdown && <IngredientBreakdownIcon className={styles.viewIcon} />}
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 4, pt: 2, mt: 10 }} className={styles.content}>
        {(loadingPlannerIngredientList && !plannerIngredientList) && (
          <Box sx={{ mt: 2 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {plannerIngredientList && (
          <>
            {currentView === views.ingredients && renderIngredientView()}
            {currentView === views.breakdown && renderBreakdownView()}
          </>
        )}
      </Box>
    </Dialog>
  );
};

export default PlannerIngredientListDialog;
