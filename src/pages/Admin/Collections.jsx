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
    sortBy: 'title',
    sortDesc: false,
    page: 1,
    pageSize: 50
  });

  const { value: search, onChange: onSearchChange } = useInput('');
  const [loadingCollections, setLoadingCollections] = useState(false);
  const [collectionResponse, setCollectionResponse] = useState();

  const fetchCollections = async () => {
    setLoadingCollections(true);

    try {
      const { data } = await api.getCollections(filters);
      setCollectionResponse(data);
    } catch (e) {
      console.log(e);
    }

    setLoadingCollections(false);
  };

  /* Handlers */
  const handleRefresh = async () => {
    fetchCollections();
  }

  const handleAddClick = () => {
    navigate("/admin/collections/add");
  }

  const handleCollectionClick = (id) => {
    navigate(`/admin/collections/${id}`);
  }

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

  /* Effects */
  useEffect(() => {
    fetchCollections();
  }, [filters]);

  useEffect(() => {
    const delayDebounce = setTimeout(async () => {
      setFilter('search', search);
    }, 1000);

    return () => clearTimeout(delayDebounce);
  }, [search]);

  /* Rendering */
  return (
    <Container sx={{ pb: 7 }}>
      <Header title="Collections" onBackClick={() => navigate(-1)} />

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

      {loadingCollections && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {collectionResponse && (
        <PullToRefresh onRefresh={handleRefresh}>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total collections: {collectionResponse.totalResults}</Typography>
          </Box>

          {collectionResponse.results.length === 0 && !loadingCollections && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Collections Found</Typography>
            </Box>
          )}

          {collectionResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {collectionResponse.results.map((collection) => (
                    <TableRow key={collection.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleCollectionClick(collection.id)}>
                      <TableCell component="th" scope="row">
                        <Typography
                          sx={{
                            display: 'flex',
                          }}
                        >
                          {collection.title}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}

          {collectionResponse.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={collectionResponse.totalPages} page={collectionResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </PullToRefresh>
      )}
    </Container>
  );
};
