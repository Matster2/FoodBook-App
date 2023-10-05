import {
  Box,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { ReactComponent as OfflineLogo } from 'assets/icons/offline.svg';
import { useTranslation } from "react-i18next";

export default () => {
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
          <OfflineLogo style={{ maxWidth: 100, fill: '#dcdcdc' }} alt="foodbook" />
        </Box>
        <Typography variant="h3" style={{ color: 'var(--primary-colour)' }}>
          {t('pages.serverOffline.title')}
        </Typography>
        <Typography textAlign="center">
          {t('pages.serverOffline.message')}
        </Typography>
      </Stack>
    </Container>
  );
};
