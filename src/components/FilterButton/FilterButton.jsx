import { Icon, IconButton } from '@mui/material';
import PropTypes from 'prop-types';
import FilterIcon from 'src/assets/icons/filter.svg';
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
