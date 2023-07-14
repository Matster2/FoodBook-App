import { Box, Checkbox, Stack, Typography } from '@mui/material';
import React from 'react';
import styles from './EquipmentList.module.css';

const EquipmentList = ({ equipment, enableCheckboxes }) => {
  function compare(pieceOfEquipment1, pieceOfEquipment2) {
    if (pieceOfEquipment1.name < pieceOfEquipment2.name) {
      return -1;
    }

    if (pieceOfEquipment1.name > pieceOfEquipment2.name) {
      return 1;
    }

    return 0;
  }

  const renderPieceOfEquipment = (pieceOfEquipment) => {
    const name = pieceOfEquipment.amount === 1 ? pieceOfEquipment.name : pieceOfEquipment.pluralName;

    return (
      <Box key={pieceOfEquipment.id} className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" display="flex" alignItems="center">
          {enableCheckboxes && (
            <Checkbox
              className={styles.checkbox}
              sx={{ mr: 1 }}
            />
          )}
          <Typography>{name}</Typography>
        </Stack>
        <Typography>{pieceOfEquipment.amount}</Typography>
      </Box>
    )
  }

  return (
    <>
      {equipment
        .sort(compare)
        .map((pieceOfEquipment) => renderPieceOfEquipment(pieceOfEquipment))}
    </>
  );
};

EquipmentList.propTypes = {
  // ingredient: PropTypes.shape({
  //   id: PropTypes.string,
  //   name: PropTypes.string,
  //   pluralName: PropTypes.string,
  //   amount: PropTypes.number,
  //   optional: PropTypes.bool,
  //   unitOfMeasurement: PropTypes.shape({
  //     id: PropTypes.string,
  //     name: PropTypes.string,
  //     pluralName: PropTypes.string,
  //   })
  // })
};

EquipmentList.defaultProps = {
  enableCheckboxes: false,
};

export default EquipmentList;
