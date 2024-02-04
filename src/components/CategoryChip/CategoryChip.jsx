import { Chip, Icon } from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import tagIcons from 'src/config/tagIcons';
import { isNullOrEmpty } from 'src/utils/utils';
import styles from './CategoryChip.module.css';

const CategoryChip = ({ category, onClick, ...props }) => {
  const [icon, setIcon] = useState(tagIcons.default);

  const handleClick = () => {
    onClick(category.id);
  };

  useEffect(() => {
    if (tagIcons[category.icon.toLowerCase()] !== undefined && !isNullOrEmpty(tagIcons[category.icon.toLowerCase()])) {
      setIcon(tagIcons[category.icon.toLowerCase()]);
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
      {...props}
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
