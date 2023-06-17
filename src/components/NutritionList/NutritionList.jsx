import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { Box, Typography } from '@mui/material';
import { isNull } from '../../utils/utils';
import styles from './NutritionList.module.css';

const NutritionList = ({ nutrition: { calories, sugar, fat, saturatedFat, sodium, protein, carbohydrates, fiber } }) => {
  const { t } = useTranslation();

  const getNutritionRows = () => {
    return [
      { name: t('types.recipe.fields.nutrition.calories'), amount: calories, unit: 'kcal' },
      { name: t('types.recipe.fields.nutrition.sugar'), amount: sugar, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.fat'), amount: fat, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.saturatedFat'), amount: saturatedFat, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.sodium'), amount: sodium, unit: 'mg' },
      { name: t('types.recipe.fields.nutrition.protein'), amount: protein, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.carbohydrates'), amount: carbohydrates, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.fiber'), amount: fiber, unit: 'g' },
    ];
  };

  const renderNutritionRow = (row) => {
    return (
      <Box className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between">
        <Typography>{row.name}</Typography>
        <Typography> {`${row.amount} ${row.unit}`}</Typography>
      </Box>
    )
  }

  return (
    <>
      {getNutritionRows()
        .filter((row) => !isNull(row.amount))
        .filter((row) => row.amount !== 0)
        .map((row) => renderNutritionRow(row))}
    </>
  );
};

NutritionList.propTypes = {
  nutrition: PropTypes.shape({
    calories: PropTypes.number,
    sugar: PropTypes.number,
    fat: PropTypes.number,
    saturatedFat: PropTypes.number,
    sodium: PropTypes.number,
    protein: PropTypes.number,
    carbohydrates: PropTypes.number,
    fiber: PropTypes.number,
  }).isRequired,
};


NutritionList.defaultProps = {
};

export default NutritionList;
