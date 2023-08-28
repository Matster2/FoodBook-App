import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import usePrevious from 'hooks/usePrevious';
import useUnitOfMeasurements from 'hooks/useUnitOfMeasurements';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { getIngredientScheme } from 'types/schemas';
import FormModes from 'utils/formModes';
import { isUndefined } from 'utils/utils';

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
      await api.updateIngredient(id, {
        name: newIngredient.name,
        pluralName: newIngredient.pluralName,
        defaultUnitOfMeasurementId: newIngredient.defaultUnitOfMeasurement.id
      });

      toast.success(t("requests.ingredients.update.success"));
      formRef.current.resetForm();
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
              label="Name"
              autoFocus
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
              label="Plural Name"
              autoFocus
              error={errors.pluralName && touched.pluralName}
              helperText={touched.pluralName && errors.pluralName}
            />

            <FormControl fullWidth sx={{ mt: 2, mb: 1 }}>
              <InputLabel id="defaultUnitOfMeasurementId-label">Default Unit Of Measurement</InputLabel>
              <Field
                as={Select}
                margin="normal"
                id="defaultUnitOfMeasurement.id"
                name="defaultUnitOfMeasurement.id"
                value={`${values.defaultUnitOfMeasurement.id}`}
                labelId="defaultUnitOfMeasurementId-label"
                label="Default Unit Of Measurement"
                error={errors.defaultUnitOfMeasurement?.id && touched.defaultUnitOfMeasurement?.id}
                helperText={touched.defaultUnitOfMeasurement?.id && errors.defaultUnitOfMeasurement?.id}
              >
                {unitOfMeasurements.map((unitOfMeasurement) => (
                  <MenuItem value={unitOfMeasurement.id}>{unitOfMeasurement.name}</MenuItem>
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                disabled={updating}
              >
                {mode === FormModes.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};