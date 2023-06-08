import React, { useState, useEffect } from 'react';
import {
  CssBaseline,
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Button,
  Icon
} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import useFilters from '../../hooks/useFilters';
import useInput from '../../hooks/useInput';
import Header from '../../components/Header';

import categoryIcons from '../../config/categoryIcons';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    search: '',
    sortBy: 'name',
  });

  const { value: search, onChange: onSearchChange } = useInput('');
  const [loadingTags, setLoadingTags] = useState(false);
  const [tags, setTags] = useState([]);

  const fetchTags = async () => {
    setLoadingTags(true);

    try {
      const {
        data: { results },
      } = await api.getTags(filters);
      setTags(results);
    } catch (e) {
      console.log(e);
    }

    setLoadingTags(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchTags();
  }

  const handleAddClick = () => {
    navigate("/admin/tags/add")
  }

  /* Effects */
  useEffect(() => {
    fetchTags();
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Tags" onBackClick={() => navigate(-1)} />

      <Box
        sx={{ display: "flex", justifyContent: "right" }}
      >
        <Button
          type="button"
          variant="contained"
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>

      <TextField
        sx={{ mb: 2 }}
        fullWidth
        margin="normal"
        id="search"
        name="search"
        label="search"
        autoFocus
        value={search}
        onChange={onSearchChange}
      />

      <PullToRefresh onRefresh={handleRefresh}>
        {tags.length === 0 && !loadingTags && (
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Typography>No Tags Found</Typography>
          </Box>
        )}

        {loadingTags && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {tags.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tags.map((tag) => (
                  <TableRow key={tag.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      <Typography
                        sx={{
                          display: 'flex',
                        }}
                      >
                        <Icon sx={{ mr: 1 }}>
                          <img style={{ height: '100%' }} alt={tag.name} src={categoryIcons[tag.icon.toLowerCase()]} />
                        </Icon>
                        {tag.name}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </PullToRefresh>
    </Container>
  );
};
