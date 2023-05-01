import React from 'react';
import PropTypes from 'prop-types';
import Fraction from '../../utils/fraction';
import { Box, Typography } from '@mui/material';
import styles from './IngredientList.module.css';

const IngredientList = ({ ingredients }) => {
  const getUnitName = (unitOfMeasurement, amount) => {
    if (unitOfMeasurement.name.toLowerCase() === 'unit') {
      return '';
    }

    return amount > 1 ? `${unitOfMeasurement.pluralName} ` : `${unitOfMeasurement.name} `;
  };

  const getAmountString = (amount) => {
    const isWholeNumber = amount % 1 === 0;

    if (isWholeNumber) {
      return amount;
    }

    const integer = Math.trunc(amount);
    const decimal = Number(amount - integer).toFixed(2);

    const fraction = Fraction(decimal);

    if (integer === 0) {
      return `${fraction.numerator}/${fraction.denominator}`;
    }

    if (decimal === 0.33) {
      fraction.numerator = 1;
      fraction.denominator = 3;
    }

    return `${integer} ${fraction.numerator}/${fraction.denominator}`;
  };

  const renderIngredient = (ingredient) => {
    const amount = getAmountString(ingredient.amount);
    const unit = getUnitName(ingredient.unitOfMeasurement, ingredient.amount);

    const ingredientName = amount === 1 ? ingredient.name : ingredient.pluralName;

    return (
      <Box className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between">
        <Typography>{ingredientName}</Typography>
        <Typography> {`${amount} ${unit}`.trim()}</Typography>
      </Box>
    )
  }

  return (
    <>
      {ingredients.map((ingredient) => renderIngredient(ingredient))}
    </>
  );
};

IngredientList.propTypes = {
  ingredient: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    pluralName: PropTypes.string,
    amount: PropTypes.number,
    optional: PropTypes.bool,
    unitOfMeasurement: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      pluralName: PropTypes.string,
    })
  })
};

IngredientList.defaultProps = {
};

export default IngredientList;
