import React, { useMemo, useEffect, useContext, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import PropTypes from 'prop-types';
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
import PullToRefresh from 'react-simple-pull-to-refresh';
import Filters from './Filters';
import useInput from '../hooks/useInput';
import RecipeTile from '../components/RecipeTile';
import FilterButton from '../components/FilterButton';
import Section from '../components/Section';
import CategoryChip from '../components/CategoryChip';
import usePagedFetch from '../hooks/usePagedFetch';
import { TagContext } from '../contexts/TagContext';
import { UserContext } from '../contexts/UserContext';

import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import { ReactComponent as SearchIcon } from '../assets/icons/search.svg';
import styles from './Homepage.module.css';
import useAuth from '../hooks/useAuth';

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
          Not Found
        </Typography>
        <Typography variant="h1" style={{ color: 'var(--primary-colour)' }}>
          404
        </Typography>
        <Button sx={{ mt: 2 }} variant='contained' onClick={() => navigate('/')}>
          Home
        </Button>
      </Stack>
    </Container>
  );
};
