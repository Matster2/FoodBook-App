import React from 'react';
import PropTypes from 'prop-types';
import { Chip } from '@mui/material';
import { LocalPizza as PizzaIcon } from '@mui/icons-material';
import styles from './CategoryChip.module.css';

const CategoryChip = ({ category, onClick }) => {
  const handleClick = () => {
    onClick(category.id);
  };

  return (
    <Chip className={styles.chip} label={category.name} color="primary" icon={<PizzaIcon />} onClick={handleClick} />
  );
};

CategoryChip.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func,
};

CategoryChip.defaultProps = {
  onClick: () => {},
};

export default CategoryChip;
