import React, { useContext, useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CssBaseline, Container, Box, TextField, Button, FormControl, Select, InputLabel, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import { UnitOfMeasurementContext } from '../../contexts/UnitOfMeasurementContext';

const initialIngredientValue = {
  name: '',
  pluralName: '',
  defaultUnitOfMeasurementId: undefined
};

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { unitOfMeasurements, setUnitOfMeasurements } = useContext(UnitOfMeasurementContext);

  const formRef = useRef();

  const [ingredient, setIngredient] = useState(initialIngredientValue);

  const ingredientSchema = yup.object({
    name: yup.string().required(),
    pluralName: yup.string().required(),
  });

  const handleSubmit = async (values) => {
    const data = {
      ...ingredient,
      ...values,
    };

    try {
      const {
        data: { results },
      } = await api.getIngredients({ search: values.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
        toast.error('An ingredient already exists with this name');
        return;
      }

      await api.createIngredient(data);
      toast.success('Ingredient successfully created');
      formRef.current?.resetForm();
    } catch (e) {
      toast.error('Unable to create ingredient');
    }
  };

  const fetchUnitOfMeasurements = async () => {
    try {
      const { data } = await api.getUnitOfMeasurements({ sortBy: 'name' });
      setUnitOfMeasurements(data.results);
    } catch {
      console.log('error fetching unit of measurements');
    }
  };

  useEffect(() => {
    fetchUnitOfMeasurements();
  }, []);

  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Add Ingredient" onBackClick={() => navigate(-1)} />

      {/* <Box>
        <FormControlLabel label="Add Multiple" control={<Checkbox defaultChecked />} />
      </Box> */}

      <Formik
        innerRef={formRef}
        initialValues={ingredient}
        validationSchema={ingredientSchema}
        onSubmit={async (values, { resetForm }) => {
          handleSubmit(values);
        }}
      >
        {(formik) => {
          const { errors, touched, values } = formik;
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
                <Field as={Select} margin="normal" id="id" name="defaultUnitOfMeasurementId" labelId="defaultUnitOfMeasurementId-label" label="Default Unit Of Measurement">
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
                  Create
                </Button>
              </Box>
            </Form>
          );
        }}
      </Formik>
    </Container>
  );
};
