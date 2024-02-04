import {
    Box,
    Button,
    CircularProgress,
    Container,
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Paper,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';
import Header from 'src/components/Header';
import useAPI from 'src/hooks/useAPI';
import useFilters from 'src/hooks/useFilters';

export default () => {
  const navigate = useNavigate();
  const api = useAPI();

  const { filters, setFilter } = useFilters({
    states: ['published'],
    sortBy: 'datepublished',
    sortDesc: true,
    personal: false,
    page: 1,
    pageSize: 50
  });

  const [showSupportTicketModal, setShowSupportTicketModal] = useState(false);

  const [loadingRecipes, setLoadingRecipes] = useState(false);
  const [recipeResponse, setRecipeResponse] = useState();

  const fetchRecipes = async () => {
    setLoadingRecipes(true);

    try {
      const { data } = await api.getRecipes(filters);
      setRecipeResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingRecipes(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchRecipes();
  }

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  const handleStateFilterChange = (event) => {
    setFilter("states", [event.target.value]);
  };

  const handleAddClick = () => {
    navigate("/admin/recipes/add");
  }

  const handleRecipeClick = (id) => {
    navigate(`/admin/recipes/${id}`)
  };

  /* Effects */
  useEffect(() => {
    fetchRecipes()
  }, [filters]);

  /* Rendering */
  const formatDate = (inputDate) => {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date
      .toString()
      .padStart(2, '0');

    month = month
      .toString()
      .padStart(2, '0');

    return `${date}/${month}/${year}`;
  }

  const getDateString = (inputDate) => {
    var time = inputDate.toLocaleString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    var date = formatDate(inputDate)
    return `${time} ${date}`;
  }

  return (
    <Container sx={{ pb: 7 }}>
      <Header title="Recipes" onBackClick={() => navigate(-1)} />

      <Stack sx={{ mb: 2 }} direction="row" gap={2}>
        <FormControl fullWidth>
          <InputLabel id="state-filter-label">State</InputLabel>
          <Select
            labelId="state-filter-label"
            id="state-filter"
            value={filters.states.length > 0 ? filters.states[0] : undefined}
            label="State"
            onChange={handleStateFilterChange}
          >
            <MenuItem value="draft">Draft</MenuItem>
            <MenuItem value="published">Published</MenuItem>
            <MenuItem value="archived">Archived</MenuItem>
          </Select>
        </FormControl>
      </Stack>

      <Box
        sx={{ display: "flex", justifyContent: "right", mb: 2 }}
      >
        <Button
          type="button"
          variant="contained"
          onClick={handleAddClick}
        >
          Add
        </Button>
      </Box>

      {loadingRecipes && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {recipeResponse && (
        <PullToRefresh onRefresh={handleRefresh}>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total recipes: {recipeResponse.totalResults}</Typography>
          </Box>

          {recipeResponse.results.length === 0 && !loadingRecipes && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Recipe Found</Typography>
            </Box>
          )}

          {recipeResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ width: "100%" }} style={{ tableLayout: "auto" }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Date Created</TableCell>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recipeResponse.results.map((recipe) => (
                    <TableRow key={recipe.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleRecipeClick(recipe.id)}>
                      <TableCell component="th" scope="row">
                        {getDateString(new Date(recipe.dateCreated))}
                      </TableCell>
                      <TableCell component="th" scope="row">
                        {recipe.name}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {recipeResponse.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={recipeResponse.totalPages} page={recipeResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </PullToRefresh>
      )}
    </Container>
  );
};
