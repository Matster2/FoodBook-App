import React, { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Formik, Form, Field } from 'formik';
import { CssBaseline, Container, Box, CircularProgress, Button } from '@mui/material';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import Header from '../../components/Header';
import { tagSchema } from '../../shemas';
import TagForm from '../../forms/TagForm';

export default () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const api = useAPI();

  const formRef = useRef();

  const [tag, setTag] = useState();
  const [loadingTag, setLoadingTag] = useState();

  const fetchTag = async () => {
    setLoadingTag(true);
    try {
      setLoadingTag(true);
      const { data } = await api.getTag(id);
      setTag(data);
    } catch {
      console.log('error fetching tag');
    }
    setLoadingTag(false);
  };

  /* Effects */
  useEffect(() => {
    fetchTag();
  }, []);

  const handleSubmit = async (values) => {
    const data = {
      ...tag,
      ...values,
    };

    try {
      await api.updateTag(id, {
        name: data.name,
        icon: data.icon
      });
      toast.success('Tag successfully updated');
    } catch (e) {
      toast.error('Unable to update tag');
    }
  };

  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Edit Tag" onBackClick={() => navigate(-1)} />

      {loadingTag && (
        <Box sx={{ mt: 2, mb: 3 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {tag && (
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
                mode="edit"
                errors={errors}
                touched={touched}
              />
            );
          }}
        </Formik>
      )}
    </Container>
  );
};
