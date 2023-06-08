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
  Button
} from '@mui/material';
import PullToRefresh from 'react-simple-pull-to-refresh';
import { useNavigate } from 'react-router-dom';
import useAPI from '../../hooks/useAPI';
import useFilters from '../../hooks/useFilters';
import useInput from '../../hooks/useInput';
import Header from '../../components/Header';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    search: '',
    sortBy: 'name',
  });

  const { value: search, onChange: onSearchChange } = useInput('');
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [authors, setAuthors] = useState([]);

  const fetchAuthors = async () => {
    setLoadingAuthors(true);

    try {
      const {
        data: { results },
      } = await api.getAuthors(filters);
      setAuthors(results);
    } catch (e) {
      console.log(e);
    }

    setLoadingAuthors(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchAuthors();
  }

  const handleAddClick = () => {
    navigate("/admin/authors/add")
  }

  /* Effects */
  useEffect(() => {
    fetchAuthors();
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
      <Header title="Authors" onBackClick={() => navigate(-1)} />

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
        {authors.length === 0 && !loadingAuthors && (
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Typography>No Authors Found</Typography>
          </Box>
        )}

        {loadingAuthors && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {authors.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {authors.map((author) => (
                  <TableRow key={author.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {`${author.name}`}
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
