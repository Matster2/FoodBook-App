import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { IconButton } from '@mui/material';
import styles from './FavouriteHeart.module.css';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';

const FavouriteHeart = ({ disabled, favourited, onClick, width }) => {
  const handleClick = () => {
    onClick();
  };

  return (
    <IconButton
      sx={{ width, height: width }}
      className={classnames(styles.button, favourited && styles.favourited)}
      onClick={handleClick}
      disabled={disabled}
    >
      <HeartIcon className={styles.icon} />
    </IconButton>
  );
};

FavouriteHeart.propTypes = {
  width: PropTypes.number,
  disabled: PropTypes.bool,
  favourited: PropTypes.bool,
  onClick: PropTypes.func,
};

FavouriteHeart.defaultProps = {
  width: 30,
  disabled: false,
  favourited: false,
  onClick: () => {},
};

export default FavouriteHeart;
