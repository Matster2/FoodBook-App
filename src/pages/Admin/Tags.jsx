import {
  Box,
  Button,
  CircularProgress,
  Container,
  Icon,
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
import { isUndefined } from 'utils/utils';

import categoryIcons from 'config/categoryIcons';

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
  const [loadingTags, setLoadingTags] = useState(false);
  const [tagResponse, setTagResponse] = useState();

  const fetchTags = async () => {
    setLoadingTags(true);

    try {
      const { data } = await api.getTags(filters);
      setTagResponse(data);
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
    navigate("/admin/tags/add");
  }

  const handleTagClick = (id) => {
    navigate(`/admin/tags/${id}`);
  }

  const handlePageChange = (event, value) => {
    setFilter("page", value);
  };

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

      {loadingTags && (
        <Box sx={{ mt: 2, mb: 4 }} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {tagResponse && (
        <PullToRefresh onRefresh={handleRefresh}>
          <Box sx={{ mb: 1 }} display="flex" justifyContent="end">
            <Typography sx={{ fontSize: 12 }}>Total tags: {tagResponse.totalResults}</Typography>
          </Box>

          {tagResponse.results.length === 0 && !loadingTags && (
            <Box display="flex" justifyContent="center" sx={{ mt: 4 }}>
              <Typography>No Tags Found</Typography>
            </Box>
          )}

          {tagResponse.results.length > 0 && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tagResponse.results.map((tag) => (
                    <TableRow key={tag.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} onClick={() => handleTagClick(tag.id)}>
                      <TableCell component="th" scope="row">
                        <Typography
                          sx={{
                            display: 'flex',
                          }}
                        >
                          <Icon sx={{ mr: 1 }}>
                            <img style={{ height: '100%' }} alt={tag.name} src={!isUndefined(categoryIcons[tag.icon.toLowerCase()]) ? categoryIcons[tag.icon.toLowerCase()] : categoryIcons.default} />
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

          {tagResponse.totalPages > 1 && (
            <Box sx={{ mt: 3 }} display="flex" justifyContent="center">
              <Pagination count={tagResponse.totalPages} page={tagResponse.currentPage} onChange={handlePageChange} shape="rounded" />
            </Box>
          )}
        </PullToRefresh>
      )}
    </Container>
  );
};
