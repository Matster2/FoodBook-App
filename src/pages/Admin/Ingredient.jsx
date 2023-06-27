import React, { useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Formik, Form, Field, setIn } from 'formik';
import { CssBaseline, Container, Box, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import usePrevious from '../../hooks/usePrevious';
import Header from '../../components/Header';
import { UnitOfMeasurementContext } from '../../contexts/UnitOfMeasurementContext';
import FormModes from '../../utils/formModes';
import { isUndefined } from '../../utils/utils';

const ingredientSchema = yup.object({
  name: yup.string().required(),
  pluralName: yup.string().required(),
  defaultUnitOfMeasurement: yup.object({
    id: yup.string().required()
  })
});

const initialIngredientValue = {
  name: '',
  pluralName: '',
  defaultUnitOfMeasurement: {
    id: undefined
  }
};

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAPI();
  const formRef = useRef();

  const mode = !id ? FormModes.Create : FormModes.Update;

  const [loadingIngredient, setLoadingIngredient] = useState(false);
  const [ingredient, setIngredient] = useState(initialIngredientValue);

  const { unitOfMeasurements, setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);

  const fetchUnitOfMeasurements = async () => {
    try {
      const { data } = await api.getUnitOfMeasurements({ sortBy: 'name' });
      setUnitOfMeasurements(data.results);
    } catch {
      console.log('error fetching unit of measurements');
    }
  };

  const fetchIngredient = async () => {
    setLoadingIngredient(true);
    try {
      const { data } = await api.getIngredient(id);
      setIngredient(data);
    } catch (e) {
      console.log('error fetching ingredient');
    }
    setLoadingIngredient(false);
  };

  /* Handler */
  const handleSubmit = async (values) => {
    const data = {
      ...ingredient,
      ...values,
    };

    mode === FormModes.Create
      ? createIngredient(data)
      : updateIngredient(data)
  };

  const createIngredient = async (data) => {
    try {
      const {
        data: { results },
      } = await api.getIngredients({ search: data.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
        toast.error('An ingredient already exists with this name');
        return;
      }

      await api.createIngredient({
        languageCode: "en",
        name: data.name,
        pluralName: data.pluralName,
        defaultUnitOfMeasurementId: data.defaultUnitOfMeasurement.id
      });
      toast.success('Ingredient successfully created');
      formRef.current?.resetForm({ values: initialIngredientValue });
    } catch (e) {
      toast.error('Unable to create ingredient');
    }
  }

  const updateIngredient = async (data) => {
    try {
      await api.updateIngredient(id, {
        name: data.name,
        pluralName: data.pluralName,
        defaultUnitOfMeasurementId: data.defaultUnitOfMeasurement.id
      });
      toast.success('Ingredient successfully updated');
    } catch (e) {
      toast.error('Unable to update ingredient');
    }
  }

  /* Effects */
  useEffect(() => {
    fetchUnitOfMeasurements();

    if (mode !== FormModes.Create) {
      fetchIngredient();
    }
  }, []);


  /* Rendering */
  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title={mode === FormModes.Create ? "Add Ingredient" : "Edit Ingredient"} onBackClick={() => navigate(-1)} />

      <Formik
        innerRef={formRef}
        initialValues={ingredient}
        enableReinitialize
        validationSchema={ingredientSchema}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
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
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {mode === FormModes.Create ? "Create" : "Update"}
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
