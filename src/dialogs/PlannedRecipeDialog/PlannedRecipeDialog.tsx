import {
  Box,
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  Typography
} from '@mui/material';
import { TransitionProps } from "@mui/material/transitions";
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import RecipeImage from 'src/components/RecipeImage';
import useAPI from 'src/hooks/useAPI';
import { getDayName, getMonthName } from 'src/utils/translations';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';

import { LoadingButton } from '@mui/lab';
import styles from './PlannedRecipeDialog.module.css';

interface PlannedRecipeDialogProps {
  open: boolean,
  onClose: () => void,
  onComplete: () => void,
  transitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  plannedRecipe: PlannedRecipe
}

interface PlannedRecipe {
  id: string;
  servings: number;
  date: Date;

  recipe: {
    name: string;
    images: {
      url: string
    }[];
  }
}

const PlannedRecipeDialog = ({ open, onClose, onComplete, transitionComponent, plannedRecipe }: PlannedRecipeDialogProps) => {
  const { t } = useTranslation();

  const [showRemoveConfirmationModal, setShowRemoveConfirmationModal] = useState(false);

  const api = useAPI();

  const [servings, setServings] = useState<number>(plannedRecipe.servings);

  const [updating, setUpdating] = useState(false);

  const handleIncrementServings = () => {
    setServings(state => state + 1);
  };

  const handleDecrementServings = () => {
    setServings(state => state - 1);
  };

  const handleUpdateClick = async () => {
    setUpdating(true);

    try {
      await api.updatePlannedRecipe(plannedRecipe.id, servings);
      toast.success(t('requests.planner.updatePlannedRecipe.success'));

      setShowRemoveConfirmationModal(false);
      onClose();
      onComplete();
    } catch {
      toast.error(t('requests.planner.updatePlannedRecipe.failed'));
    }

    setUpdating(false);
  }

  const handleRemoveClick = () => {
    setShowRemoveConfirmationModal(true);
  }

  const handleRemovePlannedRecipe = async () => {
    try {
      await api.removePlannedRecipe(plannedRecipe.id);
      toast.success(t('requests.planner.removePlannedRecipe.success'));

      onClose();
      onComplete();
    } catch {
      toast.error(t('requests.planner.removePlannedRecipe.failed'));
    }
  }

  const handleRemoveModalClose = () => {
    setShowRemoveConfirmationModal(false);
  }

  useEffect(() => {
    setShowRemoveConfirmationModal(false);
  }, [plannedRecipe])

  const getDateString = () => {
    var date = new Date(plannedRecipe.date)
    return `${getDayName(date)}, ${date.getDate()} ${getMonthName(date)}`
  }

  return (
    <>
      {showRemoveConfirmationModal && (
        <Dialog
          open={open}
          onClose={handleRemoveModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle sx={{ mt: 2 }} id="alert-dialog-title">
            {t('components.plannedRecipeDialog.removeTitle')}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {t('components.plannedRecipeDialog.removeWarning')}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleRemoveModalClose}>
              {t('common.words.no')}
            </Button>
            <Button onClick={handleRemovePlannedRecipe} autoFocus>
              {t('common.words.yes')}
            </Button>
          </DialogActions>
        </Dialog>
      )}

      <Dialog
        fullWidth
        open={open}
        onClose={onClose}
        TransitionComponent={transitionComponent}
        PaperProps={{
          style: {
            backgroundColor: '#F6F6F6',
          },
        }}
      >
        <Box sx={{ p: 4 }}>
          <Typography variant="h5" sx={{ mb: 2 }} className={styles.date}>{getDateString()}</Typography>

          <Grid container gap={2}>
            <Grid item xs={3} justifyContent="center" sx={{ minHeight: 50 }}>
              {plannedRecipe.recipe.images.length > 0 && (
                <Swiper spaceBetween={10} slidesPerView={1} centeredSlides className={styles.swiper}>
                  {plannedRecipe.recipe.images.length > 0 && (
                    <SwiperSlide className={styles.imageContainer}>
                      <img className={styles.image} src={plannedRecipe.recipe.images[0].url} alt="recipe" />
                    </SwiperSlide>
                  )}
                </Swiper>
              )}

              {plannedRecipe.recipe.images.length === 0 && (
                <RecipeImage className="" src={undefined} />
              )}
            </Grid>
            <Grid item xs display="flex" alignItems="center">
              <Box display="flex" flexDirection="column" width="100%">
                <Typography className={styles.name} sx={{ mb: 0.5 }}>{plannedRecipe.recipe.name}</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 4
            }}
          >
            <Stack direction="column">
              <Typography textAlign="center" variant='h6'>{t('types.recipe.fields.servings.name')}</Typography>

              <ButtonGroup size="small" aria-label="small button group">
                <Button variant="contained" disabled={servings <= 1} onClick={handleDecrementServings}>-</Button>
                <Button disabled className={styles.servings}>{servings}</Button>
                <Button variant="contained" onClick={handleIncrementServings}>+</Button>
              </ButtonGroup>
            </Stack>
          </Box>

          <LoadingButton
            disabled={plannedRecipe.servings === servings}
            type="button"
            onClick={handleUpdateClick}
            fullWidth
            variant="contained"
            sx={{ mb: 2 }}
            loading={updating}
          >
            {t('components.plannedRecipeDialog.update')}
          </LoadingButton>

          <Typography sx={{ mt: 2, textAlign: 'center' }} className={styles.remove} onClick={handleRemoveClick}>Remove</Typography>
        </Box>
      </Dialog>
    </>
  );
};

export default PlannedRecipeDialog;
