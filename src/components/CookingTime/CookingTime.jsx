import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';

import styles from './CookingTime.module.css';
import { ReactComponent as PrepIcon } from '../../assets/icons/prep.svg';
import { ReactComponent as CookIcon } from '../../assets/icons/cook.svg';
import { ReactComponent as TimeIcon } from '../../assets/icons/time.svg';

const CookingTime = ({ type, time }) => {
  const config = {
    prep: {
      title: 'Prep',
      colour: 'brown',
    },
    cook: {
      title: 'Cook',
      colour: 'orange',
    },
    total: {
      title: 'Total',
      colour: 'blue',
    },
  };

  const getTimeString = () => {
    const hours = Math.floor(time / 60);
    const minutes = time % 60;

    const parts = [];

    if (hours > 0) {
      parts.push(`${hours} h`);
    }

    if (minutes > 1) {
      parts.push(`${minutes} mins`);
    } else if (minutes > 0) {
      parts.push(`${minutes} min`);
    }

    return parts.join(' ');
  };

  return (
    <div className={styles.container}>
      <Box xs={{ p: 1 }}>
        <Stack
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          direction="row"
          alignItems="center"
          gap={1}
        >
          {type === 'prep' && <PrepIcon className={classnames(styles.icon, styles[type])} />}
          {type === 'cook' && <CookIcon className={classnames(styles.icon, styles[type])} />}
          {type === 'total' && <TimeIcon style={{ width: '20px' }} className={classnames(styles.icon, styles[type])} />}
          <Stack direction="column">
            <Typography className={styles.title}>{config[type].title}</Typography>
            <Typography noWrap className={classnames(styles.time, styles[type])}>
              {getTimeString()}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </div>
  );
};

CookingTime.propTypes = {
  type: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
};

export default CookingTime;
