import {
  Box,
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from "react-i18next";
import sleepLogo from 'src/assets/logo-sleep.svg';

const Offline = () => {
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
          <img style={{ maxWidth: 100, }} src={sleepLogo} alt="foodbook" />
        </Box>
        <Typography variant="h3" style={{ color: 'var(--primary-colour)' }}>
          {t('pages.offline.title')}
        </Typography>
        <Typography textAlign="center">
          {t('pages.offline.message')}
        </Typography>
        <Button sx={{ mt: 2 }} variant='contained'>
          {t('pages.offline.components.buttons.refresh.label')}
        </Button>
      </Stack>
    </Container>
  );
};

export default Offline;