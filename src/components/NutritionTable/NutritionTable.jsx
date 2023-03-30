import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@mui/material';
import styles from './NutritionTable.module.css';
import { isUndefined } from '../../utils/utils';

const NutritionTable = ({ nutrition: { kcals, carbs, saturates, sugars, protien, soduim, fiber } }) => {
  const getNutritionRows = () => {
    return [
      { name: 'Calories', amount: kcals },
      { name: 'Carbs', amount: carbs },
      { name: 'Saturated Fat', saturates },
      { name: 'Sugars', amount: sugars },
      { name: 'Protien', amount: protien },
      { name: 'Sodium', amount: soduim },
      { name: 'Fiber', amount: fiber },
    ];
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {getNutritionRows().map((row) => (
            <TableRow
              className={classnames(styles.row, isUndefined(row.amount) && styles.disabled)}
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
    kcals: PropTypes.number,
    carbs: PropTypes.number,
    saturates: PropTypes.number,
    sugars: PropTypes.number,
    protien: PropTypes.number,
    soduim: PropTypes.number,
    fiber: PropTypes.number,
  }).isRequired,
};

export default NutritionTable;
