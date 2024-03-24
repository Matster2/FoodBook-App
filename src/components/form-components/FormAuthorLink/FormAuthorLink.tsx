import { Clear as ClearIcon } from '@mui/icons-material';
import { Box, IconButton, Stack } from '@mui/material';
import { useTranslation } from "react-i18next";
import FormTextField from 'src/components/form-components/FormTextField';

interface FormAuthorLinkProps {
  name: string;
  onDelete: () => void;
}

const FormAuthorLink = ({
  name,
  onDelete
}: FormAuthorLinkProps) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Stack direction="row" alignItems="center" gap={1}>
        <FormTextField
          name={`${name}.url`}
          fullWidth
          label={t("types.author.fields.links.fields.url.name")}
        />

        <IconButton onClick={() => onDelete()}>
          <ClearIcon />
        </IconButton>
      </Stack>

      <FormTextField
        name={`${name}.name`}
        fullWidth
        label={t("types.author.fields.links.fields.name.name")}
      />
    </Box>
  );
};

export default FormAuthorLink