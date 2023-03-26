import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import { Star as StarIcon } from '@mui/icons-material';
import styles from './RatingFilter.module.css';

const RatingFilter = ({ rating, onClick, selected, style }) => {
  const handleClick = () => {
    onClick(rating);
  };

  return (
    <Box style={style} onClick={handleClick} className={classnames(styles.component, selected && styles.selected)}>
      <Stack direction="column" alignItems="center" gap={0.4}>
        <StarIcon sx={{ color: '#FFB900' }} className={styles.icon} />
        <Typography>{rating}</Typography>
      </Stack>
    </Box>
  );
};

RatingFilter.propTypes = {
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func,
  selected: PropTypes.bool,
  style: PropTypes.shape({}),
};

RatingFilter.defaultProps = {
  onClick: () => {},
  selected: false,
  style: {},
};

export default RatingFilter;
