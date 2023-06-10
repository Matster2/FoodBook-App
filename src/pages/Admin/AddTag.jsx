import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import * as yup from 'yup';
import { Formik, Form, Field } from 'formik';
import { CssBaseline, Container, Box, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import { tagSchema } from '../../shemas';
import TagForm from '../../forms/TagForm';

const initialTagValue = {
  name: '',
  icon: null,
};

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const formRef = useRef();

  const [tag, setTag] = useState(initialTagValue);

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
      formRef.current?.resetForm({ values: initialTagValue });
    } catch (e) {
      toast.error('Unable to create tag');
    }
  };

  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Add Tag" onBackClick={() => navigate(-1)} />

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
            <TagForm
              mode="create"
              errors={errors}
              touched={touched}
            />
          );
        }}
      </Formik>
    </Container>
  );
};
