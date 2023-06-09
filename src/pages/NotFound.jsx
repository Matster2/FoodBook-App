import React, { useMemo, useEffect, useContext, useState } from 'react';
import {
  CssBaseline,
  Container,
  Typography,
  Box,
  Button,
  InputAdornment,
  Grid,
  Avatar,
  Dialog,
  Slide,
  Stack,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
export default () => {
  const { t } = useTranslation();
  const navigate = useNavigate();


  return (
    <Container>
      <CssBaseline />
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
        <Button sx={{ mt: 2 }} variant='contained' onClick={() => navigate('/')}>
          {t('pages.notFound.links.home')}
        </Button>
      </Stack>
    </Container>
  );
};
