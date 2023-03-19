import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import styles from './FilterOption.module.css';

const FilterOption = ({ label, value, onClick, active }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    <Box onClick={handleClick} className={classnames(styles.component, active && styles.active)}>
      <Typography>{label}</Typography>
    </Box>
  );
};

FilterOption.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  active: PropTypes.bool,
};

FilterOption.defaultProps = {
  onClick: () => {},
  active: false,
};

export default FilterOption;
