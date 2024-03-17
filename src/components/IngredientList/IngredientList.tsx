import { Box, Checkbox, Stack, Typography } from '@mui/material';
import { useTranslation } from "react-i18next";
import { UnitOfMeasurementRepresentation } from 'src/types';
import Fraction from 'src/utils/fraction';
import styles from './styles.module.css';

interface UnitOfMeasurement {
  id: string;
  name: string;
  pluralName: string;
}

interface Ingredient {
  id: string;
  ingredient: {
    name: string;
    pluralName: string;

  };
  unitOfMeasurement: UnitOfMeasurement;
  optional: boolean;
  amount: number;
}

interface IngredientListProps {
  ingredients: Ingredient[];
  checkable?: boolean;
}

const IngredientList = ({
  ingredients = [],
  checkable = false
}: IngredientListProps) => {
  const { t } = useTranslation();

  const getUnitName = (unitOfMeasurement: UnitOfMeasurement, amount: number) => {
    if (unitOfMeasurement.id === "d738d9d4-ac5a-45fc-92a6-fa2e0e1e5b03") {
      return "";
    }

    return amount > 1 ? `${unitOfMeasurement.pluralName} ` : `${unitOfMeasurement.name} `;
  };

  const getAmountString = (originalAmount: number, unitOfMeasurement: UnitOfMeasurement) => {
    const amount = originalAmount.toFixed(2)

    const isWholeNumber = amount % 1 === 0;

    if (isWholeNumber || unitOfMeasurement.representAs === UnitOfMeasurementRepresentation.Integer) {
      return Math.trunc(amount);
    }

    const integer = Math.trunc(amount);
    const decimal = Number(amount - integer).toFixed(2);


    if (unitOfMeasurement.representAs === UnitOfMeasurementRepresentation.Fraction) {
      const fraction = Fraction(decimal);

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

  const renderIngredient = (ingredient: Ingredient) => {
    const amount = getAmountString(ingredient.amount, ingredient.unitOfMeasurement);
    const unit = getUnitName(ingredient.unitOfMeasurement, ingredient.amount);

    const name = amount === 1 ? ingredient.ingredient.name : ingredient.ingredient.pluralName;

    return (
      <Box key={ingredient.id} className={styles.listLine} display="flex" flexDirection="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" display="flex" alignItems="center">
          {checkable && (
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
        .map((ingredient) => renderIngredient(ingredient))}

      {ingredients.some(x => x.optional) && (
        <Box>
          <Typography className={styles.optional} sx={{ mt: 1.5 }}>{t("types.recipe.fields.ingredients.fields.optional.name")}</Typography>
          {ingredients
            .filter(x => x.optional)
            .map((ingredient) => renderIngredient(ingredient))}
        </Box>
      )}
    </>
  );
};

export default IngredientList;
