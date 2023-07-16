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
import Header from 'components/Header';
import useAPI from 'hooks/useAPI';
import useFilters from 'hooks/useFilters';
import useInput from 'hooks/useInput';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PullToRefresh from 'react-simple-pull-to-refresh';

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
  const [loadingAuthors, setLoadingAuthors] = useState(false);
  const [authorResponse, setAuthorResponse] = useState();

  const fetchAuthors = async () => {
    setLoadingAuthors(true);

    try {
      const { data } = await api.getAuthors(filters);
      setAuthorResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingAuthors(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchAuthors();
  }

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  const handleAddClick = () => {
    navigate("/admin/authors/add")
  }

  const handleAuthorlick = (id) => {
    navigate(`/authors/${id}`);
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

      {loadingAuthors && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {authorResponse && (
        <PullToRefresh onRefresh={handleRefresh}>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total authors: {authorResponse.totalResults}</Typography>
          </Box>

          {authorResponse.results.length === 0 && !loadingAuthors && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Authors Found</Typography>
            </Box>
          )}

          {authorResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {authorResponse.results.map((author) => (
                    <TableRow key={author.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleAuthorlick(author.id)}>
                      <TableCell component="th" scope="row">
                        {`${author.name}`}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {authorResponse.results.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={authorResponse.totalPages} page={authorResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </PullToRefresh>
      )}
    </Container>
  );
};
