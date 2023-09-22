import { LoadingButton } from "@mui/lab";
import {
  Box,
  Checkbox,
  FormControlLabel,
  TextField
} from '@mui/material';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import { getCollectionScheme } from "types/schemas";
import FormModes from 'utils/formModes';

const initialCollectionValue = {
  title: ''
};

export default ({ collection: initialValues, onSubmit, admin }) => {
  const { t, i18n } = useTranslation();
  const api = useAPI();

  const formRef = useRef();

  const [updating, setUpdating] = useState(false);

  const mode = !initialValues?.id ? FormModes.Create : FormModes.Update;
  
  const originalCollection = {
    ...initialCollectionValue,
    ...initialValues,
    languageCode: i18n.resolvedLanguage
  };

  const handleCreateCollection = async (newCollection) => {
    setUpdating(true);

    try {
      const {
        data: { results },
      } = await api.getCollections({ search: newCollection.title, sortBy: 'title' });

      if (results.filter((x) => x.title.toLowerCase() === newCollection.title.toLowerCase()).length > 0) {
        toast.error(t("requests.collections.create.validation.titleAlreadyExists"));
        return;
      }

      const { data: { id } } = await api.createCollection({
        languageCode: "en",
        title: newCollection.title
      });

      toast.success(t("requests.collections.create.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newCollection,
        id,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.collections.create.error"));
    }

    setUpdating(false);
  }
  
  const handleUpdateCollection = async (newCollection) => {
    setUpdating(true);

    try {
      await api.updateCollection(newCollection.id, {
        ...newCollection,
      });

      toast.success(t("requests.collections.update.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newCollection,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.collections.update.error"));
    }

    setUpdating(false);
  }
  
  /* Rendering */
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        ...originalCollection
      }}
      enableReinitialize
      validationSchema={getCollectionScheme()}
      onSubmit={(values) => {
        if (!values.id) {
          handleCreateCollection(values);
        } else {
          handleUpdateCollection(values);
        }
      }}
    >
      {(formik) => {
        const { errors, touched, values, setFieldValue, handleChange } = formik;

        return (
          <Form>
            <Field
              as={TextField}
              required
              fullWidth
              margin="normal"
              id="title"
              name="title"
              label={t("types.collection.fields.title.name")}
              autoFocus
              error={errors.title && touched.title}
              helperText={touched.title && errors.title}
            />

            {mode === FormModes.Update && (    
              <FormControlLabel
                control={
                <Checkbox
                  checked={values.hidden}
                  onChange={(e) => setFieldValue("hidden", e.target.checked)}  
                />}            
                name="hidden"
                label={t("types.collection.fields.hidden.name")}
              />
            )}

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