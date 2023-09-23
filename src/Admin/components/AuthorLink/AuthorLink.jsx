import { Clear as ClearIcon } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTranslation } from "react-i18next";
import styles from './AuthorLink.module.css';

const AuthorLink = ({ authorLink, onChange, onDelete }) => {
  const { t, i18n } = useTranslation();

  const handleChange = (e) => {
    onChange({
      ...authorLink,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Box sx={{ pb: 2 }} className={styles.link}>
      <Stack direction="row" alignItems="center" gap={1}>
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

        <IconButton onClick={() => onDelete(authorLink)}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <TextField
        fullWidth
        margin="normal"
        id="name"
        label={t("types.author.fields.links.fields.name.name")}
        name="name"
        autoFocus
        value={authorLink.name}
        onChange={handleChange}
      />
    </Box>
  );
};

AuthorLink.propTypes = {
  authorLink: PropTypes.shape({
    url: PropTypes.string,
    name: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func,
  onDelete: PropTypes.func,
};

AuthorLink.defaultProps = {
  onChange: () => { },
  onDelete: () => { },
};

export default AuthorLink