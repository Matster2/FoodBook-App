import {
  Box,
  Button,
  TextField
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import usePrevious from 'hooks/usePrevious';
import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { getEquipmentScheme } from 'types/schemas';
import FormModes from 'utils/formModes';
import { isUndefined } from 'utils/utils';

const initialPieceOfEquipmentValue = {
  name: '',
  pluralName: ''
};

export default ({ pieceOfEquipment: initialValues, onSubmit, admin }) => {
  const { t, i18n } = useTranslation();
  const api = useAPI();

  const formRef = useRef();

  const mode = !initialValues?.id ? FormModes.Create : FormModes.Update;
  
  const originalPieceOfEquipment = {
    ...initialPieceOfEquipmentValue,
    ...initialValues,
    languageCode: i18n.resolvedLanguage
  };

  const handleCreatePieceOfEquipment = async (newPieceOfEquipment) => {
    try {
      const {
        data: { results },
      } = await api.getEquipment({ search: newPieceOfEquipment.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === newPieceOfEquipment.name.toLowerCase()).length > 0) {
        toast.error(t("requests.equipment.create.validation.nameAlreadyExists"));
        return;
      }

      const { data: { id } } = await api.createPieceOfEquipment({
        languageCode: "en",
        name: newPieceOfEquipment.name,
        pluralName: newPieceOfEquipment.pluralName,
        personal: newPieceOfEquipment.personal
      });

      toast.success(t("requests.equipment.create.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newPieceOfEquipment,
        id,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.equipment.create.error"));
    }
  }
  
  const handleUpdatePieceOfEquipment = async (newPieceOfEquipment) => {
    try {
      await api.updatePieceOfEquipment(id, {
        name: newPieceOfEquipment.name,
        pluralName: newPieceOfEquipment.pluralName,
      });

      toast.success(t("requests.equipment.update.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newPieceOfEquipment,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.equipment.update.error"));
    }
  }
  
  /* Rendering */
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        ...originalPieceOfEquipment
      }}
      enableReinitialize
      validationSchema={getEquipmentScheme()}
      onSubmit={(values) => {
        if (!values.id) {
          handleCreatePieceOfEquipment(values);
        } else {
          handleUpdatePieceOfEquipment(values);
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

            <Box
              sx={{
                marginBottom: 4,
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                {mode === FormModes.Create ? t("common.words.actions.create") : t("common.words.actions.update")}
              </Button>
            </Box>
          </Form>
        );
      }}
    </Formik>
  );
};