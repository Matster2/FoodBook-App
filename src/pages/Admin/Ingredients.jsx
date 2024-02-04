import {
    Box,
    Button,
    CircularProgress,
    Container,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Header from 'src/components/Header';
import useAPI from 'src/hooks/useAPI';
import useFilters from 'src/hooks/useFilters';
import useInput from 'src/hooks/useInput';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    search: '',
    sortBy: 'name',
    sortDesc: false,
    page: 1,
    pageSize: 50
  });

  const { value: search, onChange: onSearchChange } = useInput('');
  const [loadingIngredients, setLoadingIngredients] = useState(false);
  const [ingredientResponse, setIngredientResponse] = useState();

  const fetchIngredients = async () => {
    setLoadingIngredients(true);

    try {
      const { data } = await api.getIngredients(filters);
      setIngredientResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingIngredients(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchIngredients();
  }

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  const handleAddClick = () => {
    navigate("/admin/ingredients/add")
  }

  const handleIngredientClick = (id) => {
    navigate(`/admin/ingredients/${id}`);
  }

  /* Effects */
  useEffect(() => {
    fetchIngredients();
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

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

      {loadingIngredients && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {ingredientResponse && (
        <PullToRefresh onRefresh={handleRefresh}>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total ingredients: {ingredientResponse.totalResults}</Typography>
          </Box>

          {ingredientResponse.results.length === 0 && !loadingIngredients && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Ingredients Found</Typography>
            </Box>
          )}

          {ingredientResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ingredientResponse.results.map((ingredient) => (
                    <TableRow key={ingredient.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleIngredientClick(ingredient.id)}>
                      <TableCell component="th" scope="row">
                        {getIngredientText(ingredient)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {ingredientResponse.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={ingredientResponse.totalPages} page={ingredientResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </PullToRefresh>
      )}
    </Container>
  );
};
