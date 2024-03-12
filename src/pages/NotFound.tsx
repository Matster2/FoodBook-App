import {
  Button,
  Container,
  Stack,
  Typography
} from '@mui/material';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  /* Handlers */
  const handleReturnToHomeClick = () => {
    navigate('/');
  }

  /* Rendering */
  return (
    <Container>
      <Stack
        direction="column"
        gap={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Typography variant="h3" style={{ color: 'var(--primary-colour)' }}>
          {t('pages.notFound.title')}
        </Typography>
        <Typography variant="h1" style={{ color: 'var(--primary-colour)' }}>
          {t('pages.notFound.404')}
        </Typography>
        <Button sx={{ mt: 2 }} variant='contained' onClick={handleReturnToHomeClick}>
          {t('pages.notFound.links.home')}
        </Button>
      </Stack>
    </Container>
  );
};

export default NotFound;