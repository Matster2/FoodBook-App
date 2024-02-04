import { LoadingButton } from "@mui/lab";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import useAPI from 'src/hooks/useAPI';
import usePrevious from 'src/hooks/usePrevious';
import useUnitOfMeasurements from 'src/hooks/useUnitOfMeasurements';
import { getIngredientScheme } from 'src/types/schemas';
import FormModes from 'src/utils/formModes';
import { capitaliseEachWord } from "src/utils/stringUtils";
import { isUndefined } from 'src/utils/utils';

const initialIngredientValue = {
  name: '',
  pluralName: '',
  defaultUnitOfMeasurement: {
    id: undefined
  }
};

export default ({ ingredient: initialValues, onSubmit, admin }) => {
  const { t, i18n } = useTranslation();
  const api = useAPI();

  const formRef = useRef();

  const [updating, setUpdating] = useState(false);

  const { unitOfMeasurements, fetch: fetchUnitOfMeasurements } = useUnitOfMeasurements();

  const mode = !initialValues?.id ? FormModes.Create : FormModes.Update;
  
  const originalIngredient = {
    ...initialIngredientValue,
    ...initialValues,
    languageCode: i18n.resolvedLanguage
  };

  const handleCreateIngredient = async (newIngredient) => {
    setUpdating(true);

    try {
      const {
        data: { results },
      } = await api.getIngredients({ search: newIngredient.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === newIngredient.name.toLowerCase()).length > 0) {
        toast.error(t("requests.ingredients.create.validation.nameAlreadyExists"));
        return;
      }

      const { data: { id } } =await api.createIngredient({
        languageCode: "en",
        name: newIngredient.name,
        pluralName: newIngredient.pluralName,
        defaultUnitOfMeasurementId: newIngredient.defaultUnitOfMeasurement.id,
        personal: newIngredient.personal
      });

      toast.success(t("requests.ingredients.create.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newIngredient,
        id,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.ingredients.create.error"));
    }

    setUpdating(false);
  }
  
  const handleUpdateIngredient = async (newIngredient) => {
    setUpdating(true);

    try {
      await api.updateIngredient(newIngredient.id, {
        name: newIngredient.name,
        pluralName: newIngredient.pluralName,
        defaultUnitOfMeasurementId: newIngredient.defaultUnitOfMeasurement.id
      });

      toast.success(t("requests.ingredients.update.success"))
      onSubmit({
        ...newIngredient,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.ingredients.update.error"));
    }

    setUpdating(false);
  }

  /* Effects */
  useEffect(() => {
    fetchUnitOfMeasurements();
  }, []);
  
  /* Rendering */
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        ...originalIngredient
      }}
      enableReinitialize
      validationSchema={getIngredientScheme()}
      onSubmit={(values) => {
        if (!values.id) {
          handleCreateIngredient(values);
        } else {
          handleUpdateIngredient(values);
        }
      }}
    >
      {(formik) => {
        const { errors, touched, values, setFieldValue } = formik;

        var previousName = usePrevious(values.name);

        useEffect(() => {
          if (!isUndefined(previousName)) {
            if (previousName === values.pluralName) {
              setFieldValue("pluralName", values.name)
            }

          }
        }, [values])

        return (
          <Form>
            <Field
              as={TextField}
              required
              fullWidth
              margin="normal"
              id="name"
              name="name"
              label={t("types.ingredient.fields.name.name")}
              autoFocus
              value={values.name}
              onChange={(e) => setFieldValue("name", capitaliseEachWord(e.target.value))}
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
            />
            <Field
              as={TextField}
              required
              fullWidth
              margin="normal"
              id="pluralName"
              name="pluralName"
              label={t("types.ingredient.fields.pluralName.name")}
              value={values.pluralName}
              onChange={(e) => setFieldValue("pluralName", capitaliseEachWord(e.target.value))}
              error={errors.pluralName && touched.pluralName}
              helperText={touched.pluralName && errors.pluralName}
            />

            <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
              <InputLabel id="defaultUnitOfMeasurementId-label">{t("types.ingredient.fields.defaultUnitOfMeasurement.name")}</InputLabel>
              <Field
                as={Select}
                id="defaultUnitOfMeasurement.id"
                name="defaultUnitOfMeasurement.id"
                value={`${values.defaultUnitOfMeasurement.id}`}
                labelId="defaultUnitOfMeasurementId-label"
                label={t("types.ingredient.fields.defaultUnitOfMeasurement.name")}
              >
                {unitOfMeasurements.map((unitOfMeasurement) => (
                  <MenuItem key={unitOfMeasurement.id} value={unitOfMeasurement.id}>{unitOfMeasurement.name}</MenuItem>
                ))}
              </Field>
            </FormControl>

            <Box
              sx={{
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={updating}
              >
                {mode === FormModes.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
              </LoadingButton>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};