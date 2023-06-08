import React from 'react';
import PropTypes from 'prop-types';
import { Box, Typography } from '@mui/material';
import { isNull } from '../../utils/utils';
import styles from './NutritionList.module.css';

const NutritionList = ({ nutrition: { calories, sugar, fat, saturatedFat, sodium, protein, carbohydrates, fiber } }) => {
  const getNutritionRows = () => {
    return [
      { name: 'Calories', amount: calories, unit: 'kcal' },
      { name: 'Sugar', amount: sugar, unit: 'g' },
      { name: 'Fat', amount: fat, unit: 'g' },
      { name: 'Saturated Fat', amount: saturatedFat, unit: 'g' },
      { name: 'Sodium', amount: sodium, unit: 'mg' },
      { name: 'Protein', amount: protein, unit: 'g' },
      { name: 'Carbohydrates', amount: carbohydrates, unit: 'g' },
      { name: 'Fiber', amount: fiber, unit: 'g' },
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
