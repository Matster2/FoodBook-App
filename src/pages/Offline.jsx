import React, { useMemo, useEffect, useContext, useState } from 'react';
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { useTranslation } from "react-i18next";
import sleepLogo from '../assets/logo-sleep.svg';

export default () => {
  const { t } = useTranslation();

  return (
    <Container>
      <CssBaseline />
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
