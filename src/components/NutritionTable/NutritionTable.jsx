import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import styles from './NutritionTable.module.css';
import { isNull, isUndefined } from '../../utils/utils';

const NutritionTable = ({
  nutrition: { calories, sugar, fat, saturatedFat, sodium, protein, carbohydrates, fiber },
}) => {
  const getNutritionRows = () => {
    return [
      { name: 'Calories', amount: calories },
      { name: 'Sugar', amount: sugar },
      { name: 'Fat', amount: fat },
      { name: 'Saturated Fat', amount: saturatedFat },
      { name: 'Sodium', amount: sodium },
      { name: 'Protein', amount: protein },
      { name: 'Carbohydrates', amount: carbohydrates },
      { name: 'Fiber', amount: fiber },
    ];
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {getNutritionRows()
            // .filter((row) => !isUndefined(row.amount) && !isNull(row.amount))
            .map((row) => (
              <TableRow
                className={classnames(styles.row, (isUndefined(row.amount) || isNull(row.amount)) && styles.disabled)}
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell className={styles.name}>{row.name}</TableCell>
                <TableCell>{row.amount}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

NutritionTable.propTypes = {
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

export default NutritionTable;
