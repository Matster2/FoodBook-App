import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Chip, Icon } from '@mui/material';
import styles from './CategoryChip.module.css';
import { isNullOrEmpty } from '../../utils/utils';

import DefaultIcon from '../../assets/icons/icon8/default-96.png';
import ChampagneIcon from '../../assets/icons/icon8/champagne-96.png';
import CocktailIcon from '../../assets/icons/icon8/cocktail-96.png';
import HamburgerIcon from '../../assets/icons/icon8/hamburger-96.png';
import CurryIcon from '../../assets/icons/icon8/curry-96.png';
import MeatIcon from '../../assets/icons/icon8/meat-96.png';
import HealthyIcon from '../../assets/icons/icon8/healthy-food-96.png';
import CakeIcon from '../../assets/icons/icon8/cake-96.png';
import FishIcon from '../../assets/icons/icon8/fish-food-96.png';
import BreakfastIcon from '../../assets/icons/icon8/breakfast-96.png';
import CoffeeBeansIcon from '../../assets/icons/icon8/coffee-beans-96.png';
import LowCholesterolIcon from '../../assets/icons/icon8/low-cholesterol-food-96.png';
import KosherIcon from '../../assets/icons/icon8/kosher-food-96.png';
import InternationalIcon from '../../assets/icons/icon8/international-food-96.png';
import SoupIcon from '../../assets/icons/icon8/soup-plate-96.png';
import IceCreamIcon from '../../assets/icons/icon8/ice-cream-cone-96.png';
import LasagnaIcon from '../../assets/icons/icon8/lasagna-96.png';
import SpaghettiIcon from '../../assets/icons/icon8/spaghetti-96.png';

const CategoryChip = ({ category, onClick }) => {
  const [icon, setIcon] = useState(DefaultIcon);

  const handleClick = () => {
    onClick(category.id);
  };

  const icons = {
    champagne: ChampagneIcon,
    cocktail: CocktailIcon,
    hamburger: HamburgerIcon,
    curry: CurryIcon,
    meat: MeatIcon,
    healthy: HealthyIcon,
    cake: CakeIcon,
    fish: FishIcon,
    breakfast: BreakfastIcon,
    'coffee-beans': CoffeeBeansIcon,
    'low-cholesterol': LowCholesterolIcon,
    kosher: KosherIcon,
    international: InternationalIcon,
    soup: SoupIcon,
    'ice-cream': IceCreamIcon,
    lasagna: LasagnaIcon,
    spaghetti: SpaghettiIcon,
  };

  useEffect(() => {
    if (icons[category.icon.toLowerCase()] !== undefined && !isNullOrEmpty(icons[category.icon.toLowerCase()])) {
      setIcon(icons[category.icon.toLowerCase()]);
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
  onClick: () => {},
};

export default CategoryChip;
