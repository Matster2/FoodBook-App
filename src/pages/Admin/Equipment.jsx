import { Box, Button, Container, CssBaseline, TextField } from '@mui/material';
import Header from 'components/Header';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import usePrevious from 'hooks/usePrevious';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import FormModes from 'utils/formModes';
import { isUndefined } from 'utils/utils';
import * as yup from 'yup';

const pieceOfEquipmentSchema = yup.object({
  name: yup.string().required(),
  pluralName: yup.string().required(),
});

const initialPieceOfEquipmentValue = {
  name: '',
  pluralName: '',
};

export default () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const api = useAPI();
  const formRef = useRef();

  const mode = !id ? FormModes.Create : FormModes.Update;

  const [loadingPieceOfEquipment, setloadingPieceOfEquipment] = useState(false);
  const [pieceOfEquipment, setPieceOfEquipment] = useState(initialPieceOfEquipmentValue);

  const fetchPieceOfEquipment = async () => {
    setloadingPieceOfEquipment(true);
    try {
      const { data } = await api.getPieceOfEquipment(id);
      setPieceOfEquipment(data);
    } catch (e) {
      console.log('error fetching piece of equipment');
    }
    setloadingPieceOfEquipment(false);
  };

  /* Handler */
  const handleSubmit = async (values) => {
    const data = {
      ...pieceOfEquipment,
      ...values,
    };

    mode === FormModes.Create
      ? createPieceOfEquipment(data)
      : updatePieceOfEquipment(data)
  };

  const createPieceOfEquipment = async (data) => {
    try {
      const {
        data: { results },
      } = await api.getEquipment({ search: data.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === data.name.toLowerCase()).length > 0) {
        toast.error('A piece of equipment already exists with this name');
        return;
      }

      await api.createPieceOfEquipment({
        languageCode: "en",
        name: data.name,
        pluralName: data.pluralName,
      });
      toast.success('Piece of equipment successfully created');
      formRef.current?.resetForm({ values: initialPieceOfEquipmentValue });
    } catch (e) {
      toast.error('Unable to create piece of equipment');
    }
  }

  const updatePieceOfEquipment = async (data) => {
    try {
      await api.updatePieceOfEquipment(id, {
        name: data.name,
        pluralName: data.pluralName,
      });
      toast.success('Piece of equipment successfully updated');
    } catch (e) {
      toast.error('Unable to update piece of equipment');
    }
  }

  /* Effects */
  useEffect(() => {
    if (mode !== FormModes.Create) {
      fetchPieceOfEquipment();
    }
  }, []);


  /* Rendering */
  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title={mode === FormModes.Create ? "Add Piece Of Equipment" : "Edit Piece Of Equipment"} onBackClick={() => navigate(-1)} />

      <Formik
        innerRef={formRef}
        initialValues={pieceOfEquipment}
        enableReinitialize
        validationSchema={pieceOfEquipmentSchema}
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
