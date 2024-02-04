import { Box, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { isNull } from 'src/utils/utils';
import styles from './NutritionList.module.css';

const NutritionList = ({ nutrition: { calories, sugar, fat, saturatedFat, sodium, protein, carbohydrates, fiber } }) => {
  const { t } = useTranslation();

  const getNutritionRows = () => {
    return [
      { name: t('types.recipe.fields.nutrition.calories.name'), amount: calories, unit: 'kcal' },
      { name: t('types.recipe.fields.nutrition.sugar.name'), amount: sugar, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.fat.name'), amount: fat, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.saturatedFat.name'), amount: saturatedFat, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.sodium.name'), amount: sodium, unit: 'mg' },
      { name: t('types.recipe.fields.nutrition.protein.name'), amount: protein, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.carbohydrates.name'), amount: carbohydrates, unit: 'g' },
      { name: t('types.recipe.fields.nutrition.fiber.name'), amount: fiber, unit: 'g' },
    ];
  };

  const renderNutritionRow = (row) => {
    return (
      <Box key={row.name} className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between">
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
