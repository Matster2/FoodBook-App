import React from 'react';
import PropTypes from 'prop-types';
import Fraction from '../../utils/fraction';
import { Box, Typography } from '@mui/material';
import styles from './IngredientList.module.css';

const unitOfMeasurementsThatMustBeAWholeNumber = ['milligram', 'milliliter'];

const IngredientList = ({ ingredients }) => {
  const getUnitName = (unitOfMeasurement, amount) => {
    if (unitOfMeasurement.code === 'unit') {
      return '';
    }

    return amount > 1 ? `${unitOfMeasurement.pluralName} ` : `${unitOfMeasurement.name} `;
  };

  function compare(ingredient1, ingredient2) {
    if (ingredient1.unitOfMeasurement.code !== ingredient2.unitOfMeasurement.code) {
      if (ingredient1.unitOfMeasurement.code === "unit") {
        return -1;
      }

      if (ingredient2.unitOfMeasurement.code === "unit") {
        return 1;
      }

      if (ingredient1.unitOfMeasurement.code < ingredient2.unitOfMeasurement.code) {
        return -1;
      }

      if (ingredient1.unitOfMeasurement.code > ingredient2.unitOfMeasurement.code) {
        return 1;
      }
    }

    if (ingredient1.amount > ingredient2.amount) {
      return -1;
    }

    return 0;
  }

  const getAmountString = (amount, unitOfMeasurement) => {
    if (unitOfMeasurementsThatMustBeAWholeNumber.includes(unitOfMeasurement.name.toLowerCase())) {
      return amount;
    }

    const isWholeNumber = amount % 1 === 0;

    if (isWholeNumber) {
      return amount;
    }

    const integer = Math.trunc(amount);
    const decimal = Number(amount - integer);

    const fraction = Fraction(decimal);

    if (Number(decimal).toFixed(2) === "0.33") {
      fraction.numerator = 1;
      fraction.denominator = 3;
    }

    if (integer === 0) {
      return `${fraction.numerator}/${fraction.denominator}`;
    }

    return `${integer} ${fraction.numerator}/${fraction.denominator}`;
  };

  const renderIngredient = (ingredient) => {
    const amount = getAmountString(ingredient.amount, ingredient.unitOfMeasurement);
    const unit = getUnitName(ingredient.unitOfMeasurement, ingredient.amount);

    const ingredientName = amount === 1 ? ingredient.name : ingredient.pluralName;

    return (
      <Box key={ingredient.id} className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between">
        <Typography>{ingredientName}</Typography>
        <Typography> {`${amount} ${unit}`.trim()}</Typography>
      </Box>
    )
  }

  return (
    <>
      {ingredients
        .sort(compare)
        .map((ingredient) => renderIngredient(ingredient))}
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
