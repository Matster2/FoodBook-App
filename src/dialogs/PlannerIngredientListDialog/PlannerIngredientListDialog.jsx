import React, { useState, useEffect } from 'react';
import { Dialog, Box, Typography } from '@mui/material';
import useAPI from '../../hooks/useAPI';
import styles from './PlannerIngredientListDialog.module.css';
import Fraction from '../../utils/fraction';

const PlannerIngredientListDialog = ({ open, onClose, userId, filters, transitionComponent }) => {
  const api = useAPI();

  const [loadingPlannerIngredientList, setLoadingPlannerIngredientList] = useState(false);
  const [plannerIngredientList, setPlannerIngredientList] = useState();

  const fetchPlannerIngredientList = async () => {
    setLoadingPlannerIngredientList(true);
    try {
      const { data } = await api.getPlannerIngredientList(userId, filters);
      setPlannerIngredientList(data);
    } catch {
      console.log('error fetching planner ingredient list');
    }
    setLoadingPlannerIngredientList(false);
  };

  useEffect(() => {
    if (open) {
      fetchPlannerIngredientList();
    }
  }, [open]);


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
    const decimal = amount - Math.floor(amount);

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

  const renderIngredientText = (ingredient) => {
    const amount = getAmountString(ingredient.amount);
    const unit = getUnitName(ingredient.unitOfMeasurement, ingredient.amount);

    const ingredientName = amount === 1 ? ingredient.name : ingredient.pluralName;

    return (
      <span>
        {`${amount} ${unit}`.trim()} <span className={styles.ingredientName}>{ingredientName}</span>
      </span>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      TransitionComponent={transitionComponent}
      PaperProps={{
        style: {
          backgroundColor: '#F6F6F6',
        },
      }}
    >
      <Box sx={{ p: 4 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>
          Ingredients
        </Typography>

        {plannerIngredientList !== undefined && (
          <ul className={styles.ingredientList}>
            {plannerIngredientList.ingredients.map((ingredient) => (
              <li>
                <span>{renderIngredientText(ingredient)}</span>
              </li>
            ))}
          </ul>
        )}
      </Box>
    </Dialog>
  );
};

export default PlannerIngredientListDialog;
