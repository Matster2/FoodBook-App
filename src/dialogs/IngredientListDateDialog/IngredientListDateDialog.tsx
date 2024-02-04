import { Box, Button, Dialog, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { TransitionProps } from "@mui/material/transitions";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import useAPI from 'src/hooks/useAPI';
import { toISOLocal } from 'src/utils/utils';

import styles from './IngredientListDateDialog.module.css';

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  dayIsBetween: boolean;
  isFirstDay: boolean;
  isLastDay: boolean;
}

const CustomPickersDay = styled(PickersDay)<CustomPickerDayProps>(({ theme, dayIsBetween, isFirstDay, isLastDay }) => ({
  ...(dayIsBetween && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isFirstDay && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
  ...(isLastDay && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%',
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
})) as React.ComponentType<CustomPickerDayProps>;

interface IngredientListDateDialogProps {
  defaultValues: {
    from: Date,
    to: Date
  },
  open: boolean,
  onClose: () => void,
  transitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
  onSelected: (fromDate: Date, toDate: Date) => void
}

function Day(props: PickersDayProps<Dayjs> & { fromDay?: Dayjs, toDay?: Dayjs }) {
  const { day, fromDay, toDay, ...other } = props;

  const dayIsBetween = day.isAfter(fromDay, 'day') && day.isBefore(toDay, 'day');
  const isFirstDay = day.isSame(fromDay, 'day');
  const isLastDay = day.isSame(toDay, 'day');

  const isSelected = isFirstDay || dayIsBetween || isLastDay;

  const onlyOneDay = toDay?.isSame(fromDay);

  return (
    <CustomPickersDay
      {...other}
      day={day}
      sx={isSelected && !onlyOneDay ? { px: 2.5, mx: 0 } : {}}
      dayIsBetween={dayIsBetween}
      isFirstDay={isFirstDay}
      isLastDay={isLastDay}
    />
  );
}

const IngredientListDateDialog = ({ defaultValues, open, onClose, transitionComponent, onSelected }: IngredientListDateDialogProps) => {
  const { t } = useTranslation();
  const api = useAPI();

  const [fromDay, setFromDay] = useState<Dayjs>(dayjs(toISOLocal(defaultValues.from)));
  const [toDay, setToDay] = useState<Dayjs>(dayjs(toISOLocal(defaultValues.to)));

  const [latestSelection, setLatestSelection] = useState<Dayjs>();

  const handleDateCalanderChange = (newDay: Dayjs | null) => {
    if (newDay === null) {
      return;
    }

    var lastSelection = latestSelection;
    setLatestSelection(newDay);

    if (!lastSelection) {
      if (newDay.isBefore(fromDay)) {
        setToDay(fromDay);
        setFromDay(newDay);
        return;
      }

      if (newDay.isAfter(toDay)) {
        setFromDay(toDay);
        setToDay(newDay);
        return;
      }

      setToDay(newDay);
      return;
    }

    if (lastSelection.isSame(fromDay)) {
      if (newDay.isBefore(fromDay)) {
        setToDay(fromDay);
        setFromDay(newDay);
        return;
      }

      setToDay(newDay)
      return;
    }

    if (lastSelection.isSame(toDay)) {
      if (newDay.isAfter(toDay)) {
        setFromDay(toDay);
        setToDay(newDay);
        return;
      }

      setFromDay(newDay)
      return;
    }
  };

  const handleUpdateClick = () => {
    const dateFrom = fromDay.toDate();
    const dateTo = toDay?.toDate();
    onSelected(dateFrom, dateTo);
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
          {t('components.ingredientListDateDialog.title')}
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            className={styles.calendar}
            onChange={(newValue) => handleDateCalanderChange(newValue)}
            slots={{ day: Day }}
            slotProps={{
              day: {
                fromDay,
                toDay
              } as any,
            }}
          />
        </LocalizationProvider>

        <Button
          type="button"
          onClick={handleUpdateClick}
          fullWidth
          variant="contained"
          sx={{ mb: 2 }}
        >
          {t('components.ingredientListDateDialog.update')}
        </Button>
      </Box>
    </Dialog>
  );
};

export default IngredientListDateDialog;
