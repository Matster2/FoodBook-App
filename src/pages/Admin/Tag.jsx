import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CssBaseline, Container, Box, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import FormModes from '../../utils/formModes';

const tagSchema = yup.object({
  name: yup.string().required(),
  icon: yup.string(),
});

const initialTagValue = {
  name: '',
  icon: null,
};

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const api = useAPI();
  const formRef = useRef();

  const mode = !id ? FormModes.Create : FormModes.Update;

  const [loadingTag, setLoadingTag] = useState(false);
  const [tag, setTag] = useState(initialTagValue);

  const fetchTag = async () => {
    setLoadingTag(true);
    try {
      const { data } = await api.getTag(id);
      setTag(data);
    } catch {
      console.log('error fetching tag');
    }
    setLoadingTag(false);
  };

  /* Handler */
  const handleSubmit = async (values) => {
    const data = {
      ...tag,
      ...values,
    };

    mode === FormModes.Create
      ? createTag(data)
      : updateTag(data)
  };

  const createTag = async (data) => {
    try {
      const {
        data: { results },
      } = await api.getTags({ search: data.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
        toast.error('A tag already exists with this name');
        return;
      }

      await api.createTag({
        ...data,
        languageCode: "en"
      });
      toast.success('Tag successfully created');
      formRef.current?.resetForm({ values: initialTagValue });
    } catch (e) {
      toast.error('Unable to create tag');
    }
  }

  const updateTag = async (data) => {
    try {
      await api.updateTag(id, {
        name: data.name,
        icon: data.icon
      });
      toast.success('Tag successfully updated');
    } catch (e) {
      toast.error('Unable to update tag');
    }
  }

  /* Effects */
  useEffect(() => {
    if (mode !== FormModes.Create) {
      fetchTag();
    }
  }, []);

  /* Rendering */
  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title={mode === FormModes.Create ? "Add Tag" : "Edit Tag"} onBackClick={() => navigate(-1)} />

      <Formik
        innerRef={formRef}
        initialValues={tag}
        enableReinitialize
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
