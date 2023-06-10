import * as yup from 'yup';

export const tagSchema = yup.object({
  name: yup.string().required(),
  icon: yup.string(),
});