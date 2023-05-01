import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Stack, Typography } from '@mui/material';
import styles from './ServingsIncrementor.module.css';

const ServingsIncrementor = ({ defaultValue, recipeServings, onChange, suffixText, min, max }) => {
  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    setValue(defaultValue)
  }, [defaultValue])

  const handleDecrementClick = () => {
    setValue(value => {
      const newValue = value - 1
      onChange(newValue)
      return newValue
    })
  }

  const handleIncrementClick = () => {
    setValue(value => {
      const newValue = value + 1
      onChange(newValue)
      return newValue
    })
  }

  const getText = () => {
    const parts = [value];

    if (suffixText) {
      parts.push(suffixText);
    }

    return parts.join(" ")
  }

  const isDecrementDisabled = value <= min;
  const isIncrementDisabled = value >= max;
  const isOptimalServing = value % recipeServings === 0;

  return (
    <Stack direction="row" alignItems="center" display="inline-flex">
      <button className={classnames(styles.button, isDecrementDisabled && styles.disabled)} disabled={isDecrementDisabled} onClick={handleDecrementClick}>-</button>
      <Typography className={styles.text}>{getText()}</Typography>
      <button className={classnames(styles.button, isIncrementDisabled && styles.disabled)} disabled={isIncrementDisabled} onClick={handleIncrementClick}>+</button>
    </Stack>
  );
};

ServingsIncrementor.propTypes = {
  defaultValue: PropTypes.number,
  suffixText: PropTypes.string,
};

ServingsIncrementor.defaultProps = {
  defaultValue: 0,
  suffixText: "",
  onChange: () => { }
};

export default ServingsIncrementor;
