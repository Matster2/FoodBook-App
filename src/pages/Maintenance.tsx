import {
  Box,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from "react-i18next";
import MaintenanceLogo from 'src/assets/icons/maintenance.svg?react';

const Maintenance = () => {
  const { t } = useTranslation();

  return (
    <Container>
      <Stack
        direction="column"
        gap={2}
        sx={{
          pb: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box
          sx={{
            mb: 4,
            width: 100,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <MaintenanceLogo style={{ maxWidth: 100, fill: '#dcdcdc' }} />
        </Box>
        <Typography variant="h3" style={{ color: 'var(--primary-colour)' }}>
          {t('pages.maintenance.title')}
        </Typography>
        <Typography textAlign="center">
          {t('pages.maintenance.message')}
        </Typography>
      </Stack>
    </Container>
  );
};

export default Maintenance;