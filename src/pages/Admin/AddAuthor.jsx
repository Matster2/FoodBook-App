import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  TextField,
  Typography
} from '@mui/material';
import Header from 'components/Header';
import { Field, Form, Formik } from 'formik';
import useAPI from 'hooks/useAPI';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import uuid from 'react-uuid';
import { isUndefined } from 'utils/utils';
import * as yup from 'yup';

const AuthorLink = ({ authorLink, onChange, onDelete }) => {
  const handleChange = (e) => {
    onChange({
      ...authorLink,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ border: 1, borderColor: 'grey.500', p: 2 }}>
      <Box display="flex" justifyContent="right">
        <IconButton onClick={() => onDelete(authorLink)}>
          <ClearIcon />
        </IconButton>
      </Box>

      <TextField
        fullWidth
        margin="normal"
        required
        id="url"
        label="URL"
        name="url"
        autoFocus
        value={authorLink.url}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        required
        id="name"
        label="Name"
        name="name"
        autoFocus
        value={authorLink.name}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        id="description"
        label="Description"
        name="description"
        multiline
        autoFocus
        value={authorLink.description}
        onChange={handleChange}
      />
    </Box>
  );
};

AuthorLink.propTypes = {
  authorLink: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
    description: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

AuthorLink.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

const initialAuthorValue = {
  name: '',
  biography: '',
  links: [],
};

export default () => {
  const formRef = useRef();

  const navigate = useNavigate();
  const api = useAPI();

  const [author, setAuthor] = useState(initialAuthorValue);
  const [profilePictureFile, setProfilePictureFile] = useState();

  const authorSchema = yup.object({
    name: yup.string().required(),
    biography: yup.string(),
  });

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

  const handleSubmit = async (values) => {
    const data = {
      ...author,
      ...values,
      links: author.links
    };

    try {
      const {
        data: { id },
      } = await api.createAuthor(data);

      if (!isUndefined(profilePictureFile)) {
        await api.uploadAuthorProfilePicture(id, profilePictureFile);
      }

      toast.success('Author successfully created');
      formRef.current?.resetForm();
    } catch (e) {
      toast.error('Unable to create author');
    }
  };

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

  return (
    <Container sx={{ pb: 7 }}>
      <Header title="Add Author" onBackClick={() => navigate(-1)} />

      <Stack direction="column" display="flex" alignItems="center" justifyContent="center">
        <Avatar sx={{ mb: 1, height: 100, width: 100 }} src={author.profilePictureUrl} />
        <input type="file" onChange={handleUploadProfilePicture} />
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Formik
          innerRef={formRef}
          initialValues={author}
          validationSchema={authorSchema}
          onSubmit={async (values, { resetForm }) => {
            handleSubmit(values);
          }}
        >
          {(formik) => {
            const { errors, touched, values } = formik;
            return (
              <Form>
                <Box fullWidth>
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
                    fullWidth
                    margin="normal"
                    id="biography"
                    name="biography"
                    multiline
                    rows={2}
                    label="biography"
                    error={errors.biography && touched.biography}
                    helperText={touched.biography && errors.biography}
                  />

                  <Box sx={{ mt: 2, mb: 3 }}>
                    <Typography variant="h6">Links</Typography>

                    <Box sx={{ mt: 2 }}>
                      {author.links.map((authorLink) => (
                        <AuthorLink
                          authorLink={authorLink}
                          onChange={handleAuthorLinkChange}
                          onDelete={handleDeleteAuthorLink}
                        />
                      ))}
                    </Box>


                    <Box sx={{ mt: 1 }}>
                      <Button type="button" onClick={handleAddLink} variant="contained">
                        Add Link
                      </Button>
                    </Box>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                      Create
                    </Button>
                  </Box>
                </Box>
              </Form>
            );
          }}
        </Formik>
      </Box>
    </Container>
  );
};
