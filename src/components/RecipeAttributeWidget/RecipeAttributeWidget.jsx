import { Box, Icon, Stack, Typography } from '@mui/material';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { isUndefined } from 'src/utils/utils';
import styles from './RecipeAttributeWidget.module.css';

import AlcoholIcon from 'src/assets/icons/alcohol.svg?react';
import CaloriesIcon from 'src/assets/icons/calories.svg?react';

const RecipeAttributeWidget = ({ type, value }) => {
  const { t } = useTranslation();

  const variants = [
    { type: "default", text: '', icon: <CaloriesIcon />, backgroundColor: '#FFC4B8', iconColor: '#F54343' },
    { type: "calories", text: `~ ${value} Cals`, icon: <CaloriesIcon />, backgroundColor: '#FFC4B8', iconColor: '#F54343' },
    { type: "alcohol", text: t('components.recipeAttributeWidget.alcohol.text'), icon: <AlcoholIcon />, backgroundColor: '#ec9fd2', iconColor: '#b51b8e' },

    // blue #9fddec #1b5fb5 
  ]

  const [variant, setVariant] = useState(() => {
    var x = variants.find(x => x.type === type);

    if (!isUndefined(x)) {
      return x
    }

    return variants.find(x => x.type === "default");
  })

  return (
    <Stack direction="column" gap={1} alignItems="center">
      <Box className={styles.box} sx={{ background: variant.backgroundColor }} display="flex" justifyContent="center" alignItems="center">
        <Icon className={classnames(styles.icon, styles[type])} sx={{ stroke: variant.iconColor }}>
          {variant.icon}
        </Icon>
      </Box>

      <Typography className={styles.text}>{variant.text}</Typography>
    </Stack>
  );
};

RecipeAttributeWidget.propTypes = {
  type: PropTypes.oneOf(["calories", "alcohol"])
};

RecipeAttributeWidget.defaultProps = {

};

export default RecipeAttributeWidget;
