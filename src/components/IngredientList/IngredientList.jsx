import { Box, Checkbox, Stack, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import { MeasurementType, UnitOfMeasurementRepresentation } from 'types';
import Fraction from 'utils/fraction';
import styles from './IngredientList.module.css';

const IngredientList = ({ ingredients, enableCheckboxes }) => {
  const { t } = useTranslation();
  
  const getUnitName = (unitOfMeasurement, amount) => {
    if (unitOfMeasurement.type === MeasurementType.Unit) {
      return '';
    }

    return amount > 1 ? `${unitOfMeasurement.pluralName} ` : `${unitOfMeasurement.name} `;
  };

  // function compare(ingredient1, ingredient2) {
  //   if (ingredient1.unitOfMeasurement.name !== ingredient2.unitOfMeasurement.name) {
  //     if (ingredient1.unitOfMeasurement.type === MeasurementType.Unit) {
  //       return -1;
  //     }

  //     if (ingredient2.unitOfMeasurement.type === MeasurementType.Unit) {
  //       return 1;
  //     }

  //     if (ingredient1.unitOfMeasurement.name < ingredient2.unitOfMeasurement.name) {
  //       return -1;
  //     }

  //     if (ingredient1.unitOfMeasurement.name > ingredient2.unitOfMeasurement.name) {
  //       return 1;
  //     }
  //   }

  //   if (ingredient1.amount > ingredient2.amount) {
  //     return -1;
  //   }

  //   return 0;
  // }

  const getAmountString = (originalAmount, unitOfMeasurement) => {
    const amount = originalAmount.toFixed(2)

    const isWholeNumber = amount % 1 === 0;

    if (isWholeNumber || unitOfMeasurement.representAs === UnitOfMeasurementRepresentation.Integer) {
      return Math.trunc(amount);
    }
    
    const integer = Math.trunc(amount);
    const decimal = Number(amount - integer).toFixed(2);


    if (unitOfMeasurement.representAs === UnitOfMeasurementRepresentation.Fraction) {
      const fraction = Fraction(decimal);
      console.log(fraction)

      if (Number(decimal).toFixed(2) === "0.33") {
        fraction.numerator = 1;
        fraction.denominator = 3;
      }
  
      if (integer === 0) {
        return `${fraction.numerator}/${fraction.denominator}`;
      }
  
      return `${integer} ${fraction.numerator}/${fraction.denominator}`;
    }

    return amount.toFixed(2);
  };

  const renderIngredient = (ingredient) => {
    const amount = getAmountString(ingredient.amount, ingredient.unitOfMeasurement);
    const unit = getUnitName(ingredient.unitOfMeasurement, ingredient.amount);

    const name = amount === 1 ? ingredient.name : ingredient.pluralName;

    return (
      <Box key={ingredient.id} className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" display="flex" alignItems="center">
          {enableCheckboxes && (
            <Checkbox
              className={styles.checkbox}
              sx={{ mr: 1 }}
            />
          )}
          <Typography>{name}</Typography>
        </Stack>
        <Typography> {`${amount} ${unit}`.trim()}</Typography>
      </Box>
    )
  }

  return (
    <>
      {ingredients
        .filter(x => !x.optional)
        // .sort(compare)
        .map((ingredient) => renderIngredient(ingredient))}

      {ingredients.some(x => x.optional) && (
        <Box>
          <Typography className={styles.optional} sx={{ mt: 1.5 }}>{t("types.recipe.fields.ingredients.fields.optional.name")}</Typography>
          {ingredients
            .filter(x => x.optional)
            // .sort(compare)
            .map((ingredient) => renderIngredient(ingredient))}
        </Box>
      )}
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
  enableCheckboxes: false,
};

export default IngredientList;
