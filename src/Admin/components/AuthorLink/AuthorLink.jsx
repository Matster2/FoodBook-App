import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";

const AuthorLink = ({ authorLink, onChange, onDelete }) => {
  const { t, i18n } = useTranslation();

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
        label={t("types.author.fields.links.fields.url.name")}
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
        label={t("types.author.fields.links.fields.name.name")}
        name="name"
        autoFocus
        value={authorLink.name}
        onChange={handleChange}
      />

      <TextField
        fullWidth
        margin="normal"
        id="description"
        label={t("types.author.fields.links.fields.description.name")}
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

export default AuthorLink