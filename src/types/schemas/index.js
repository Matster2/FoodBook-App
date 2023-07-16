import * as yup from 'yup';

export const recipeSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  type: yup.string().required(),
  difficulty: yup.string().required(),
  prepTime: yup.number().integer().required(),
  cookTime: yup.number().integer().required(),
  totalTime: yup.number().integer().required(),
  servings: yup.number().integer().required(),
  containsAlcohol: yup.bool().required(),
  nutrition: yup.object({
    calories: yup.number().integer(),
    sugar: yup.number(),
    fat: yup.number(),
    saturatedFat: yup.number(),
    sodium: yup.number(),
    protein: yup.number(),
    carbohydrates: yup.number(),
    fiber: yup.number(),
  }),
  steps: yup.array(yup.object({
    name: yup.string(),
    instructions: yup.array(yup.object({
      instruction: yup.string().required(),
    }))
  })),
});