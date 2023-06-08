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
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [ingredients, setIngredients] = useState([]);

  const fetchIngredients = async () => {
    setLoadingIngredients(true);

    try {
      const {
        data: { results },
      } = await api.getIngredients(filters);
      setIngredients(results);
    } catch (e) {
      console.log(e);
    }

    setLoadingIngredients(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchIngredients();
  }

  const handleAddClick = () => {
    navigate("/admin/ingredients/add")
  }

  /* Effects */
  useEffect(() => {
    fetchIngredients();
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 2000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  const getIngredientText = (ingredient) => {
    const parts = [ingredient.name];

    if (ingredient.name !== ingredient.pluralName) {
      parts.push(`(${ingredient.pluralName})`);
    }

    return parts.join(" ");
  }

  return (
    <Container sx={{ pb: 7 }}>
      <CssBaseline />
      <Header title="Ingredients" onBackClick={() => navigate(-1)} />

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
        {ingredients.length === 0 && !loadingIngredients && (
          <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
            <Typography>No Ingredients Found</Typography>
          </Box>
        )}

        {loadingIngredients && (
          <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        )}

        {ingredients.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ingredients.map((ingredient) => (
                  <TableRow key={ingredient.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {getIngredientText(ingredient)}
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
