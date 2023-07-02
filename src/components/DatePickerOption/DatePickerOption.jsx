import React, { useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import { getDayName, areDatesTheSameDay } from '../../utils/utils';

import styles from './DatePickerOption.module.css';

const DatePickerOption = ({ date, active, onClick }) => {
  const [past] = useState(() => {
    const todaysDate = new Date();
    return !areDatesTheSameDay(date, todaysDate) && date < todaysDate;
  });

  const handleClick = () => {
    onClick(date);
  };

  return (
    <Box
      sx={{ m: 0, p: 1 }}
      onClick={handleClick}
      className={classnames(styles.option, past && styles.past, active && styles.active)}
    >
      <Stack
        sx={{
          display: 'flex',
          justifyContent: 'center',
        }}
        direction="column"
        alignItems="center"
        gap={0.5}
      >
        <Typography className={styles.day}>{getDayName(date).slice(0, 1).toUpperCase()}</Typography>
        <Typography className={styles.date}>{date.getUTCDate()}</Typography>
      </Stack>
    </Box>
  );
};

DatePickerOption.propTypes = {
  date: PropTypes.string.isRequired,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};

DatePickerOption.defaultProps = {
  active: false,
  onClick: () => { },
};

export default DatePickerOption;
