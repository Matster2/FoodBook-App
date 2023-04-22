import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { styled } from '@mui/material/styles';
import { Typography, Box, Dialog } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { TransitionProps } from "@mui/material/transitions";

interface CustomPickerDayProps extends PickersDayProps<Dayjs> {
  selected: boolean
}

const CustomPickersDay = styled(PickersDay)<CustomPickerDayProps>(({ theme, selected }) => ({
  ...(selected && {
    borderRadius: 0,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.primary.dark,
    },
  }),
})) as React.ComponentType<CustomPickerDayProps>;

function Day(props: PickersDayProps<Dayjs> & { selectedDay?: Dayjs | null }) {
  const { day, selectedDay, ...other } = props;

  if (selectedDay == null) {
    return <PickersDay day={day} {...other} />;
  }

  return (
    <CustomPickersDay
      {...other}
      day={day}
      selected
    />
  );
}

interface PlanRecipeDialogProps {
  open: boolean,
  onClose: () => void,
  transitionComponent?: React.JSXElementConstructor<
    TransitionProps & { children: React.ReactElement<any, any> }
  >;
}


const PlanRecipeDialog = ({ open, onClose, transitionComponent} : PlanRecipeDialogProps) => {
  const [selectedDates, setSelectedDates] = useState<Dayjs[]>([]);
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'));

  const handleDateCalanderChange = (newValue: Dayjs) => {
    const newSelectedDates = selectedDates.filter((x) => x !== newValue);

    if (!selectedDates.some((x) => x === newValue)) {
      selectedDates.push(newValue);
    }

    setSelectedDates(newSelectedDates);
  };

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
          Planner
        </Typography>

        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DateCalendar
            value={value}
            onChange={(newValue) => setValue(newValue)}
            slots={{ day: Day }}
            slotProps={{
              day: {
                selectedDay: value,
              } as any,
            }}
          />
        </LocalizationProvider>
      </Box>
    </Dialog>
  );
};

export default PlanRecipeDialog;
