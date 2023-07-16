import { Box, Button, ButtonGroup, Dialog, Stack, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from "@mui/material/transitions";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import useAPI from 'hooks/useAPI';
import useAuth from 'hooks/useAuth';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";

import styles from './PlanRecipeDialog.module.css';

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  selected: boolean
}

const CustomPickersDay = styled(PickersDay)<CustomPickerDayProps>(({ theme, selected }) => ({
  ...(selected && {
    borderRadius: '50%',
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
    '&:active': {
      backgroundColor: `${theme.palette.primary.main} !important`,
    },
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function Day(props: PickersDayProps<Dayjs> & { selectedDays?: Dayjs[] }) {
  const { day, selectedDays = [], ...other } = props;

  var today = dayjs();

  return (
    <CustomPickersDay
      {...other}
      day={day}
      disabled={day.isBefore(today, "day")}
      selected={selectedDays.some(x => x.isSame(day, "day"))}
    />
  );
}

interface PlanRecipeDialogProps {
  open: boolean,
  onClose: () => void,
  transitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  recipe: Recipe
}

interface Recipe {
  id: string,
  servings: number
}

const PlanRecipeDialog = ({ open, onClose, transitionComponent, recipe }: PlanRecipeDialogProps) => {
  const { t } = useTranslation();
  const {
    claims: { userId },
  } = useAuth();

  const api = useAPI();

  const [selectedDays, setSelectedDays] = useState<Dayjs[]>([]);
  const [servings, setServings] = useState<number>(recipe.servings);

  const handleDateCalanderChange = (targetDay: Dayjs | null) => {
    if (targetDay === null) {
      return;
    }

    const newSelectedDays = selectedDays.filter((x) => !x.isSame(targetDay, "day"));

    if (!selectedDays.some((x) => x.isSame(targetDay, "day"))) {
      newSelectedDays.push(targetDay);
    }

    setSelectedDays(newSelectedDays);
  };

  const handleIncrementServings = () => {
    setServings(state => state + 1);
  };

  const handleDecrementServings = () => {
    setServings(state => state - 1);
  };

  const handleAddToPlannerClick = async () => {
    try {
      var dates = selectedDays.map((x) => (x.format('YYYY-MM-DD')))
      await api.planRecipe(userId, recipe.id, servings, dates);
      toast.success(t('requests.planner.planRecipe.success'));

      setSelectedDays([]);
      onClose();
    } catch {
      toast.error(t('requests.planner.planRecipe.failed'));
    }
  }

  return (
    <Dialog
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
        <Typography variant="h5" sx={{ mb: 1 }}>
          {t('components.planRecipeDialog.title')}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className={styles.calendar}
            onChange={(newValue) => handleDateCalanderChange(newValue)}
            slots={{ day: Day }}
            slotProps={{
              day: {
                selectedDays,
              } as any,
            }}
          />
        </LocalizationProvider>

        {selectedDays.length > 1 && (
          <Box sx={{ mb: 1 }}>
            <Typography textAlign="right" className={styles.selectedText}>{selectedDays.length} days selected</Typography>
          </Box>
        )}

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

        {selectedDays.length === 0 && (
          <Box sx={{ mb: 1 }}>
            <Typography textAlign="center" className={styles.selectedText}>{t('components.planRecipeDialog.selectDaysMessage')}</Typography>
          </Box>
        )}

        <Button
          disabled={selectedDays.length < 1}
          type="button"
          onClick={handleAddToPlannerClick}
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          {t('components.planRecipeDialog.addToPlanner')}
        </Button>
      </Box>
    </Dialog>
  );
};

export default PlanRecipeDialog;
