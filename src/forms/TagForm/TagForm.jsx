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
import { getTagScheme } from 'types/schemas';
import FormModes from 'utils/formModes';

const initialTagValue = {
  name: '',
  icon: ''
};

export default ({ tag: initialValues, onSubmit, admin }) => {
  const { t, i18n } = useTranslation();
  const api = useAPI();

  const formRef = useRef();

  const [updating, setUpdating] = useState(false);

  const mode = !initialValues?.id ? FormModes.Create : FormModes.Update;
  
  const originalTag = {
    ...initialTagValue,
    ...initialValues,
    languageCode: i18n.resolvedLanguage
  };

  const handleCreateTag = async (newTag) => {
    setUpdating(true);

    try {
      const {
        data: { results },
      } = await api.getTags({ search: newTag.name, sortBy: 'name' });

      if (results.filter((x) => x.name.toLowerCase() === newTag.name.toLowerCase()).length > 0) {
        toast.error(t("requests.tags.create.validation.nameAlreadyExists"));
        return;
      }

      const { data: { id } } = await api.createTag({
        languageCode: "en",
        name: newTag.name,
        icon: newTag.icon
      });

      toast.success(t("requests.tags.create.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newTag,
        id,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.tags.create.error"));
    }

    setUpdating(false);
  }
  
  const handleUpdateTag = async (newTag) => {
    setUpdating(true);

    try {
      await api.updateTag(newTag.id, {
        name: newTag.name,
        icon: newTag.icon,
        active: newTag.active
      });

      toast.success(t("requests.tags.update.success"));
      formRef.current.resetForm();
      onSubmit({
        ...newTag,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.tags.update.error"));
    }

    setUpdating(false);
  }
  
  /* Rendering */
  return (
    <Formik
      innerRef={formRef}
      initialValues={{
        ...originalTag
      }}
      enableReinitialize
      validationSchema={getTagScheme()}
      onSubmit={(values) => {
        if (!values.id) {
          handleCreateTag(values);
        } else {
          handleUpdateTag(values);
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
              id="name"
              name="name"
              label={t("types.tag.fields.name.name")}
              autoFocus
              error={errors.name && touched.name}
              helperText={touched.name && errors.name}
            />
            <Field
              as={TextField}
              fullWidth
              margin="normal"
              id="icon"
              name="icon"
              label={t("types.tag.fields.icon.name")}
              error={errors.icon && touched.icon}
              helperText={touched.icon && errors.icon}
            />
            
            {mode === FormModes.Update && (    
              <FormControlLabel
                control={
                <Checkbox
                  checked={values.active}
                  onChange={(e) => setFieldValue("active", e.target.checked)}  
                />}            
                name="active"
                label={t("types.tag.fields.active.name")}
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