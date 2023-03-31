import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CssBaseline, Container, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';

const initialTagValue = {
  name: '',
  icon: null,
};

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const formRef = useRef();

  const [tag, setTag] = useState(initialTagValue);

  const tagSchema = yup.object({
    name: yup.string().required(),
    icon: yup.string(),
  });

  const handleSubmit = async (values) => {
    const data = {
      ...tag,
      ...values,
    };

    try {
      const {
        data: { results },
      } = await api.getTags({ search: values.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
        toast.error('A tag already exists with this name');
        return;
      }

      await api.createTag(data);
      toast.success('Tag successfully created');
      formRef.current?.resetForm();
    } catch (e) {
      toast.error('Unable to create tag');
    }
  };

  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Add Ingredient" onBackClick={() => navigate(-1)} />

      {/* <Box>
        <FormControlLabel label="Add Multiple" control={<Checkbox defaultChecked />} />
      </Box> */}

      <Formik
        innerRef={formRef}
        initialValues={tag}
        validationSchema={tagSchema}
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
                id="icon"
                name="icon"
                label="Icon"
                autoFocus
                error={errors.icon && touched.icon}
                helperText={touched.icon && errors.icon}
              />

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
