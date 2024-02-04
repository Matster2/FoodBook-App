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

export const getIngredientScheme = () => {
  return yup.object({
    name: yup.string().required(t('types.ingredient.fields.name.validation.required')),
    pluralName: yup.string().required(t('types.ingredient.fields.pluralName.validation.required')),
    defaultUnitOfMeasurement: yup.object({
      id: yup.string().required(t('types.ingredient.fields.defaultUnitOfMeasurement.validation.required')),
    })
  });
}

export const getEquipmentScheme = () => {
  return yup.object({
    name: yup.string().required(t('types.equipment.fields.name.validation.required')),
    pluralName: yup.string().required(t('types.equipment.fields.pluralName.validation.required'))
  });
}

export const getTagScheme = () => {
  return yup.object({
    name: yup.string().required(),
    icon: yup.string()
  });
}

export const getAuthorScheme = () => {
  return yup.object({
    name: yup.string().required(),
    biography: yup.string(),
    links: yup.array(yup.object({
      url: yup
      .string()
      .matches(
        /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/,
        'Enter correct url!'
      )
      .required(),
      name: yup.string(),
    })),
  });
}

export const getCollectionScheme = () => {
  return yup.object({
    title: yup.string().required(),
  });
}