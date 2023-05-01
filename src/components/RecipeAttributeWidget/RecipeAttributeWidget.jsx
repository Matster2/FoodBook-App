import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Box, Stack, Typography } from '@mui/material';
import styles from './RecipeAttributeWidget.module.css';
import { ReactComponent as CaloriesIcon } from '../../assets/icons/calories.svg';

const RecipeAttributeWidget = ({ type, value }) => {
  const getText = () => {
    if (type === "calories") {
      return `${value} Cals`;
    }

    return "";
  }

  return (
    <Stack direction="column" gap={1} alignItems="center">
      <Box className={styles.box}>
        {type === 'calories' && <CaloriesIcon className={classnames(styles.icon, styles[type])} />}
      </Box>

      <Typography className={styles.text}>{getText()}</Typography>
    </Stack>
  );
};

RecipeAttributeWidget.propTypes = {
  type: PropTypes.oneOf(["calories"])
};

RecipeAttributeWidget.defaultProps = {

};

export default RecipeAttributeWidget;
