import { Chip, Icon } from '@mui/material';
import categoryIcons from 'config/categoryIcons';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { isNullOrEmpty } from 'utils/utils';
import styles from './CategoryChip.module.css';

const CategoryChip = ({ category, onClick }) => {
  const [icon, setIcon] = useState(categoryIcons.default);

  const handleClick = () => {
    onClick(category.id);
  };

  useEffect(() => {
    if (categoryIcons[category.icon.toLowerCase()] !== undefined && !isNullOrEmpty(categoryIcons[category.icon.toLowerCase()])) {
      setIcon(categoryIcons[category.icon.toLowerCase()]);
    }
  }, [category]);

  return (
    <Chip
      className={styles.chip}
      label={category.name}
      color="primary"
      icon={
        <Icon>
          <img className={styles.icon} alt={category.name} src={icon} />
        </Icon>
      }
      onClick={handleClick}
    />
  );
};

CategoryChip.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    icon: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
};

CategoryChip.defaultProps = {
  onClick: () => { },
};

export default CategoryChip;
