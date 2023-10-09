import { LoadingButton } from "@mui/lab";
import {
  Avatar,
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import AuthorLink from "Admin/components/AuthorLink";
import { useFormik } from 'formik';
import useAPI from 'hooks/useAPI';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from "react-i18next";
import uuid from 'react-uuid';
import { getAuthorScheme } from "types/schemas";
import FormModes from 'utils/formModes';
import { isUndefined } from "utils/utils";

const getDefaultAuthor = () => {
  return {
    name: '',
    biography: '',
    links: [],
  }
}

export default ({ author: initialValues, onSubmit, admin }) => {
  const { t, i18n } = useTranslation();
  const api = useAPI();

  const [profilePictureFile, setProfilePictureFile] = useState();

  const [updating, setUpdating] = useState(false);

  const mode = !initialValues?.id ? FormModes.Create : FormModes.Update;
  
  const [originalAuthor] = useState({
    ...getDefaultAuthor(),
    ...initialValues,
    languageCode: i18n.resolvedLanguage
  });
  

  const formik = useFormik({
    initialValues: {
      ...originalAuthor
    },
    enableReinitialize: true,
    validationSchema: getAuthorScheme(),
    onSubmit: async (values) => {
      if (!author.id) {
        await handleCreateAuthor(values);
      } else {
        await handleUpdateAuthor(values);
      }
    }
  });

  const { handleSubmit, values: author, setValues: setAuthor, handleChange, errors, touched, resetForm } = formik;
  
  const handleCreateAuthor = async (newAuthor) => {
    setUpdating(true);

    try {
      const {
        data: { id },
      } = await api.createAuthor({
        ...newAuthor,
        languageCode: "en",
      });

      if (!isUndefined(profilePictureFile)) {
        await api.uploadAuthorProfilePicture(id, profilePictureFile);
      }

      toast.success(t("requests.authors.create.success"));
      resetForm();
      onSubmit({
        ...newAuthor,
        id,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.authors.create.error"));
    }

    setUpdating(false);
  }
  
  const handleUpdateAuthor = async (newAuthor) => {
    setUpdating(true);

    try {
      await api.updateAuthor(newAuthor.id, {
        ...newAuthor
      });

      if (!isUndefined(profilePictureFile)) {
        await api.uploadAuthorProfilePicture(newAuthor.id, profilePictureFile);
      }
      
      toast.success(t("requests.authors.update.success"));
      onSubmit({
        ...newAuthor,
      });
    } catch (e) {
      console.log(e)
      toast.error(t("requests.authors.update.error"));
    }

    setUpdating(false);
  }

  const handleAuthorLinkChange = (newAuthorLink) => {
    const newAuthorLinks = [...author.links];

    const index = newAuthorLinks.findIndex((x) => x.id === newAuthorLink.id);

    newAuthorLinks[index] = newAuthorLink;

    setAuthor((state) => ({
      ...state,
      links: newAuthorLinks,
    }));
  };

  const handleDeleteAuthorLink = (newAuthorLink) => {
    const newAuthorLinks = author.links.filter(
      (x) => x.id !== newAuthorLink.id
    );

    setAuthor((state) => ({
      ...state,
      links: newAuthorLinks,
    }));
  };

  const handleUploadProfilePicture = (e) => {
    const file = e.target.files[0];
    const url = URL.createObjectURL(file);

    setAuthor((state) => ({
      ...state,
      profilePictureUrl: url,
    }));
    setProfilePictureFile(file);
  };
  
  const handleAddLink = () => {
    const authorLink = {
      id: uuid(),
      url: '',
      name: '',
      description: '',
    };

    const newLinks = author.links.slice();
    newLinks.push(authorLink);

    setAuthor((state) => ({
      ...state,
      links: newLinks,
    }));
  };

  /* Rendering */
  return (    
    <form onSubmit={handleSubmit}> 
      <Stack sx={{ mb: 2 }} direction="column" display="flex" alignItems="center" justifyContent="center">
        <Avatar sx={{ mb: 2, height: 80, width: 80 }} src={author.profilePictureUrl} />
        <input type="file" onChange={handleUploadProfilePicture} />
      </Stack>

      <TextField
        required
        fullWidth
        margin="normal"
        id="name"
        name="name"
        label={t("types.author.fields.name.name")}
        autoFocus
        value={author.name}
        onChange={handleChange}
        error={errors.name && touched.name}
        helperText={touched.name && errors.name}
      />

      <TextField
        fullWidth
        margin="normal"
        id="biography"
        name="biography"
        multiline
        rows={2}
        label={t("types.author.fields.biography.name")}
        value={author.biography}
        onChange={handleChange}
        error={errors.biography && touched.biography}
        helperText={touched.biography && errors.biography}
      />

      <Box sx={{ mt: 2, mb: 3 }}>
        <Typography variant="h6">{t("types.author.fields.links.name")}</Typography>

        <Box sx={{ mt: 2 }}>
          {author.links.map((authorLink, index) => (
            <AuthorLink
              key={authorLink.id}
              authorLink={authorLink}
              onChange={handleAuthorLinkChange}
              onDelete={handleDeleteAuthorLink}
            />
          ))}
        </Box>

        <Box sx={{ mt: 2 }}>
          <Button type="button" onClick={handleAddLink} variant="contained">
            {`${t("common.words.actions.add")} ${t("types.author.fields.links.singularName")}`}
          </Button>
        </Box>
      </Box>
      
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
    </form>
  );
};