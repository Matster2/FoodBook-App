import { Icon, IconButton } from '@mui/material';
import FilterIcon from 'assets/icons/filter.svg';
import PropTypes from 'prop-types';
import React from 'react';
import styles from './FilterButton.module.css';

const FilterButton = ({ onClick }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <IconButton onClick={handleClick} className={styles.button}>
      <Icon>
        <img alt="filter" src={FilterIcon} height={22} width={22} />
      </Icon>
    </IconButton>
  );
};

FilterButton.propTypes = {
  onClick: PropTypes.func,
};

FilterButton.defaultProps = {
  onClick: () => {},
};

export default FilterButton;
