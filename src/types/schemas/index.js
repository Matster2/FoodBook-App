import { t } from 'i18next';
import * as yup from 'yup';

export const getRecipeScheme = () => {
  return yup.object({
    name: yup.string().required(t('types.recipe.fields.name.validation.required')),
    description: yup.string(),
    type: yup.string().required(t('types.recipe.fields.type.validation.required')),
    difficulty: yup.string().required(t('types.recipe.fields.difficulty.validation.required')),
    prepTime: yup.number().integer().required(t('types.recipe.fields.prepTime.validation.required')),
    cookTime: yup.number().integer().required(t('types.recipe.fields.cookTime.validation.required')),
    totalTime: yup.number().integer().required(t('types.recipe.fields.totalTime.validation.required')),
    servings: yup.number().integer().required(t('types.recipe.fields.servings.validation.required')),
    containsAlcohol: yup.bool().required(),
    nutrition: yup.object({
      calories: yup.number().integer().nullable(true),
      sugar: yup.number().nullable(true),
      fat: yup.number().nullable(true),
      saturatedFat: yup.number().nullable(true),
      sodium: yup.number().nullable(true),
      protein: yup.number().nullable(true),
      carbohydrates: yup.number().nullable(true),
      fiber: yup.number().nullable(true),
    }),
    steps: yup.array(yup.object({
      name: yup.string(),
      instructions: yup.array(yup.object({
        instruction: yup.string().required(),
      }))
    })),
  });
}